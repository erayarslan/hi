var isTop = true;
var host = location.host;
var site = host['startsWith'](HOST_JOKER_PREFIX) ? host.substr(HOST_JOKER_PREFIX.length) : host;
var scripts = utils.tunnelScripts();

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
    var p1 = scripts.execute(data.product_name);
    var p2 = scripts.execute(data.product_brand);

    Promise.all([p1, p2]).then(app.done);
  },
  done: function (arr) {
    var detects = [];

    for (var i = 0; i < arr.length; i++) {
      detects = detects.concat(app.analyze(arr[i]));
    }

    detects = detects.filter(function (value, index, self) {
      return self.indexOf(value) === index;
    });

    // detection disabled
    if (detects.length) {
    }

    var query = app.query(arr);
    app.search(query);
  },
  search: function (query) {
    search(query, function () {
    });
  },
  query: function (arr) {
    var result = [], ignored = [];
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr.length; j++) {
        if (i !== j && arr[i].indexOf(arr[j]) > -1) {
          ignored.push(j);
        }
      }
    }

    for (var k = 0; k < arr.length; k++) {
      if (ignored.indexOf(k) === -1) {
        result.push(arr[k]);
      }
    }

    return result.join(' ').split(' ').map(function (o) {
      return o.trim()
    }).slice(0, QUERY_SLICE_COUNT).join(' ').trim().toLowerCase();
  },
  analyze: function (text) {
    var words = text.trim().toLowerCase().split(' ');
    var results = [];

    for (var i = 0; i < words.length; i++) {
      var a = words.slice(i, 1 + i).join(' ').trim();
      var b = words.slice(i, 2 + i).join(' ').trim();
      var c = words.slice(i, 3 + i).join(' ').trim();

      var x = a.similar(keywords);
      var y = b.similar(keywords);
      var z = c.similar(keywords);

      var out = app.select([x, y, z], [a, b, c]);

      if (out.score <= EXPECTED_SCORE) {
        results.push(out);
      }
    }

    return results.map(function (value) {
      return value.text;
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
  },
  sendToPlugin: function (obj) {
    chrome.runtime.sendMessage(obj, function (response) {
    });
  }
};

window['onload'] = function () {
  if (map.hasOwnProperty(site)) {
    app.init(map[site]);
  }
};

