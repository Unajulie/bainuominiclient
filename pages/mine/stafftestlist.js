// pages/report/report.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
  
    },
    // 工作人员泛癌点击录入泛癌信息
    genericlogin:function(e){
      wx.getStorage({
        key:'sessionuser',
        success:function (res) {
          console.log('s:' + res.data)
          wx.navigateTo({
            url: "../../packageA/pages/report_generic/mergelist"
          })
        },
      })
    },
    // 肝癌点击查询注册条码
    liverlogin:function(e){
      wx.getStorage({
        key:'sessionuser',
        success:function (res) {
          console.log('s:' + res.data)
          wx.navigateTo({
            url: "../../packageA/pages/report_epiliver/mergelist"
          })
        },
      })
    },
    // 生物学年龄点击查询注册条码
    epilogin:function(e){
      wx.getStorage({
        key:'sessionuser',
        success:function (res) {
          console.log('s:' + res.data)
          wx.navigateTo({
            url: "../../packageB/pages/report_epiage/report_epiage"
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
            url: "../../packageB/pages/report_epihpv/mergelist"
          })
        },
      })   
    },
      // 问卷点击查询注册条码
      survey:function(e){
        wx.getStorage({
          key:'sessionuser',
          success:function (res) {
            console.log('s:' + res.data)
            wx.navigateTo({
              url: "/pages/ques/generic_ques"
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