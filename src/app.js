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
    var name = eval(data.product_name);

    var scripts = utils.tunnelScripts();

    scripts.execute(data.product_brand, function (brand) {
      var product = {name: name, brand: brand};
      var detects = app.analyze(product);
      console.log("Detected from hi", detects);
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

      var out = {text: x.result, score: x.score, from: a};

      out = x.score > y.score ? {text: y.result, score: y.score, from: b} : {text: x.result, score: x.score, from: a};
      out = y.score > z.score ? {text: z.result, score: z.score, from: c} : {text: y.result, score: y.score, from: b};
      out = z.score > x.score ? {text: x.result, score: x.score, from: a} : {text: z.result, score: z.score, from: c};

      if (out.score <= expected_score) {
        results.push(out);
      }
    }

    return results.map(function (value) {
      return value.text;
    }).filter(function (value, index, self) {
      return self.indexOf(value) === index;
    });
  }
};

window['onload'] = function () {
  if (map.hasOwnProperty(host)) {
    app.init(map[host]);
  }
};
