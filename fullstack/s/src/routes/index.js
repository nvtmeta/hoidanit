const blogrouter = require('./blog');
const siterouter = require('./site');

function route(app) {
  app.use('/blog', blogrouter);
  app.use('/', siterouter);
}

module.exports = route;
