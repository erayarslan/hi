var Proxy = {
  inject: function (script) {
    var el = document.createElement('script');
    el.type = 'text/javascript';
    el.text = '(' + script + ')("");';
    document.body.appendChild(el);
  },
  execute: function (key, cmd) {
    return new window['Promise']((function (resolve, reject) {
      var event_id = "execute_" + Utils.getStrId();

      var _script = "function () { \
        document.body.dispatchEvent(new CustomEvent('%%', {detail: eval('%%')}));\
      }";

      document.body.addEventListener(event_id, function (e) {
        var data = {};
        data[key] = e.detail.toString().trim();
        resolve(data);
      });

      this.inject(_script.pass(event_id, cmd));
    }).bind(this));
  },
  ajax: function (next) {
    var event_id = "ajax_" + Utils.getStrId();

    var _script = "function() {\
        var oldSend = XMLHttpRequest.prototype.send;\
        XMLHttpRequest.prototype.send = function () {\
          var oldOnLoad = this.onload;\
          this.onload = function () { \
            document.body.dispatchEvent(new CustomEvent('%%', {detail: this.responseText})); \
            if (oldOnLoad) {\
              oldOnLoad.apply(this, arguments);\
            }\
          };\
          oldSend.apply(this, arguments);\
        };\
      }";

    document.body.addEventListener(event_id, function (e) {
      next(e.detail.toString().trim());
    });

    this.inject(_script.pass(event_id));
  }
};