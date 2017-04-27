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
  }
};