// pages/exchangeHistory/exchangeHistory.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    testitems: [
      {title: "title1", price: 1, num: 1, desc: "desc1", img: "http://img3m9.ddimg.cn/12/36/1546133799-1_w_1.jpg"},
      {title: "title2", price: 2, num: 2, desc: "desc2", img: "http://img3m9.ddimg.cn/12/36/1546133799-1_w_1.jpg"},
      {title: "title3", price: 3, num: 3, desc: "desc3", img: "http://img3m9.ddimg.cn/12/36/1546133799-1_w_1.jpg"},
      {title: "title4", price: 4, num: 4, desc: "desc4", img: "http://img3m9.ddimg.cn/12/36/1546133799-1_w_1.jpg"},
      {title: "title5", price: 5, num: 5, desc: "desc5", img: "http://img3m9.ddimg.cn/12/36/1546133799-1_w_1.jpg"},
      {title: "title6", price: 6, num: 6, desc: "desc6", img: "http://img3m9.ddimg.cn/12/36/1546133799-1_w_1.jpg"},
      {title: "title7", price: 7, num: 7, desc: "desc7", img: "http://img3m9.ddimg.cn/12/36/1546133799-1_w_1.jpg"},
      {title: "title8", price: 8, num: 8, desc: "desc8", img: "http://img3m9.ddimg.cn/12/36/1546133799-1_w_1.jpg"}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _userdata = wx.getStorageSync('userdata');
    this.setData({
      items: _userdata.userexchanges
    });
    console.log(this.items);
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