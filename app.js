//app.js
var util = require('/utils/util.js');
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
  },
  request: function(action, data, callback, fail) {
    wx.request({
        url: this.globalData.server + action,
        data: data,
        success: function(res) {
            if (!res.data) return wx.showToast({
                title: '通讯出错'
            });
            if (res.data.code === 0) return wx.showToast({
                title: res.data.msg
            });
            if (res.data.code === 1 && typeof(callback) === 'function') {
                callback(res.data.data);
            }
        },
        fail: function(err) {
            if (fail && typeof(fail) === 'function') fail(err);
        }
    });
  },
  checkLogin: function(callback) {
      var that = this;
      wx.getStorage({
          key: 'user',
          success: function (res) {
              if (res) {
                  that.globalData.user = res.data;
                  callback();
              }
          },
          fail: function (err) {
              if (err) wx.navigateTo({
                  url: '/pages/user/login'
              });
          }
      });
  },
  showRecord: function(record) {
    var content = util.formatTime(new Date(record.time));
    content += record.money > 0 ? ' 收入' : ' 支出';
    content += record.money + '元：' + record.text
    wx.showModal({
        title: '详情',
        content: content,
        showCancel: false
    });
  },
//   getUserInfo:function(cb){
//     var that = this
//     if(this.globalData.userInfo){
//       typeof cb == "function" && cb(this.globalData.userInfo)
//     }else{
//       //调用登录接口
//       wx.login({
//         success: function () {
//           wx.getUserInfo({
//             success: function (res) {
//               that.globalData.userInfo = res.userInfo
//               typeof cb == "function" && cb(that.globalData.userInfo)
//             }
//           })
//         }
//       })
//     }
//   },
  globalData:{
    server: 'http://localhost:3512/',
    user: null
  }
})