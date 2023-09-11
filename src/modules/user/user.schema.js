const { string, ref, object } = require('yup');

const registerSchema = object().shape({
  username: string()
    .max(100, 'This field must be at most 100 characters long.')
    .required('This field must not be empty.'),
  email: string()
    .max(100, 'This field must be at most 100 characters long.')
    .required('This field must not be empty.'),
  password: string()
    .min(8, 'This field must be at least 8 characters long.')
    .max(50, 'This field must be at most 50 characters long.')
    .required('This  field must not be empty.'),
});

const loginSchema = object().shape({
  email: string()
    .max(100, 'This field must be at most 100 characters long.')
    .required('This field must not be empty.'),
  password: string()
    .min(8, 'This field must be at least 8 characters long.')
    .max(50, 'This field must be at most 50 characters long.')
    .required('This  field must not be empty.'),
});

const userUpdateSchema = object().shape({
  username: string()
    .max(100, 'This field must be at most 100 characters long.')
    .required('This field must not be empty.'),
  email: string().max(100, 'This field must be at most 100 characters long.'),
  password: string()
    .min(8, 'This field must be at least 8 characters long.')
    .max(50, 'This field must be at most 50 characters long.'),
});

module.exports.registerSchema = registerSchema;
module.exports.loginSchema = loginSchema;
module.exports.userUpdateSchema = userUpdateSchema;
