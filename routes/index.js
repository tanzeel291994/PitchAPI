const userRoutes = require('./user_routes');
const postRoutes = require('./post_routes');
module.exports = function(app) {
  console.log("in");
  userRoutes(app);
  postRoutes(app);
  // Other route groups could go here, in the future
};
