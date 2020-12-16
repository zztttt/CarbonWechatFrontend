// pages/cart/cart.js
import { stringSwitch } from "../../utils/util";
import { vehicleStringSwitch } from "../../utils/util"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    vehicles: [
      {name:"地铁", "b":2, "c":3},
      {name:"单车", "b":8, "c":9},
      {name:"公交", "b":5, "c":6}
    ],
    active: '首页',
    visible: true,
    vehicleType: null
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
    });
  },
  bindViewTap(e) {
    console.log("bindViewTap:" + e.currentTarget.dataset.vehicle.name);
    this.setData({
      vehicleType: vehicleStringSwitch(e.currentTarget.dataset.vehicle.name)
    });
  },
  start(e) {
    if(this.data.vehicleType != null){
      let _userdata = wx.getStorageSync('userdata');
      let _data = {userid: _userdata.id, vehicletype: this.data.vehicleType};
      console.log(_data);
      let timer = new Date();
      wx.request({
        url: 'http://114.55.137.158:8080/user/startTravel',
        method: "POST",
        data: _data,
        header: {
          'content-type': 'application/json', // 默认值
        },
        success(res) {
          console.log(res);
          wx.setStorageSync('travelRecord', res.data.data);
        }
      })
      this.setData({
        visible: false,
        vehicleType: null
      });
    }else{
      wx.showToast({
        title: '请选择出行工具！',
        icon: 'none',
        duration: 2000
      })
    }
  },
  end(e) {
    console.log("end");
    let _userdata = wx.getStorageSync('userdata');
    let _travelData = wx.getStorageSync('travelRecord');
    let _data = { id: _travelData.id, userid: _travelData.userid };
    wx.request({
      url: 'http://114.55.137.158:8080/user/endTravel',
      method: "POST",
      data: _data,
      header: {
        'content-type': 'application/json', // 默认值
      },
      success(res) {
        console.log(res);
      }
    })
    this.setData({visible: true});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _userdata = wx.getStorageSync('userdata');
    this.setData({
      visible: _userdata.istraveling? false: true
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