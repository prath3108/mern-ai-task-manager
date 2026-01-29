const router = require("express").Router();
const { protect } = require("../middleware/authMiddleware");
const { runAIOnTask } = require("../controllers/aiController");

router.post("/tasks/:id/enhance", protect, runAIOnTask);

module.exports = router;
