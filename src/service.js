var service = {
  init: function () {
    this.guid = Utils.guid();
    this.db = new PouchDB('hi');
    this.session = new Session();
    this.initSession();
    this.worker = new Worker(this.getBlobScriptUrl(worker.pass(this.guid)));
    this.worker.onmessage = this.onWorker.bind(this);
    this.defineEvents();
  },
  defineEvents: function () {
    chrome.browserAction.onClicked.addListener(this.onClickedIcon.bind(this));
    chrome.runtime.onMessage.addListener(this.onMessage.bind(this));
  },
  initSession: function () {
    this.session.set('run', 0);
  },
  onWorker: function (e) {
    console.log(e.data);
  },
  onClickedIcon: function (tab) {
    Notification.welcome();
  },
  onMessage: function (req, sender, sendRes) {
    if (req.iframe) {
      this.onMessageFromIframe(req.iframe);
    } else if (req.clickTracker) {
      this.collectTrackerLink(req.clickTracker);
    }
  },
  onMessageFromIframe: function (results) {
    var data = results[0];

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

      service.db.put({
        _id: Utils.getStrId(),
        type: 'log',
        log: data.url
      });
    }
  },
  collectTrackerLink: function (link) {
    service.db.put({
      _id: Utils.getStrId(),
      type: 'tracker_link',
      link: link
    });
  },
  navigate: function (url) {
    chrome.tabs.create({url: url});
  },
  moneyToNumber: function (str) {
    return parseFloat(str.indexOf(DEFAULT_CURRENCY) > -1 ? str.split('.').join('') : str);
  },
  fileToUrl: function (file) {
    return chrome.runtime.getURL(file);
  },
  getBlobScriptUrl: function (source) {
    return window['URL']['createObjectURL'](new Blob([source], {type: 'text/javascript'}));
  }
};

service.init();