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
    phone:'',
    mark:''
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
      console.info(session)
      oThis.setData({
        login:true,
        username:session.data.username,
        phone:session.data.phone,
        mark:session.data.mark
      })
      console.info(oThis.data.mark)
    },
    fail:function(){
      oThis.setData({
        login:false,
        phone:'',
        mark:''
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
          console.info(res)
          oThis.setData({login:false,phone:'',mark:''})
          wx.switchTab({
            url: '../report/report',
          })
        },
      })
    }else{
      wx.navigateTo({
        url: '../user/register',
      })
    }
   
  },
  
onLoad: function (options) {
    let oThis = this
      wx.showModal({
        title: '温馨提示',
        content: '已检测客户若无法查看检测报告，请退出登陆后再次登入，感谢您的理解！',
        success:function(res){
            if(res.confirm){
               console.info('弹框后点确认')
            }else{
               console.log('弹框后点取消')
            }
        }
     })
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