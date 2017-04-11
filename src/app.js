/**
 * @author Eray Arslan
 */

var host = location.host;

var app = {
  init: function (data) {
    var path = location.pathname;
    var keys = [];
    var pattern = pathToRegexp(data.product_detail, keys);
    var result = pattern.exec(path);
    if (result) {
      var params = utils.getParams(result, keys);
      app.collect(data);
    }
  },
  collect: function (data) {
    var name = eval(data.product_name).toLowerCase();

    var scripts = utils.tunnelScripts();

    scripts.execute(data.product_brand, function (brand) {
      var product = {name: name, brand: brand.toLowerCase()};

      console.log(product);
    });
  }
};

window['onload'] = function () {
  if (map.hasOwnProperty(host)) {
    app.init(map[host]);
  }
};
