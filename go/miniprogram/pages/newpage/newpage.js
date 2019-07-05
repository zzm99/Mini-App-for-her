// miniprogram/pages/newpage/newpage.js
const app = getApp()
var amapFile = require('../../js/amap-wx.js');//如：..­/..­/libs/amap-wx.js

Page({
  data: {
    openid: '',
    weather: {},
    openid: '',
    imgUrl: 'cloud://study-cloud-1cd056.7374-study-cloud-1cd056/images/japflower.jpg',
    desc: ''
  },

  onLoad: function () {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: '37ca04022b8f57423edaeca34af067ad' });
    myAmapFun.getWeather({
      success: function (data) {
        that.setData({
          weather: data
        });
      },
      fail: function (info) {
        // wx.showModal({title:info.errMsg})
      }
    })

    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        app.globalData.openid = res.result.openid
        this.setData({
          openid: res.result.openid
        })
      },
      fail: err => {
      }
    })
  },

  bindTextAreaBlur: function (e) {
    const that = this
    that.setData({
      desc: e.detail.value
    })
  },

  upload() {
    const that = this
    var ret = "";
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.showLoading({
          title: '上传中'
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let filePath = res.tempFilePaths[0]
        const name = Math.random() * 1000000
        const cloudPath = 'picture/' + name + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath, // 云存储图片名字
          filePath // 临时路径
        }).then(res => {
          console.log(res)
          wx.hideLoading()
          that.data.imgUrl = res.fileID
          ret = res.fileID
        }).catch(e => {
        })
      }
    })
  },

  subbbb() {
    this.bindTextAreaBlur
    const that = this
      const db = wx.cloud.database()
      const diary = db.collection('diary')
      var myDate = new Date()
      var chazhis = myDate.getTime()
      var ss = myDate.toLocaleDateString()
      var rr = that.data.desc
      var ff = that.data.imgUrl
      diary.add({
        data: {
          chazhi: chazhis,
          desc: rr,
          time: ss,
          url: ff,
          weather: app.globalData.weather,
          address: app.globalData.address,
        }
      }).then(res => {
      }).catch(e => {
      })
      
    wx.reLaunch({
      url: '../index/index'
    })
  }

})