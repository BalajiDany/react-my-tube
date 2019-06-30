const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/my-tube-api', { target: 'http://my-tube-load-balance-1252349724.ap-south-1.elb.amazonaws.com' }));
};