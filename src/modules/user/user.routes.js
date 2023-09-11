const path = require('path');
const UserStrategy = require('./user.authentication.middleware');
const { registerSchema, loginSchema, userUpdateSchema } = require('./user.schema');
const {
  register,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  login,
  logout,
} = require('./user.controller');
const validate = require(path.join(process.cwd(), 'src/modules/core/middlewares/validate.middleware'));

module.exports = app => {
  app.route('/api/users').post(validate(registerSchema), register).get(UserStrategy, getUsers);
  app
    .route('/api/users/:id')
    .get(UserStrategy, getUser)
    .patch(UserStrategy, validate(userUpdateSchema), updateUser)
    .delete(UserStrategy, deleteUser);

  app.post('/api/users/login', validate(loginSchema), login);
  app.post('/api/users/logout', UserStrategy, logout);
};
