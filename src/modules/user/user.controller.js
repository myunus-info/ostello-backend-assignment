const path = require('path');
const User = require('./user.model');
const { generateAccessToken } = require('./user.service');
const { asyncHandler, AppError } = require(path.join(process.cwd(), 'src/modules/core/errors'));

const register = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: { username, email, password },
  });

  if (!created) {
    return next(new AppError(400, 'User already exists!'));
  }
  res.status(201).json({ user });
});

const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.findAll();

  if (!users || users.length === 0) {
    return next(new AppError(404, 'No users found!'));
  }

  res.status(200).json({ result: users.length, users });
});

const getUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });
  if (!user) {
    return next(new AppError(404, `No user found with id: ${id}`));
  }
  res.status(200).json({ user });
});

const updateUser = asyncHandler(async (req, res, next) => {
  const requestUser = req.user.dataValues;
  const { id } = req.params;
  const { username, email, password } = req.body;

  const user = await User.findOne({ where: { id } });
  const resourseUser = user.dataValues;

  if (!user) {
    return next(new AppError(404, `User not found with id: ${id}`));
  }
  if (requestUser.id === resourseUser.id) {
    if (username && email && password) {
      await user.update({ username, email, password });
    }
  } else {
    return next(new AppError(403, 'You are forbidden to access this route!'));
  }
  res.status(201).json({
    message: 'User updated successfully!',
    user,
  });
});

const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({ where: { id } });

  if (!user) {
    return next(new AppError(404, `User not found with id: ${id}`));
  }

  await User.destroy({ where: { id } });

  res.status(201).json({ message: `User with id: ${id} has been deleted` });
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || !user.password || !user.isPasswordValid(password)) {
    return next(new AppError(401, 'Invalid email or password'));
  }
  res.cookie('access_token', generateAccessToken(user), {
    httpOnly: true,
    signed: true,
  });

  const { password: Password, createdAt, updatedAt, ...userRestInfo } = user.dataValues;
  res.status(200).json({ user: userRestInfo });
});

const logout = (req, res) => {
  res.clearCookie('access_token');
  res.status(200).json({ message: 'User logged out!' });
};

exports.register = register;
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.login = login;
exports.logout = logout;
