//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({ //先调用 wx.login() 获取 临时登录凭证code 
        success: res => {
          const code = res.code //获取到用户临时登录凭证code  
          console.info("code:" + code)
          wx.request({ //发送请求
            url: "https://bainuo.beijingepidial.com/bainuo/mini/login?code=" + code, //携带code
            success: (res) => { //返回node请求到的OpenID与session_key
              const openid = res.data.openid
              console.info("openid:" + openid)
              wx.setStorageSync("openid", openid)
            }
          })
        },
        fail: console.log
      })
    //外部字体
 /*    wx.loadFontFace({
      family: 'en',
      source: 'url("https://bainuo.beijingepidial.com/public/fonts/SourceHanSansCN-Bold-Alphabetic.ttf")',
      success: res => {
        console.log('font load success', res)
      },
      fail: err => {
        console.log('font load fail', err)
      }
    }) */
   
    
  },
  onShow:function(){
  
  }
  ,
  globalData: {
    userInfo: null
  },
  


})