// pages/myinfor/myinfor.js
const app = getApp()
var time = require("../../utils/util.js")
Page({
  data: {
    //性别
    sex:'男',
    showSex: false,
    sexOption: [
      { name: '男' },
      { name: '女' }
    ],

    //标签
    tabs:'沉稳',
    showTabs: false,
    tabsOption: [
      { name: '沉稳' },
      { name: '太沉稳' },
      { name: '热情' },
      { name: '太热情' }
    ],

    //时间
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      }
      if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    minDate: new Date(1900, 1, 1).getTime(),
    maxDate: new Date(2021, 1, 1).getTime(),
    currentDate: new Date(1980, 1, 1).getTime(),
    userDate:'1997年1月1日',
    bottom: false,
  
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
    app.getUseInfoDetail()
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  //修改个人信息
  confirmInfo:function(e){
    var that = this
    wx.request({
      //获取openid接口
      url: getApp().globalData.insertUpdateInfoUrl,
      data: {
        openid: getApp().globalData.openid,
        sessionkey: getApp().globalData.sessionkey,
        gender: that.data.gender,
        birthday:that.data.currentDate,
        tabs:that.data.tabs
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
       
      }
    })
  },

  //性别选择
  toggle(type) {
    this.setData({
      [type]: !this.data[type]
    });
  },
  toggleActionSheet1() {
    this.toggle('showSex');
  },
  onSelectSex(event){
    console.log(event.detail)
    this.setData({
      sex: event.detail.name
    })
    this.toggle('showSex');
  },

  //日期栏显示
  showBottom() {
    this.toggle('bottom', true);
  },
  hideBottom() {
    this.toggle('bottom', false);
  },

  confirmData:function(value){
    console.log(value)
    this.setData({
      currentDate: value.detail,
      userDate: time.formatTimeTwo(value.detail, 'Y年M月D日')
    })
    this.hideBottom()
  },
  cancelData: function () {
    this.hideBottom()
  },

  //标签显示
  toggleActionSheet2() {
    this.toggle('showTabs');
  },
  onSelectTabs(event){
    console.log(event.detail)
    this.setData({
      tabs:event.detail.name
    })
    this.toggle('showTabs');
  },
  showTabs() {
    this.toggle('bottom', true);
  },
  hideTabs() {
    this.toggle('bottom', false);
  },

  //返回键
  backClick:function(){
    wx.navigateBack({
      delta:1
    })
  }
})
