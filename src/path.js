var Path = function (ptr_pattern, str) {
  this.keys = [];
  this.pattern = pathToRegexp(ptr_pattern, this.keys);
  this.result = this.pattern.exec(str);

  return this;
};

Path.prototype.test = function () {
  return this.result;
};

Path.prototype.params = function () {
  return this.getParams(this.result, this.keys);
};

Path.prototype.getParams = function (m, keys) {
  var params = {};

  for (var i = 1; i < m.length; i++) {
    var prop = keys[i - 1].name;
    var val = this.decodeParam(m[i]);

    if (!!val || !(Object.prototype.hasOwnProperty.call(params, prop))) {
      params[prop] = val;
    }
  }

  return params;
};

Path.prototype.decodeParam = function (val) {
  if (typeof val !== 'string' || val.length === 0) {
    return val;
  }

  try {
    return decodeURIComponent(val);
  } catch (err) {
    if (err instanceof URIError) {
      err.message = 'Failed to decode param \'' + val + '\'';
      err.status = err.statusCode = 400;
    }

    throw err;
  }
};