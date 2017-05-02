window['onload'] = function () {
  if (map.hasOwnProperty(site)) {
    if (!Utils.isHepsiburada()) {
      App.init(map[site]);
    }
  }

  App.sendToPlugin({run: true});
};