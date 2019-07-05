//index.js
var amapFile = require('../../js/amap-wx.js');//如：..­/..­/libs/amap-wx.js
const app = getApp()
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    weather: {},
    listItems: ['', '', '', '', '', ''],
    openid: '',
    searched: {},
    nowTime: '' 
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })

    const that = this;
    var myAmapFun = new amapFile.AMapWX({ key: '37ca04022b8f57423edaeca34af067ad' });
    myAmapFun.getWeather({
      success: function (data) {
        app.globalData.weather= data.weather.data
        app.globalData.address= data.city.data
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

  onShow: function () {
    // 页面显示
    var commonFunction = require('../../js/common.js'),
      that = this;
    var interval = setInterval(function () {
      that.setData({
        nowTime: commonFunction.formatTime(new Date())
      })
    }, 1000);
  },
  
  onReady: function () {
    const that = this
    const db = wx.cloud.database()
    that.data.searched = {}
    var rem = {}
    wx.cloud.callFunction({
      // 云函数名称
      name: 'search',
      // 传给云函数的参数
      data: {},
      success: function (res) {
        that.setData({
          searched: res.result.data
        })
      },
    })
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            wx.showToast({
              icon: 'none',
              title: '上传成功',
            })
            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
          },
          fail: e => {
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
      }
    })
  },

  gotonew(){
    wx.navigateTo({
      url: '../newpage/newpage',
    })
  },

  onShareAppMessage: function (res) {
    var that = this;
    return {
      title: 'Min 💗💗 Yun',
      desc: '微距MY',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功

        that.shareClick();
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
})


