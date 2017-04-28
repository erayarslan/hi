var isTop = true;
var host = location.host;
var site = host['startsWith'](HOST_JOKER_PREFIX) ? host.substr(HOST_JOKER_PREFIX.length) : host;

var App = {
  init: function (data) {
    var path = new Path(data.product_detail, location.pathname);
    var sniffer = new Sniffer();

    sniffer.ajax(this.onAjax.bind(this));

    if (path.test()) {
      var params = path.params();
      App.collect(data);
    }
  },
  onAjax: function (res) {
    this.sendToPlugin({ajax: res});
  },
  collect: function (data) {
    window['Promise'].all([
      Proxy.execute("product_name", data.product_name),
      Proxy.execute("product_brand", data.product_brand),
      Proxy.execute("product_price", data.product_price)
    ]).then(App.done);
  },
  detect: function (arr) {
    var detects = [];

    for (var i = 0; i < arr.length; i++) {
      detects = detects.concat(App.analyze(arr[i]));
    }

    detects = detects.filter(function (value, index, self) {
      return self.indexOf(value) === index;
    });

    return detects.length;
  },
  done: function (arr) {
    var obj = Utils.collectionArrToSingleObj(arr);
    arr = [obj.product_name, obj.product_brand];

    if (!BRAND_DETECTION || App.detect(arr)) {
      var query = App.query(arr);
      Search(query, obj.product_price);
    }
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

      var x = a.similar(brands);
      var y = b.similar(brands);
      var z = c.similar(brands);

      var out = App.select([x, y, z], [a, b, c]);

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

    return App.getMinAndMax(arr, 'score').min;
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

