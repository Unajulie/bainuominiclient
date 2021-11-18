// pages/report_epiliver/userform.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
         sex: [{
            id: "0",
            value: '男',
            checked:false
          }, {
            id: "1",
            value: '女',
            checked:false
          }],
        checked:false
    },
    //绑定输入的姓名 
    bininput_name: function (e) {
        this.setData({
            username: e.detail.value
        })
        console.info(e.detail.value)
    },
    //绑定选择的性别 
    bininput_sex: function (e) {
        this.setData({
            sex: e.detail.value
        })
        console.info(e.detail.value)
    },
    //绑定输入的身份证 
    bininput_identity: function (e) {
        this.setData({
            identity: e.detail.value
        })
        console.info(e.detail.value)
    },
    //绑定输入的电话 
    bininput_mobile: function (e) {
        this.setData({
            phone: e.detail.value
        })
        console.info(e.detail.value)
    },
    //绑定输入的样本编码
    bininput_sampleid: function (e) {
        this.setData({
            identity: e.detail.value
        })
        console.info(e.detail.value)
    },
    //绑定输入的样本采集日期
    bininput_collectiondate: function (e) {
        this.setData({
            collectiondate: e.detail.value
        })
        console.info(e.detail.value)
    },
    //协议点击按钮
    checkedTap:function(){
       this.setData({
         checked:!this.data.checked  
       })
    },
    btnckreport: function (e) {
        if(!this.data.username){
            wx.showToast({
                title: '姓名必填',
                icon: 'error',
                duration: 2000
            })
        }
        else if (!(/^1[3456789]\d{9}$/.test(this.data.phone))) {
            wx.showToast({
                title: '手机号格式错误',
                icon: 'error',
                duration: 2000
            })
        } else if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.data.identity))){
            wx.showToast({
                title: '身份证格式错误',
                icon: 'error',
                duration: 2000
            })
        }else if (! this.data.checked){
            wx.showToast({
              title: '请勾选用户协议',
              icon: 'none',
              duration: 2000
            })
          }
        else{
        let oThis = this
        let formdata = {}
        formdata.idCard = this.data.identity
        formdata.sex = 0
        formdata.tel = this.data.phone
        formdata.sampleid = this.data.sampleid
        formdata.username = this.data.username
        formdata.created = this.data.collectiondate
        console.info(formdata)
        wx.getStorage({
            key: 'sessionuser',
            success: function (sessionuser) {
                wx.request({
                    url: "https://bainuo.beijingepidial.com/client/liver/saveuser",
                    header: {"Content-Type": "application/x-www-form-urlencoded"},
                    method: "POST",
                    data: formdata,
                    // data: {"sampleid": 1121032800079},
                    complete: function (res) {
                        let url = '../report_epiliver/report_liverstatus?sampleid=' + oThis.data.sampleid + "&phone=" + sessionuser.data.phone+"&username"+oThis.data.username
                        console.info(url)
                        wx.navigateTo({
                            url: url
                        })
                    }
                })
            },
            fail: function (res) {
                //wx.showModal({title: '提示',content:"用户登录状态失效，请重新登录"})
                wx.navigateTo({
                  url: '../user/login',
                })
            }
        })
    }
},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let sampleid = options.sampleid
        console.info("--->:"+sampleid)
        let oThis = this
        wx.getStorage({
            key: 'sessionuser',
            success: function (res) {
                oThis.setData({
                    phone: res.data.phone,
                    sampleid: sampleid
                })
                let data = {}
                data.sampleid = sampleid
                data.tel = res.data.phone
                console.info("xxx")
                wx.request({
                    url: "https://bainuo.beijingepidial.com/client/liver/finduser",
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "POST",
                    data: data,
                    // data: {"sampleid": 1121032800079},
                    complete: function (res) {
                          // 获得数据库传过来的sex:"0"的值并改变setData里面的sex
                          const sex = oThis.data.sex
                          for (let i = 0, len = sex.length; i < len; ++i) {
                              if(res.data.sex==sex[i].id){
                                  sex[i].checked=true
                                  oThis.setData({sexid:sex[i].id})
                                 }
                          }
                        oThis.setData({
                            identity: res.data.idCard,
                            username: res.data.username,
                            collectiondate: res.data.created.toString(),
                            sex:sex
                        })
                        console.info(res.data)  
                    },
                    fail: function (res) {
                        wx.showModal({title: '提示',content:"用户登录状态失效，请重新登录"})
                    }
                })
            }
        })
    },
})