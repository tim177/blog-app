const asyncErrorWrapper = require("express-async-handler");
const User = require("../models/user");
const Story = require("../models/story");
const CustomError = require("../utils/CustomError");
const bycrpt = require("bcryptjs");

const validateUserInput = (email, password) => {
  return email && password;
};

const comparePassword = (password, hashedPassword) => {
  return bycrpt.compareSync(password, hashedPassword);
};

const profile = asyncErrorWrapper(async (req, res, next) => {
  return res.status(200).json({
    success: true,
    data: req.user,
  });
});

const editProfile = asyncErrorWrapper(async (req, res, next) => {
  const { email, username } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      email,
      username,
      photo: req.savedUserPhoto,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return res.status(200).json({
    success: true,
    data: user,
  });
});

const changePassword = asyncErrorWrapper(async (req, res, next) => {
  const { newPassword, oldPassword } = req.body;

  if (!validateUserInput(newPassword, oldPassword)) {
    return next(new CustomError("Please check your inputs ", 400));
  }

  const user = await User.findById(req.user.id).select("+password");

  if (!comparePassword(oldPassword, user.password)) {
    return next(new CustomError("Old password is incorrect ", 400));
  }

  user.password = newPassword;

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Change Password  Successfully",
    user: user,
  });
});

const addStoryToReadList = asyncErrorWrapper(async (req, res, next) => {
  const { slug } = req.params;
  const { activeUser } = req.body;

  if (!activeUser || !activeUser._id) {
    return res.status(400).json({
      success: false,
      message: "Invalid user data",
    });
  }

  const story = await Story.findOne({ slug });
  if (!story) {
    return res.status(404).json({
      success: false,
      message: "Story not found",
    });
  }

  const user = await User.findById(activeUser._id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const storyId = story._id.toString();
  const isAlreadyInList = user.readList.includes(storyId);

  if (isAlreadyInList) {
    user.readList = user.readList.filter((id) => id.toString() !== storyId);
  } else {
    user.readList.push(storyId);
  }

  user.readListLength = user.readList.length;
  await user.save();

  return res.status(200).json({
    success: true,
    story,
    user,
    status: !isAlreadyInList,
  });
});

const readListPage = asyncErrorWrapper(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const readList = [];

  for (let index = 0; index < user.readList.length; index++) {
    var story = await Story.findById(user.readList[index]).populate("author");

    readList.push(story);
  }

  return res.status(200).json({
    success: true,
    data: readList,
  });
});

module.exports = {
  profile,
  editProfile,
  changePassword,
  addStoryToReadList,
  readListPage,
};

////////////////////// ? WELL ORGANISED AND STRUCTURED CODE ? ///////////////////////////////
// const asyncErrorWrapper = require("express-async-handler");
// const bcrypt = require("bcryptjs");
// const User = require("../Models/user");
// const Story = require("../Models/story");
// const CustomError = require("../Helpers/error/CustomError");

// /**
//  * Validate if both email and password are provided.
//  */
// const validateUserInput = (email, password) => {
//   return email?.trim() && password?.trim();
// };

// /**
//  * Compare provided password with the hashed password.
//  */
// const comparePassword = (password, hashedPassword) => {
//   return bcrypt.compareSync(password, hashedPassword);
// };

// /**
//  * Get user profile.
//  */
// const profile = asyncErrorWrapper(async (req, res) => {
//   return res.status(200).json({
//     success: true,
//     data: req.user,
//   });
// });

// /**
//  * Edit user profile.
//  */
// const editProfile = asyncErrorWrapper(async (req, res) => {
//   const { email, username } = req.body;

//   const user = await User.findByIdAndUpdate(
//     req.user.id,
//     {
//       email,
//       username,
//       photo: req.savedUserPhoto,
//     },
//     {
//       new: true,
//       runValidators: true,
//     }
//   );

//   return res.status(200).json({
//     success: true,
//     data: user,
//   });
// });

// /**
//  * Change user password.
//  */
// const changePassword = asyncErrorWrapper(async (req, res, next) => {
//   const { newPassword, oldPassword } = req.body;

//   if (!validateUserInput(newPassword, oldPassword)) {
//     return next(new CustomError("Please check your inputs", 400));
//   }

//   const user = await User.findById(req.user.id).select("+password");

//   if (!comparePassword(oldPassword, user.password)) {
//     return next(new CustomError("Old password is incorrect", 400));
//   }

//   user.password = newPassword;
//   await user.save();

//   return res.status(200).json({
//     success: true,
//     message: "Password changed successfully",
//     user,
//   });
// });

// /**
//  * Add or remove a story from the user's read list.
//  */
// const addStoryToReadList = asyncErrorWrapper(async (req, res, next) => {
//   const { slug } = req.params;
//   const { activeUser } = req.body;

//   const story = await Story.findOne({ slug });

//   if (!story) {
//     return next(new CustomError("Story not found", 404));
//   }

//   const user = await User.findById(activeUser._id);

//   if (!user) {
//     return next(new CustomError("User not found", 404));
//   }

//   const index = user.readList.indexOf(story.id);

//   if (index === -1) {
//     user.readList.push(story.id);
//   } else {
//     user.readList.splice(index, 1);
//   }

//   await user.save();

//   return res.status(200).json({
//     success: true,
//     story,
//     user,
//     status: user.readList.includes(story.id),
//   });
// });

// /**
//  * Get all stories in a user's read list.
//  */
// const readListPage = asyncErrorWrapper(async (req, res) => {
//   const user = await User.findById(req.user.id);

//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "User not found",
//     });
//   }

//   const readList = await Story.find({ _id: { $in: user.readList } }).populate("author");

//   return res.status(200).json({
//     success: true,
//     data: readList,
//   });
// });

// module.exports = {
//   profile,
//   editProfile,
//   changePassword,
//   addStoryToReadList,
//   readListPage,
// };
