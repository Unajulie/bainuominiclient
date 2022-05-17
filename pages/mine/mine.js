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
  See_download: function (e) {
    var that = this
    wx.getStorage({
      key:'sessionuser',
      success:function (res) {
        wx.request({
          url: "https://bainuo.beijingepidial.com/client/guidance/permit",
          header: { 
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          data: {
            "tel":res.data.phone,
            "checkguidance":"1"
          },
          complete: function (res) {
            // console.info("返回的信息")
            console.info(res)
          if(res.data.status=="success"){
            wx.showLoading({
              title: '请耐心等待加载',
              duration:10000,
              mask: true
            })
            wx.downloadFile({//下载
              url: "https://bainuopdf.beijingepidial.com/guidance.pdf",//服务器上的pdf地址
              header: {},
              success: function (res) {
                var filePath = res.tempFilePath
                // console.info(filePath)
                wx.openDocument({//打开
                  filePath: filePath,
                  showMenu:true,
                  success: function (res) {
                    wx.hideLoading()
                  }
                })
              }
            })
          }else if(res.data.status=="fail"){
            wx.showToast({
              title: '体检报告完成后查看更具参考性',
              icon: 'none',
              duration: 2000
          })
          }
        }
        })
      },
      fail:function(res){
        wx.navigateTo({
          url: "../user/login"
        })
      }
    })   
  
  },
    // 问卷点击查询注册条码
    survey:function(e){
        wx.getStorage({
          key:'sessionuser',
          success:function (res) {
            wx.request({
              url: "https://bainuo.beijingepidial.com/client/surveypermit/search",
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "POST",
              data: {
                "tel":res.data.phone
              },
              complete: function (res) {
                console.info("返回的信息")
                console.info(res)
              if(res.data.status=="success"){
                wx.navigateTo({
                  url: "/pages/survey/guide_survey"
                })
              }else{
                wx.showToast({
                  title: '请先体验检测并绑定信息',
                  icon: 'none',
                  duration: 2000
              })
              }
            }
            })
          },
          fail:function(res){
            wx.navigateTo({
              url: "../user/login"
            })
          }
        })   
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