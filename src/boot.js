window['onload'] = function () {
  if (map.hasOwnProperty(site)) {
    if (!Utils.isHepsiburada()) {
      App.init(map[site]);
    }
  } else if (tracker_map.hasOwnProperty(site)) {
    App.tracker(tracker_map[site]);
  }

  App.sendToPlugin({run: true});
};