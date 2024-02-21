import { User } from "#models/user.model.js";

const addUser = async (email, avatarUrl) => {
  const user = await User({ email, avatarUrl });

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

export { addUser, loginUser, logoutUser, updateUserAvatar };
