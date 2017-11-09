var app = getApp();
Page({
  data: {
    type: 'out',
    money: 0,
    text: ''
  },
  setType: function(event) {
      this.setData({
          type: event.currentTarget.dataset.type
      });
  },
  setMoney: function(event) {
    this.setData({
        money: event.detail.value
    });
  },
  setText: function(event) {
      this.setData({
          text: event.detail.value
      });
  },
  submit: function() {
    if (!this.data.money || isNaN(this.data.money)) return wx.showToast({
      title: '请输入正确的金额'
    });
    if (!this.data.text) {
      this.setData({
        text: this.data.type === 'out' ? '默认支出' : '默认收入'
      });
    }
    if (this.data.type === 'out') this.setData({
        money: -this.data.money
    });
    wx.showLoading({
      title: '添加中...',
    });
    app.request('create', {auth: app.globalData.user, money: this.data.money, text: this.data.text}, function(res) {
      wx.hideLoading();
      wx.navigateBack();
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
        title: '添加记录'
    });
  }
})