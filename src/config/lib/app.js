exports.start = () => {
  // Synchronous error
  process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    console.log('UNCAUGHT REJECTION🔥🔥🔥. Shutting down...');
    process.exit(1); // Crashing the app is mandatory Bcz the app remains at unclean stage;
  });
  // Listen to the port
  const app = require('./express')();
  app.listen(app.get('port'), () => {
    console.log(`Server is up on port ${app.get('port')}`);
  });

  // Asynchronous error
  process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    console.log('UNHANDLED REJECTION🔥🔥🔥. Shutting down ...');
    server.close(() => {
      process.exit(1); // Crashing the app is optional
    });
  });
};
