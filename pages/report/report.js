// pages/report/report.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 泛癌点击注册查询条码
  genericlogin:function(e){
    wx.getStorage({
      key:'sessionuser',
      success:function (res) {
        console.log('s:' + res.data)
        wx.navigateTo({
          url: "../report_generic/applylist"
        })
      },
      fail:function(res){
        wx.navigateTo({
          url: "../user/login"
        })
      }
    })
  },
  // 肝癌点击查询注册条码
  liverlogin:function(e){
    wx.getStorage({
      key:'sessionuser',
      success:function (res) {
        console.log('s:' + res.data)
        wx.navigateTo({
          url: "../report_epiliver/applylist"
        })
      },
      fail:function(res){
        wx.navigateTo({
          url: "../user/login"
        })
      }
    })
  },
     // 宫颈癌点击查询注册条码
     hpvlogin:function(e){
      wx.getStorage({
        key:'sessionuser',
        success:function (res) {
          console.log('s:' + res.data)
          wx.navigateTo({
            url: "../report_epihpv/applylist"
          })
        },
        fail:function(res){
          wx.navigateTo({
            url: "../user/login"
          })
        }
      })   
    },
  // 生物学年龄点击查询注册条码
  epilogin:function(e){
    wx.getStorage({
      key:'sessionuser',
      success:function (res) {
        console.log('s:' + res.data)
        wx.navigateTo({
          url: "../report_epiage/report_epiage"
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
                url: "/pages/ques/generic_ques"
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})