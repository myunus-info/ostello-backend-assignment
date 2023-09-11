const path = require('path');
const async = require('async');
const sequelize = require(path.join(process.cwd(), 'src/config/lib/sequelize'));

async function init() {
  const { initEnvironmentVariables } = require(path.join(process.cwd(), 'src/config/config'));
  await initEnvironmentVariables();
  const User = require(path.join(process.cwd(), 'src/modules/user/user.model'));
  await sequelize.sync({ alter: true });

  function userSeeder(callback) {
    User.findOrCreate({
      where: { email: 'myunus_edu@hotmail.com' },
      defaults: { username: 'Muhammad Yunus', password: '123456' },
    }).then(function () {
      callback();
    });
  }

  async.waterfall([userSeeder], err => {
    if (err) console.error(err);
    else console.info('DB seed completed!');
    process.exit();
  });
}

init();
