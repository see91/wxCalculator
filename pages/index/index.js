var app = getApp();
Page({
  data: {
    title: '点击进入see91计算器',
    userInfo: {},
    iconType:'info_circle',
    plain:'default',
    disabled:false,
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let self = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      self.setData({
        userInfo: userInfo
      })
    })
  },
  toCalc: function () {
    wx.navigateTo({
      url: '../calc/calc'
    })
  }
})