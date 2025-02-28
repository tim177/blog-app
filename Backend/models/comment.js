const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    story: {
      type: mongoose.Schema.ObjectId,
      required: [true, "Comment must have a story"],
      ref: "Story",
    },
    content: {
      type: String,
      required: [true, "Please proveide some contnet "],
      min: [6, "the minimum character must be 6"],
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A comment Must be commented to some author"],
    },
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    likeCount: {
      type: Number,
      default: 0,
    },
    star: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
