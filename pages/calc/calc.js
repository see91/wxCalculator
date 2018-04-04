// pages/calc/calc.js
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
  
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
  
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {
  
//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {
  
//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {
  
//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {
  
//   }
// })

Page({
  data: {
    seeback: "back",
    seeclear: "clear",
    seetoggle: "toggle",
    seeadd: "＋",
    see9: "9",
    see8: "8",
    see7: "7",
    seeless: "－",
    see6: "6",
    see5: "5",
    see4: "4",
    seex: "×",
    see3: "3",
    see2: "2",
    see1: "1",
    seedivision: "÷",
    see0: "0",
    seepoint: ".",
    seeequal: "＝",
    screenData: "0",
    operaSymbo: { "＋": "+", "－": "-", "×": "*", "÷": "/", ".": "." },
    lastIsOperaSymbo: false,
    iconType: 'waiting_circle',
    iconColor: 'white',
    arr: [],
    logs: []
  },
  clickBtn: function (event) {
    var id = event.target.id;
    if (id == this.data.seeback) {  //退格←
      var data = this.data.screenData;
      if (data == "0") {
        return;
      }
      data = data.substring(0, data.length - 1);
      if (data == "" || data == "－") {
        data = 0;
      }
      this.setData({ "screenData": data });
      this.data.arr.pop();
    } else if (id == this.data.seeclear) {  //清屏C
      this.setData({ "screenData": "0" });
      this.data.arr.length = 0;
    } else if (id == this.data.seetoggle) {  //正负号+/-
      var data = this.data.screenData;
      if (data == "0") {
        return;
      }
      var firstWord = data.charAt(0);
      if (data == "－") {
        data = data.substr(1);
        this.data.arr.shift();
      } else {
        data = "－" + data;
        this.data.arr.unshift("－");
      }
      this.setData({ "screenData": data });
    } else if (id == this.data.seeequal) {  //等于＝
      var data = this.data.screenData;
      if (data == "0") {
        return;
      }
      //eval是js中window的一个方法，而微信页面的脚本逻辑在是在JsCore中运行，JsCore是一个没有窗口对象的环境，所以不能再脚本中使用window，也无法在脚本中操作组件                 
      //var result = eval(newData);           

      var lastWord = data.charAt(data.length);
      if (isNaN(lastWord)) {
        return;
      }

      var num = "";

      var lastOperator = "";
      var arr = this.data.arr;
      var optarr = [];
      for (var i in arr) {
        if (isNaN(arr[i]) == false || arr[i] == this.data.seepoint || arr[i] == this.data.seetoggle) {
          num += arr[i];
        } else {
          lastOperator = arr[i];
          optarr.push(num);
          optarr.push(arr[i]);
          num = "";
        }
      }
      optarr.push(Number(num));
      var result = Number(optarr[0]) * 1.0;
      console.log(result);
      for (var i = 1; i < optarr.length; i++) {
        if (isNaN(optarr[i])) {
          if (optarr[1] == this.data.seeadd) {
            result += Number(optarr[i + 1]);
          } else if (optarr[1] == this.data.seeless) {
            result -= Number(optarr[i + 1]);
          } else if (optarr[1] == this.data.seex) {
            result *= Number(optarr[i + 1]);
          } else if (optarr[1] == this.data.seedivision) {
            result /= Number(optarr[i + 1]);
          }
        }
      }
      //存储历史记录
      this.data.logs.push(data + result);
      wx.setStorageSync("calclogs", this.data.logs);

      this.data.arr.length = 0;
      this.data.arr.push(result);

      this.setData({ "screenData": result + "" });
    } else {
      if (this.data.operaSymbo[id]) { //如果是符号+-*/
        if (this.data.lastIsOperaSymbo || this.data.screenData == "0") {
          return;
        }
      }

      var sd = this.data.screenData;
      var data;
      if (sd == 0) {
        data = id;
      } else {
        data = sd + id;
      }
      this.setData({ "screenData": data });
      this.data.arr.push(id);

      if (this.data.operaSymbo[id]) {
        this.setData({ "lastIsOperaSymbo": true });
      } else {
        this.setData({ "lastIsOperaSymbo": false });
      }
    }
  },
  history: function () {
    wx.navigateTo({
      url: '../history/history'
    })
  }
})