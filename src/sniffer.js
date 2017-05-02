var Sniffer = function () {

};

Sniffer.prototype.ajax = function (next) {
  Proxy.ajax(next);
};

Sniffer.prototype.hashChange = function (next) {
  Proxy.hashChange(next);
};