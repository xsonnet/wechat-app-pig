var app = getApp();
Page({
  data: {
    keyword: '',
    list: []
  },
  bindSearch: function (event) {
    this.setData({
      keyword: event.detail.value
    });
  },
  search: function () {
    var that = this;
    app.checkLogin(function() {
      app.request('search', {auth: app.globalData.user, keyword: that.data.keyword}, function(res) {
        that.setData({
          list: res
        });
      });
    });
  },
  show: function (event) {
      var record = event.currentTarget.dataset.record;
      app.showRecord(record);
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '搜索'
    });
  }
})