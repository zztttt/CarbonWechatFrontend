const app = getApp()
// pages/books/books.js
import { stringSwitch } from "../../utils/util";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rewards:[
      { name: "reward1", id: 1},
      { name: "reward2", id: 2},
      { name: "reward3", id: 3},
      { name: "reward4", id: 4},
      { name: "reward5", id: 5},
      { name: "reward6", id: 6}
    ],
    carouselImgUrls: [
      "../../assets/book1.jpg",
      "../../assets/book2.jpg",
      "../../assets/book3.jpg",
      "../../assets/book4.jpg"
    ],
    searchValue:"",
    show: false,
    reward: null,
    active: '兑换'
  },
  //点击书籍
  showRewardDetail: function (event) {
    this.setData({ show: true, reward: event.currentTarget.dataset.reward});
    console.log(event.currentTarget.dataset.reward);
  },
  //搜索框
  onChange(e) {
    console.log("onChange");
    this.setData({
      searchvalue: e.detail
    });
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

  onSearch() {
    wx.showToast({
      title: '搜索功能还没做，偷个懒！',
      icon: 'none',
      duration: 2000
    })
  },
  //点击坐下图标
  onClickIcon() {
    wx.showToast({
      title: '客服没钱请！购物车还没做！',
      icon: 'none',
      duration: 2000
    })
  },
  //点击右下按钮
  onClickButton() {
    wx.showToast({
      title: '别买了！！！',
      icon: 'none',
      duration: 2000
    })
  },
  //点击底边栏
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    /*wx.request({
      url: 'http://localhost:8080/getBooks',
      method: "POST",
      data: {
        11:11
      },
      header: {
        'content-type': 'application/json', // 默认值
        'cookie': wx.getStorageSync("sessionid") //cookie
      },
      success(res) {
        console.log(res);
        that.setData({
          books: res.data
        })
      }
    });*/
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