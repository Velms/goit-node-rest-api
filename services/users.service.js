import { User } from "#models/user.model.js";

const addUser = async (email) => {
  const user = await User({ email });

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

export { addUser, loginUser, logoutUser };
