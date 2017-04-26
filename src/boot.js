window['onload'] = function () {
  if (map.hasOwnProperty(site)) {
    if (!utils.isHepsiburada()) {
      app.init(map[site]);
    }
  }
};