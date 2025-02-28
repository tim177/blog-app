const express = require("express");

const { getAccessToRoute } = require("../Middlewares/Authorization/auth");

const {
  addNewCommentToStory,
  getAllCommentByStory,
  commentLike,
  getCommentLikeStatus,
} = require("../controllers/comment");

const {
  checkStoryExist,
} = require("../Middlewares/database/databaseErrorHandler");

const router = express.Router();

// ✅
router.post(
  "/:slug/addComment",
  [getAccessToRoute, checkStoryExist],
  addNewCommentToStory
);

// ✅
router.get("/:slug/getAllComment", getAllCommentByStory);

// ✅
router.post("/:comment_id/like", commentLike);

// ✅
router.post("/:comment_id/getCommentLikeStatus", getCommentLikeStatus);

module.exports = router;
