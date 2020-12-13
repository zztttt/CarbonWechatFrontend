//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    username: 'zzt',
    password: '123',
    userdata: null,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    let that = this;
    wx.setStorageSync('username', this.data.username);
    wx.setStorageSync('password', this.data.password);
    // axios
    wx.request({
      url: 'http://114.55.137.158:8080/user/login',
      method: "POST",
      data: {username: this.data.username, password: this.data.password},
      header: {
        'content-type': 'application/json', // 默认值
      },
      success(res) {
        console.log(res);
        wx.setStorageSync('userdata', res.data.data);
      }
    })
    wx.navigateTo({
      url: '../home/home'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
