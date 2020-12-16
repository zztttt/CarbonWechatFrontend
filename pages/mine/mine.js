// pages/mine/mine.js
import { stringSwitch } from "../../utils/util";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: '我的',
    username: "null",
    userdesc: "null",
    istraveling: "null",
    credit: -1
  },
  tarbarChange(e) {
    console.log("tarbarChange:" + e.detail);
    this.setData({
      active: e.detail
    });
    var dst = stringSwitch(e.detail);
    var _url = '../' + dst + '/' + dst;
    console.log(_url);
    wx.redirectTo({
      url: _url
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _userdata = wx.getStorageSync('userdata');
    wx.request({
      url: 'http://114.55.137.158:8080/user/login',
      method: "POST",
      data: {username: _userdata.username, password: _userdata.password},
      header: {
        'content-type': 'application/json', // 默认值
      },
      success(res) {
        console.log(res);
        wx.setStorageSync('userdata', res.data.data);
      }
    })
    
    _userdata = wx.getStorageSync('userdata');
    var _userdesc = _userdata.userdesc;
    this.setData({
      username: _userdata.username,
      istraveling: _userdata.istraveling? "正在出行":"未出行",
      credit: _userdata.credit,
      userdesc: _userdesc.university + ", " +  _userdesc.dorm + ", " + _userdesc.lab
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})