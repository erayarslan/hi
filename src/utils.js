var Utils = {
  isHepsiburada: function () {
    return location.host.indexOf(HEPSIBURADA) > -1;
  },
  collectionArrToSingleObj: function (arr) {
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
  },
  guid: function () {
    var guid = [];

    for (var i = 0; i < 8; i++) {
      guid.push(this.s4());
    }

    return guid.join('-');
  },
  s4: function () {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
};