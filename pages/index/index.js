//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
imgpath:{
  scroll1:"https://bainuo.beijingepidial.com/public/img/scroll1.jpg",

}

  
  },
  
 
See_download: function (e) {
  wx.showLoading({
    title: '加载中',
    duration:10000,
    mask: true
  })
  wx.downloadFile({//下载
    url: "https://bainuo.beijingepidial.com/public/excel/guidance.pdf",//服务器上的pdf地址
    header: {},
    success: function (res) {
      var filePath = res.tempFilePath
      console.info(filePath)
      wx.openDocument({//打开
        filePath: filePath,
        showMenu:true,
        success: function (res) {
          wx.hideLoading()
        }
      })
    }
  })
}
})
