var app = getApp();
Page({
  data: {
    list: [],
    page: 1,
    noMore: false
  },
  onLoad: function (options) {
    this.getData();
  },
  getData: function() {
    var that = this;
    app.checkLogin(function() {
      app.request('list', {auth: app.globalData.user, page: that.data.page}, function(res) {
        if (res.length === 0) return that.setData({
          noMore: true
        });
        console.log(res);
        var temp = that.data.list;
        for (var i=0;i<res.length;i++) {
          temp.push(res[i]);
        }
        that.setData({
          list: temp
        });
      });
    });
  },
  show: function (event) {
    var record = event.currentTarget.dataset.record;
    app.showRecord(record);
  },
  onReachBottom: function () {
    if (this.data.noMore) return wx.showToast({
      title: '没有数据了'
    });
    this.setData({
      page: this.data.page + 1
    });
    this.getData();
  }
});