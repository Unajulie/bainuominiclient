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
    login:false,
    username:'',
    phone:''
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
      console.info(session.data)
      console.info("success")
      oThis.setData({
        login:true,
        phone:session.data.phone
      })
    },
    fail:function(){
      oThis.setData({
        login:false,
        phone:''
      })
    }
  })
},
  /**
   * 生命周期函数--监听页面卸载
   */
  login:function(){
    let oThis=this
    if(this.data.login){
      wx.removeStorage({
        key: 'sessionuser',
        success: function(res) {
          oThis.setData({login:false,phone:''})
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
  
  /* onLoad: function (options) {
    let oThis = this
      wx.getStorage({
        key: 'sessionuser',
        success: function (res) {
          oThis.setData({
            
            phone: res.data.phone
          })
        },
        fail: function (res) {
        if(!oThis.data.login){
          wx.removeStorage({
            key: 'sessionuser',
            success: function(res) {
              oThis.setData({username:'',phone:''})
            },
          })
        }
        }
      })
   
  }, */
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }

})