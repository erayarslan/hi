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
    var name = eval(data.product_name);

    var scripts = utils.tunnelScripts();

    scripts.execute(data.product_brand, function (brand) {
      var product = {name: name.toLowerCase(), brand: brand.toLowerCase()};
      var detects = app.analyze(product);

      if (!detects.length) {
        console.log('[hi] nothing :<');
      } else {
        console.log('[hi] detected ->', detects.join(','));
      }
    });
  },
  analyze: function (product) {
    var expected_score = 9;
    var words = product.name.split(' ');
    var results = [];

    for (var i = 0; i < words.length; i++) {
      var a = words.slice(i, 1 + i).join(' ').trim();
      var b = words.slice(i, 2 + i).join(' ').trim();
      var c = words.slice(i, 3 + i).join(' ').trim();

      var x = a.similar(keywords);
      var y = b.similar(keywords);
      var z = c.similar(keywords);

      var out = app.select([x, y, z], [a, b, c]);

      if (out.score <= expected_score) {
        results.push(out);
      }
    }

    return results.map(function (value) {
      return value.text;
    }).filter(function (value, index, self) {
      return self.indexOf(value) === index;
    });
  },
  select: function (analyzed, pure) {
    var arr = analyzed.map(function (item, i) {
      return {text: item.result, score: item.score, from: pure[i]}
    });

    return app.getMinAndMax(arr, 'score').min;
  },
  getMinAndMax: function (arr, attr) {
    if (!arr.length) return null;
    var lowest = arr[0];
    var highest = arr[0];
    var tmp;
    for (var i = arr.length - 1; i >= 0; i--) {
      tmp = arr[i];
      if (tmp[attr] < lowest[attr]) lowest = tmp;
      if (tmp[attr] > highest[attr]) highest = tmp;
    }

    return {min: lowest, max: highest};
  }
};

window['onload'] = function () {
  if (map.hasOwnProperty(host)) {
    app.init(map[host]);
  }
};
