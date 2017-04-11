var utils = {
  hasOwnProperty: Object.prototype.hasOwnProperty,
  /**
   * @param {String} val - Value.
   * @returns {String}
   */
  DecodeParam: function (val) {
    if (typeof val !== 'string' ||
      val.length === 0) {
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
  },
  getParams: function (m, keys) {
    var params = {};

    for (var i = 1; i < m.length; i++) {
      var prop = keys[i - 1].name;
      var val = utils.DecodeParam(m[i]);

      if (!!val || !(utils.hasOwnProperty.call(params, prop))) {
        params[prop] = val;
      }
    }

    return params;
  },
  injectProxyScript: function (script) {
    var injectedScript = document.createElement('script');
    injectedScript.type = 'text/javascript';
    injectedScript.text = '(' + script + ')("");';
    document.body.appendChild(injectedScript);
  },
  tunnelScripts: function () {
    return {
      execute: function (cmd, cb) {
        document.body.addEventListener('execute', function (e) {
          cb(e.detail);
        });

        utils.injectProxyScript("function () { var custom = new CustomEvent('execute', {detail: eval(\"" + cmd + "\")}); document.body.dispatchEvent(custom);}");
      }
    }
  }
};