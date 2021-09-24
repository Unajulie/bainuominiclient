// pages/liver/register.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        msg: "发送验证码",
        disabled: false,
        color: "linear-gradient(#64a3ff,#307ffd)",
        phone: '',
        post:true,
        inputpwd:'',
        truePwd: false,
        enablereg:false,
        regcolor:"linear-gradient(#64a3ff,#307ffd)",
        useName:'',
        vdcodein:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    //获取手机栏input中的值
    phoneInput: function (e) {
        console.info(e.detail.value)
        this.setData({

            phone: e.detail.value

        })

    },
    userIn:function (e) {
        console.info(e.detail.value)
        this.setData({

            useName: e.detail.value

        })

    },

    //17329920456
    //15767088850

    btnclic: function () {
        //验证手机号码
        if (!(/^1[3456789]\d{9}$/.test(this.data.phone))) {
            wx.showToast({
                title: '手机号格式错误',
                icon: 'error',
                duration: 2000
            })
        } else {
            let times = 60;
            let oThis = this;
            this.setData({ color: "#cecece", disabled: true })
            ///admin/epiage/sms
            let time = setInterval(function () {
                times--
                oThis.setData({
                    msg: "请等待" + times + "秒"
                })
                if (times == 0) {
                    oThis.setData({color: "linear-gradient(#64a3ff,#307ffd)",  disabled: false,  msg: "发送验证码",post:true,regcolor:"linear-gradient(#64a3ff,#307ffd)",enablereg:false})
                    clearInterval(time)
                }
                if(oThis.data.post){
                oThis.setData({post:false})
                //通过barcode查询宫颈癌报告,1先获取输入的值，返回给后台数据库去查询是否存在这个barcode,如果有数据有返回，没有数据就提示错误信息或输入正确的barcode.
                wx.request({
                    url: "https://bainuo.beijingepidial.com/client/user/resetpwd",
                    header: {"Content-Type": "application/x-www-form-urlencoded"},
                    method: "POST",
                    data: {"phone": oThis.data.phone},
                    // data: {"barcode": 1121032800079},
                    complete: function (res) {
                      console.info(res.data)
                        oThis.setData({vdcode:res.data.code})    
                    },
                    fail:function(e){
                        wx.showToast({
                            title: '接收验证码失败',
                            icon: 'error',
                            duration: 2000
                        })
                    }
                })
            }
            }, 1000)

        }    

    },
    vdcodeIn:function(e){
        this.setData({vdcodein: e.detail.value})
        console.info(this.data.vdcodein)
    },
    cmpwdIn:function(e){
        this.setData({cmpwd: e.detail.value})
        console.info(this.data.cmpwd)
    },
    btnreg:function(e){
        console.info(this.data.vdcodeIn)
        if(!this.data.phone){
            wx.showToast({
                title: '手机号必填',
                icon: 'error',
                duration: 2000
            }) 
        }
        // else if(!this.data.vdcodein){
        //     wx.showToast({
        //         title: '验证码必填',
        //         icon: 'error',
        //         duration: 2000
        //     })  
        // }
        else if(!this.data.inputpwd){
            wx.showToast({
                title: '请输入密码',
                icon: 'error',
                duration: 2000
            })
        }else if(!this.data.cmpwd){
            wx.showToast({
                title: '请输入确认密码',
                icon: 'error',
                duration: 2000
            })
        }else if(this.data.cmpwd!=this.data.inputpwd){
            wx.showToast({
                title: '密码不一致',
                icon: 'error',
                duration: 2000
            })
        }
        // else if(this.data.vdcodein!=this.data.vdcode){
        //     wx.showToast({
        //         title: '验证码输入有误',
        //         icon: 'error',
        //         duration: 2000
        //     })
        // }
        else{
            let data={}
            data.phone=this.data.phone
            data.password=this.data.inputpwd
            console.info(data)
            this.setData({enablereg:true,regcolor:"grey"})
            wx.request({
                url: "https://bainuo.beijingepidial.com/client/user/resetpwd",
                header: {"Content-Type": "application/x-www-form-urlencoded"},
                method: "POST",
                data: data,
                // data: {"barcode": 1121032800079},
                complete: function (res) {
                     console.info(res.data)
                     if(res.data.status=="success"){
                         wx.navigateTo({
                           url: '../user/login',
                         })
                     }
                }
            })
        }
    },
    vdpwd:function(e){
        console.info(this.data.inputpwd)
        if (!/[0-9a-zA-Z]{6,12}/.test(this.data.inputpwd)) {
             // console.log("cwoca")
             wx.showModal({
                title: '提示',
                content: '密码由6~12位由数字或英文字母混合而成',
                showCancel: false
            })
         }
    },
    passwordInput: function (e) {
        console.info(e.detail.value)
        this.setData({inputpwd: e.detail.value}) 
       
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