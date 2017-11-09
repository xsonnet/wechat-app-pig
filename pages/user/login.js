var app = getApp();
Page({
  data: {
      phone: '',
      password: ''
  },
  redirect: function() {
      wx.redirectTo({
          url: 'register'
      });
  },
  inputPhone: function (event) {
      this.setData({
          phone: event.detail.value
      });
  },
  inputPassword: function (event) {
      this.setData({
          password: event.detail.value
      });
  },
  submit: function() {
      if (!this.data.phone) return wx.showToast({
          title: '手机号不能为空',
      });
      if (!this.data.password) return wx.showToast({
          title: '密码不能为空',
      });
      wx.showLoading({
          title: '登录中...',
      });
      app.request('login', { phone: this.data.phone, password: this.data.password }, function(res) {
          wx.hideLoading();
          wx.setStorage({
              key: 'user',
              data: res.phone + '[*]' + res.password,
              success: function () {
                  wx.redirectTo({
                      url: '/pages/user/index',
                  });
              }
          });
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
        title: '登录'
    });
  }
});