const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      default: ""
    },

    status: {
      type: String,
      enum: ["Todo", "In Progress", "Done"],
      default: "Todo"
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium"
    },

    dueDate: {
      type: Date,
      default: null
    },

    ai: {
      improvedDescription: String,
      suggestedPriority: String,
      suggestedDueDate: Date,
      subtasks: [String]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
