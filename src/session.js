var Session = function () {
  this.cache = {};
};

Session.prototype.set = function (key, value) {
  this.cache[key] = value;
};

Session.prototype.get = function (key) {
  return this.cache[key];
};

Session.prototype.inc = function (key) {
  return ++this.cache[key];
};