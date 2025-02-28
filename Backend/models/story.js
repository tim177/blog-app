const mongoose = require("mongoose");
const Comment = require("./comment");
const slugify = require("slugify");

const storySchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A stroy must have an author"],
    },
    slug: String,
    title: {
      type: String,
      required: [true, "A story must have a title"],
      unique: [true, "This title already taken"],
      min: [6, "A title must have at least 6 characters"],
    },
    content: {
      type: String,
      required: [true, "A story must have a content"],
      min: [10, "A content must have at least 10 characters"],
    },
    image: {
      type: String,
      default: "default.jpg",
    },
    readTime: {
      type: Number,
      default: 3,
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
    comments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Comment",
      },
    ],
    commentCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

storySchema.pre("save", async function (next) {
  if (!this.isModified("title")) next();
  this.slug = this.makeSlug();
  next();
});

storySchema.pre("remove", async function (next) {
  const story = await Story.findById(this._id);

  await Comment.deleteMany({
    story: story,
  });
});

storySchema.methods.makeSlug = function () {
  return slugify(this.title, {
    replacement: "-",
    remove: /[*+~.()'"!:@/?]/g,
    lower: true,
    strict: false,
    locale: "tr",
    trim: true,
  });
};

const Story = mongoose.model("Story", storySchema);

module.exports = Story;

//////////////////// ? MORE BETTER ORGANISED FILE  ? //////////////////////////////////
// const mongoose = require("mongoose");
// const Comment = require("./comment");
// const slugify = require("slugify");

// const storySchema = new mongoose.Schema(
//   {
//     author: {
//       type: mongoose.Schema.ObjectId,
//       ref: "User",
//       required: [true, "A story must have an author"],
//     },
//     slug: {
//       type: String,
//       unique: true,
//     },
//     title: {
//       type: String,
//       required: [true, "A story must have a title"],
//       unique: true,
//       minlength: [6, "A title must have at least 6 characters"],
//     },
//     content: {
//       type: String,
//       required: [true, "A story must have content"],
//       minlength: [10, "Content must have at least 10 characters"],
//     },
//     image: {
//       type: String,
//       default: "default.jpg",
//     },
//     readTime: {
//       type: Number,
//       default: 3,
//     },
//     likes: [
//       {
//         type: mongoose.Schema.ObjectId,
//         ref: "User",
//       },
//     ],
//     comments: [
//       {
//         type: mongoose.Schema.ObjectId,
//         ref: "Comment",
//       },
//     ],
//   },
//   { timestamps: true }
// );

// // ✅ Virtual properties for like & comment count
// storySchema.virtual("likeCount").get(function () {
//   return this.likes.length;
// });

// storySchema.virtual("commentCount").get(function () {
//   return this.comments.length;
// });

// // ✅ Generate slug before saving
// storySchema.pre("save", function (next) {
//   if (!this.isModified("title")) return next();
//   this.slug = slugify(this.title, {
//     replacement: "-",
//     remove: /[*+~.()'"!:@/?]/g,
//     lower: true,
//     strict: false,
//     trim: true,
//   });
//   next();
// });

// // ✅ Delete comments when a story is removed
// storySchema.pre("remove", async function (next) {
//   await Comment.deleteMany({ story: this._id });
//   next();
// });

// const Story = mongoose.model("Story", storySchema);

// module.exports = Story;
