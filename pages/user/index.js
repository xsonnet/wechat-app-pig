var app = getApp();
Page({
  data: {
    phone: ''
  },
  showDateDialog: function() {

  },
  showAboutDialog: function() {
    
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '用户中心'
    });
    var that = this;
    app.checkLogin(function() {
      var auth = app.globalData.user.split('[*]');
      that.setData({
        phone: auth[0]
      });
    });
  }
})