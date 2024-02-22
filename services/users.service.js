import { User } from "#models/user.model.js";

const addUser = async (email, avatarUrl, verificationToken) => {
  const user = await User({ email, avatarUrl, verificationToken });
  return user;
};

const loginUser = async (email) => {
  const user = await User.findOne({
    email,
  });
  return user;
};

const logoutUser = async (userId) => {
  await User.findByIdAndUpdate(userId, { token: null });
};

const updateUserAvatar = async (userId, avatarUrl) => {
  await User.findByIdAndUpdate(userId, { avatarUrl });
};

const verifyUserEmail = async (userId) => {
  await User.findByIdAndUpdate(userId, {
    verify: true,
    verificationToken: null,
  });
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

export {
  addUser,
  loginUser,
  logoutUser,
  updateUserAvatar,
  verifyUserEmail,
  getUserByEmail,
};
