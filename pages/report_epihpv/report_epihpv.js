Page({
  /**
   * 页面的初始数据
   */
  data: {
    sampleid: "",
    reportUrl: null,
    reportShow: false,
    hideFlag: true,
    animationData: {},
  },
// 下滑入框
// 点击选项
// getOption:function(e){
//   var that = this;
//   that.setData({
//    value:e.currentTarget.dataset.value,
//    hideFlag: true
//   })
//   },
  //取消
  mCancel: function () {
  var that = this;
  that.hideModal();
  },
// 显示遮罩层
showModal: function () {
  var that = this;
  that.setData({
   hideFlag: false
  })
  // 创建动画实例
  var animation = wx.createAnimation({
   duration: 400,//动画的持续时间
   timingFunction: 'ease',//动画的效果 默认值是linear->匀速，ease->动画以低速开始，然后加快，在结束前变慢
  })
  this.animation = animation; //将animation变量赋值给当前动画
  var time1 = setTimeout(function () {
   that.slideIn();//调用动画--滑入
   clearTimeout(time1);
   time1 = null;
  }, 100)
  },
   
  // 隐藏遮罩层
  hideModal: function () {
  var that = this;
  var animation = wx.createAnimation({
   duration: 400,//动画的持续时间 默认400ms
   timingFunction: 'ease',//动画的效果 默认值是linear
  })
  this.animation = animation
  that.slideDown();//调用动画--滑出
  var time1 = setTimeout(function () {
   that.setData({
   hideFlag: true
   })
   clearTimeout(time1);
   time1 = null;
  }, 220)//先执行下滑动画，再隐藏模块
   
  },
  //动画 -- 滑入
  slideIn: function () {
  this.animation.translateY(0).step() // 在y轴偏移，然后用step()完成一个动画
  this.setData({
   //动画实例的export方法导出动画数据传递给组件的animation属性
   animationData: this.animation.export()
  })
  },
  //动画 -- 滑出
  slideDown: function () {
  this.animation.translateY(300).step()
  this.setData({
   animationData: this.animation.export(),
  })
  },

  scanCode: function () {
    var that = this;
    // 只允许从相机扫码
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res.result)
        that.setData({
          sampleid: res.result
        });
      }
    })
  },

  //获取到hpv报告页面输入的值，查询mongodb数据库，并返回状态
  inputVal: function (e) {
    let sampleid = e.detail.value
    this.setData({
      sampleid: sampleid
    })
  },
  //  
  checkHpvReport: function (e) {
    //console.info("https://bainuo.beijingepidial.com/public/pdffile/"+this.data.sampleid+".pdf")
    //wx.showToast({title: '加载中', icon: 'loading', duration: 10000});
    let oThis = this
    wx.getStorage({
      key: 'sessionuser',
      success: function (res) {
        console.log(res.data)
        let data = {}
        data.phone = e.currentTarget.dataset.phone ? e.currentTarget.dataset.phone : res.data.phone
        data.sampleid = e.currentTarget.dataset.sampleid ? e.currentTarget.dataset.sampleid : oThis.data.sampleid
        wx.request({
          url: "https://bainuo.beijingepidial.com/client/hpv/uploadbarcode",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          data: data,
          // data: {"sampleid": 1121032800079},
          complete: function (res) {
            console.info(res.data)
            //如果是空字符串
            if (res.data.status == "fail") {
              wx.showModal({
                title: '提示',
                content: "库存查无此条码，请联系客服"
              })
            } else {
              wx.hideLoading()
              wx.navigateTo({
                url: 'userform?sampleid=' + data.sampleid
              })
            }
          },
          fail: function (res) {
            console.info(res)
          }
        })
      },
      fail: function (e) {
        wx.navigateTo({
          url: '../user/login',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let oThis = this
    wx.getStorage({
      key: 'sessionuser',
      success: function (res) {
        console.log('s:' + res.data)
        wx.request({
          url: "https://bainuo.beijingepidial.com/client/hpv/barcodes",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          data: {
            "tel": res.data.phone
          },
          // data: {"sampleid": 1121032800079},
          complete: function (res) {
            console.info(res.data)
            oThis.setData({
              barcodebox: res.data
            })
          }
        })
      },
      fail: function (res) {
        wx.navigateTo({
          url: '../epiage/login',
        })
      }
    })
    // wx.showLoading({
    //   title: '报告加载中',
    // })
  },
})