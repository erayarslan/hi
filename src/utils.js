var utils = {
  hasOwnProperty: Object.prototype.hasOwnProperty,
  /**
   * @param {String} val - Value.
   * @returns {String}
   */
  DecodeParam: function (val) {
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
      execute: function (key, cmd) {
        return new Promise(function (resolve, reject) {
          var func = function () {
            /*
             function () {
               document.body.dispatchEvent(new CustomEvent('execute', {detail: eval("%%")}));
             }
             */
          };

          document.body.addEventListener('execute', function (e) {
            var data = {};
            data[key] = e.detail.toString().trim();
            resolve(data);
          });

          utils.injectProxyScript(multiline(func).pass(cmd));
        });
      }
    }
  },
  isHepsiburada: function () {
    return location.host.indexOf(HEPSIBURADA) > -1;
  },
  mergeExecutePromiseArr: function (arr) {
    var obj = {};
    var _arr = [];
    for (var i = 0; i < arr.length; i++) {
      for (var key in arr[i]) {
        if (arr[i].hasOwnProperty(key)) {
          var str = arr[i][key];
          obj[key] = str;
          _arr.push(str);
        }
      }
    }

    return obj;
  },
  getStrId: function () {
    return (+new Date() + '').split('').map(function (num) {
      return String.fromCharCode(97 + parseInt(num));
    }).join('');
  }
};