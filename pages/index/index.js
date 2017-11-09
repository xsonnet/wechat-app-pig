var app = getApp();
Page({
  data: {
    total: 0.00,
    income: 0.00,
    outlay: 0.00,
    list: []
  },
  //事件处理函数
  create: function() {
      app.checkLogin(function() {
          wx.navigateTo({
              url: 'create'
          });
      });
  },
  enterSearch: function() {
    wx.navigateTo({
      url: 'search'
    });
  },
  enterUserIndex: function() {
      var that = this;
      app.checkLogin(function() {
        wx.navigateTo({
          url: '/pages/user/index'
        });
      });
  },
  show: function(event) {
    var record = event.currentTarget.dataset.record;
    app.showRecord(record);
  },
  getData: function() {
      var that = this;
      wx.getStorage({
        key: 'user',
        success: function(res) {
          if (res) {
            app.request('index', { auth: res.data }, function (res) {
              that.setData({
                total: res.total,
                income: res.income,
                outlay: res.outlay,
                list: res.list
              });
            });
          }
        },
      });
  },
  onShow: function () {
    this.getData();
  }
});