const noteRoutes = require('./note_routes');
const userRoutes = require('./user_routes');
const postRoutes = require('./post_routes');
module.exports = function(app, db) {
  noteRoutes(app, db);
  userRoutes(app, db);
  postRoutes(app, db);
  // Other route groups could go here, in the future
};
