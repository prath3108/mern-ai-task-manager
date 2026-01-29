const Task = require("../models/Task");
const { enhanceTask } = require("../services/aiService");

const runAIOnTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.userId
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const aiResult = await enhanceTask({
      title: task.title,
      description: task.description
    });

    task.ai = {
      improvedDescription: aiResult.improvedDescription,
      suggestedPriority: aiResult.suggestedPriority,
      suggestedDueDate: aiResult.suggestedDueDate
        ? new Date(aiResult.suggestedDueDate)
        : null,
      subtasks: aiResult.subtasks
    };

    await task.save();
    res.json(task);
  } catch (error) {
    console.error("AI CONTROLLER ERROR:", error.message);
    res.status(500).json({ message: "AI processing failed" });
  }
};

module.exports = { runAIOnTask };

