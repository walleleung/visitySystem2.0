//index.js
//获取应用实例
const app = getApp()
import Toast from '@vant/weapp/toast/toast';

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    radio: '',
    sex: '',
    nation: '',
    age: '',
    married: '',
    education: '',
    bottom: false,
    nationOption: ["汉族",
      "蒙古族",
      "藏族",
      "苗族",
      "壮族",
      "回族",
      "维吾尔族",
      "彝族",
      "布依族",
      "朝鲜族",
      "侗族",
      "白族",
      "哈尼族",
      "傣族",
      "傈僳族",
      "畲族",
      "拉祜族",
      "满族",
      "瑶族",
      "土家族",
      "哈萨克族",
      "黎族",
      "佤族",
      "高山族",
      "水族",
      "东乡族",
      "景颇族",
      "土族",
      "仫佬族",
      "布朗族",
      "毛南族",
      "锡伯族",
      "普米族",
      "纳西族",
      "柯尔克孜族",
      "达斡尔族",
      "羌族",
      "撒拉族",
      "仡佬族",
      "阿昌族",
      "塔吉克族",
      "怒族",
      "俄罗斯族",
      "德昂族",
      "裕固族",
      "塔塔尔族",
      "鄂伦春族",
      "门巴族",
      "基诺族",
      "乌孜别克族",
      "鄂温克族",
      "保安族",
      "京族",
      "独龙族",
      "赫哲族",
      "珞巴族"]
  },

  onLoad: function () {
    //更新openid
    app.updateOpenid()
    // Toast.loading({
    //   mask: true,
    //   message: '加载中...',
    //   duration: 2000
    // });

  },
  nextPage: function () {
    var message = []
    message.push(this.data.sex)
    message.push(this.data.nation)
    message.push(this.data.age)
    message.push(this.data.married)
    message.push(this.data.education)
    console.log(message)

    this.send(message)
  },
  //发送信息
  send: function (message) {

    var newopenid = app.globalData.openid
    var newSession_key = app.globalData.session_key
    newSession_key = newSession_key.replace(/ +/g, '%2B')
    newopenid = newopenid.replace(/ +/g, '%2B')
    var that = this
    wx.request({
      //获取openid接口
      url: getApp().globalData.submitInfoUrl,
      data: {
        openid: newopenid,
        session_key: newSession_key,
        message: message
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        if (res.data.errorCode == 200) {

          wx.navigateTo({
            url: '../usernear/usernear'
          })

        } else {
          //登录过期
          if (res.data.errCode != 200) {
            console.log("提交失败")
            //更新openid
            Toast.loading({
              mask: true,
              message: '加载中...',
              duration: 100
            });
            that.send(message)
          }
        }

      },
    })

  },

  toggle(type) {
    this.setData({
      [type]: !this.data[type]
    });
  },
  //性别
  onChangeSex: function (event) {
    this.setData({
      sex: event.detail
    })
  },
  //年龄
  onChangeAge: function (event) {
    this.setData({
      age: event.detail
    })
  },
  //婚姻
  onChangeMarried: function (event) {
    this.setData({
      married: event.detail
    })
  },
  //学历
  onChangeEducation: function (event) {
    this.setData({
      education: event.detail
    })
  },

  //民族显示
  showBottom: function () {
    this.toggle('bottom', true);
  },
  hideBottom: function () {
    this.toggle('bottom', false);
  },
  onCancelNation: function () {
    this.hideBottom()
  },
  onConfirmNation: function (value) {
    console.log(this.data.sex)
    console.log(this.data.nation)
    console.log(value.detail)
    this.setData({
      nation: value.detail.value
    })
    this.hideBottom()
  }
})
