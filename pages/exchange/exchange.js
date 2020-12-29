const app = getApp()
// pages/books/books.js
import { stringSwitch } from "../../utils/util";
import { editDistance } from "../../utils/util";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    /* reward:
    * credit: 180000
    * exchanged: 0
    * id: 1608479407495
    * image: "https://carbon-image.oss-cn-shanghai.aliyuncs.com/csapp.jpg"
    * inventory: 999
    * name: "CSAPP"
    * price: 180
    */
    originalRewards: [],
    rewards: [],
    reward: null,
    rewardCount: 1,
    searchHistory: null,
    testrewards:[
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
  plusCount(e) {
    this.setData({rewardCount: this.data.rewardCount + 1});
  },
  minusCount(e) {
    if(this.data.rewardCount == 0)
      return;
    this.setData({rewardCount: this.data.rewardCount - 1});
  },
  makeExchange(e) {
    var that = this;
    var _userdata = wx.getStorageSync('userdata');
    wx.request({
      url: 'http://114.55.137.158:8080/user/makeExchange',
      method: "POST",
      header: {
        'content-type': 'application/json', // 默认值
      },
      data: { userid: _userdata.id, rewardid: this.data.reward.id, quantity: this.data.rewardCount },
      success(res) {
        console.log(res);
        that.setData({ show: false });
        wx.showToast({
          title: '兑换成功',
          icon: 'none',
          duration: 2000
        })
        wx.request({
          url: 'http://114.55.137.158:8080/user/postExchangeRecordForRecommend',
          method: "POST",
          header: {
            'content-type': 'application/json', // 默认值
          },
          data: {userid: _userdata.id, rewardid: that.data.reward.id},
          success(res) {
            console.log(res);
          }
        });
      }
    });
  },
  searchChange(e) {
    this.setData({searchValue: e.detail});
    console.log("searchValue:", this.data.searchValue);
  },
  search(e) {
    var _userdata = wx.getStorageSync('userdata');
    console.log("search:", this.data.searchValue);
    var searchValue = this.data.searchValue;
    if(searchValue === ""){
      this.setData({rewards: this.data.originalRewards});
      return;
    }
    var oldRewards = this.data.rewards;
    var len = oldRewards.length;
    var newRewards = [];
    for(var i = 0; i < len; ++i){
      var cur = oldRewards[i];
      /*if(cur.name.indexOf(searchValue) >= 0){
        newRewards.push(cur);
      }*/
      if(editDistance(cur.name, searchValue) <= 2){
        newRewards.push(cur);
      }
      console.log("editDistance:", cur.name, ", ", searchValue, ". ", editDistance(cur.name, searchValue));
    }

    this.setData({rewards: newRewards});
    /*var recordLength = newRewards.length;
    var searchHistory = this.data.searchHistory;
    //var searchHistoryUpdated = searchHistory;
    // update searchHistory
    for(var i = 0; i < recordLength; ++i){
      var cur = newRewards[i];
      if(searchHistory.has(cur.id)){
        var old = searchHistory.get(cur.id);
        searchHistory.set(cur.id, old + 1);
      }else{
        searchHistory.set(cur.id, 1);
      }
    }
    this.setData({searchHistory: searchHistory});
    console.log(this.data.searchHistory);*/
    var userid = _userdata.id;
    var searchRecords = { userid : _userdata.id, records: []};
    var recordLength = newRewards.length;
    for(var i = 0; i < recordLength; ++i){
      var cur = newRewards[i];
      searchRecords.records.push(cur.id);
    }
    console.log(searchRecords);
    wx.request({
      url: 'http://114.55.137.158:8080/user/postSearchRecordForRecommend',
      method: "POST",
      header: {
        'content-type': 'application/json', // 默认值
      },
      data: searchRecords,
      success(res) {
        console.log(res);
      }
    });
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
  onClickHide() {
    this.setData({show: false, rewardCount: 1});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var _userdata = wx.getStorageSync('userdata');
    wx.request({
      url: 'http://114.55.137.158:8080/user/recommendRewards',
      method: "POST",
      header: {
        'content-type': 'application/json', // 默认值
      },
      data: {userid: _userdata.id},
      success(res) {
        console.log(res);
        that.setData({
          originalRewards: res.data.data.Rewards,
          rewards: res.data.data.Rewards
        })
      }
    });
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