// var through = require('through2');
var mothership = require('mothership');
var through = require('through');
var path = require('path');
function process(file, data, callback) {
  mothership(file, function (pack) { return !! pack['browser'] && !! pack['browserify-window-context'] }, function (err, res) {
    pack = res.pack;
    browser = pack['browser'];
    var filePath = path.resolve(file);
    var mustAddWindowContext = Object.keys(browser).reduce(function(result, key) {
      var shimPath = path.resolve(browser[key]);

      if (shimPath !== filePath) {
        return result;
      }

      return result || pack['browserify-window-context'].indexOf(key) !== -1;
    }, false);

    if (mustAddWindowContext) {
      data = '(function () {' + data + '}).apply(window);';
    }
    
    callback(data);
  });
}
function transform(file) {
  var data = '', stream = through(write, end);

  return stream;

  function write(buf) {
    data += buf;
  }
  function end() {
    process(file, data, function(result) {
      stream.queue(result);
      stream.queue(null);
    });
  }
  return through();
}
module.exports = transform;
