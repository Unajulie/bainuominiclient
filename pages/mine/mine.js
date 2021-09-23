// pages/mine/mine.js

//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    login:false
  },
//事件处理函数
bindViewTap: function() {
  wx.navigateTo({
    url: '../logs/logs'
  })
},
onShow:function(){
  let oThis=this
  wx.getStorage({
    key:"sessionuser",
    success:function(session){
      console.info("success")
      oThis.setData({login:true})
    },
    fail:function(){
      console.info("fail")
      oThis.setData({login:false})
    }
  })
},
  /**
   * 生命周期函数--监听页面卸载
   */
  login:function(){
    console.info("fuckyou")
    let oThis=this
    if(this.data.login){
      wx.removeStorage({
        key: 'sessionuser',
        success: function(res) {
          oThis.setData({login:false})
          wx.switchTab({
            url: '../index/index',
          })
        },
      })

    }else{
      wx.navigateTo({
        url: '../user/login',
      })
    }
   
  },
  onLoad: function () {
  
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }

})