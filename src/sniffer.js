var Sniffer = function () {

};

Sniffer.prototype.ajax = function (next) {
  Proxy.ajax(next);
};