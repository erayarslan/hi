var Tracker = function () {

};

Tracker.prototype.click = function (selectors, next) {
  Proxy.clickTracker(selectors, next);
};
