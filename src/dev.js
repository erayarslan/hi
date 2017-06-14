var Dev = {
  log: function (str) {
    service.db.put({
      _id: Utils.getStrId(),
      type: 'dev-log',
      log: str
    });
  }
};