var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var hbs = require('hbs');

var index = require('./routes/index');
var users = require('./routes/users');
var flow = require('./routes/flow');

var app = express();
app.use(logger('dev'));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/work-flow');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// 增加views/main目录来拆分UI模块
hbs.registerPartials(__dirname + '/views/main');

// 设置block
var blocks = {};

hbs.registerHelper('extend', function(name, context) {
  var block = blocks[name];
  if (!block) {
    block = blocks[name] = [];
  }
  block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper('block', function(name) {
  var val = (blocks[name] || []).join('\n');

  // clear the block
  blocks[name] = [];
  return val;
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'assets')));

app.use('/', index);
app.use('/users', users);

app.use('/flow', flow);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // var err = new Error('Not Found');
  // err.status = 404;
  res.render('404', {
    title: '未找到页面'
  });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;
app.set('port', process.env.PORT || 4000);
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
