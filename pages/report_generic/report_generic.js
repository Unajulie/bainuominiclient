// pages/report_epihpv/report_epihpv.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
      sampleid: "",
      reportUrl: null,
      reportShow: false,
      optionList:['所有','选项1','选项2'],
   value:'所有',
   hideFlag: true,
   animationData: {},
    },
  // 下滑入框
  // 点击选项
  getOption:function(e){
    var that = this;
    that.setData({
     value:e.currentTarget.dataset.value,
     hideFlag: true
    })
    },
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
          console.log(res)
          that.setData({
            sampleid: res.result
          });
        }
      })
    },
  
    //获取到hpv报告页面输入的值，查询mysql数据库，并返回状态
    inputVal: function (e) {
      let sampleid = e.detail.value
      console.info(sampleid)
      this.setData({
        sampleid: sampleid
      })
  
    },
  
    checkgenericReport: function (e) {
      wx.showLoading({
        title: '加载中',
        duration: 10000,
        mask: true
      })
      console.info("simpleid:" + e.currentTarget.dataset.sampleid)
      let sampleid = e.currentTarget.dataset.sampleid ? e.currentTarget.dataset.sampleid : this.data.sampleid
      var that = this
      wx.getStorage({
        key: 'sessionuser',
        success: function (res) {
          console.log('click history:' + res.data.phone)
          let phone = e.currentTarget.dataset.phone ? e.currentTarget.dataset.phone : res.data.phone
          wx.request({
            url: "https://bainuo.beijingepidial.com/client/generic/uploadbarcode",
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
              "sampleid": sampleid,
              "tel": phone
            },
            // data: {"sampleid": 1121032800079},
            complete: function (res) {
              console.info("xxxxx-->" + res.data.sampleid)
              wx.hideLoading()
              //如果是空字符串
              if (res.data == "") {
                wx.showModal({
                  title: '提示',
                  content: "库存查无该条码，请联系客服"
                })
              } else {
                let url = "../report_generic/userform?status=" + res.data.status + "&sampleid=" + sampleid + "&phone=" + phone
                wx.navigateTo({
                  url: url
                })
              }
            },
            fail: function (res) {
  
            }
          })
        },fail:function(){
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
          console.log('s:' + res.data.phone)
          wx.request({
            url: "https://bainuo.beijingepidial.com/client/liver/barcodes",
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
              "tel": res.data.phone
            },
            // data: {"sampleid": 1121032800079},
            complete: function (res) {
              console.info("hello")
              console.info(res.data)
              oThis.setData({
                barcodebox: res.data
              })
            }
          })
        },
        fail: function (res) {
          wx.navigateTo({
            url: '../user/login',
          })
        }
      })
    }
  })