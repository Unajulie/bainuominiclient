//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
imgpath:{
  scroll1:"https://bainuo.beijingepidial.com/public/img/scroll1.jpg",
  

},
 clicktimes:0
  
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
          // console.info(res)
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
          
     
        }else{
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

}
})
