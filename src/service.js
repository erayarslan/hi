var service = {
  worker: function (str) {
    return new Worker(URL.createObjectURL(new Blob([str.pass(Utils.guid())], {type: "text/javascript"})));
  },
  navigate: function (url) {
    chrome.tabs.create({url: url});
  },
  moneyToNumber: function (str) {
    var a = str.indexOf(DEFAULT_CURRENCY) > -1 ? str.split('.').join('') : str;
    return parseFloat(a);
  },
  init: function () {
    this.db = new PouchDB('hi');
    this.session = new Session();

    this.worker(worker)['onmessage'] = function (e) {
      console.log(e.data);
    };

    this.session.set('run', 0);
  },
  db: void 0,
  fileToUrl: function (file) {
    return chrome.runtime.getURL(file);
  }
};

chrome.browserAction.onClicked.addListener(function (tab) {
  Notification.welcome();
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.iframe) {
    var data = request.iframe;

    var price = service.moneyToNumber(data.price);
    var cmp_price = service.moneyToNumber(data.cmp_price);

    if (cmp_price > price) {
      Notification.product({
        title: 'Daha ucuza Hepsiburada.com\'da !',
        message: data.price,
        image: data.image,
        rating: data.rating
      }, function () {
        service.navigate(data.url);
      }, function () {
        Notification.thanks();
      });

      service.db.put({_id: Utils.getStrId(), type: 'log', log: data.url});
    }
  }
});

service.init();