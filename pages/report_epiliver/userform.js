// pages/report_epiliver/userform.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sex: [{
            id: "0",
            value: '男',
            checked: false
        }, {
            id: "1",
            value: '女',
            checked: false
        }],
        checked: false,
        collectiondate: "",
        endate: new Date().toLocaleDateString().replace(new RegExp('/','g'),'-')
    },

    //绑定选择的性别
    radioChange: function (e) {
        // console.log('radio发生change事件，携带value值为：', e.detail.value)
        const sex = this.data.sex
        for (let i = 0, len = sex.length; i < len; ++i) {
            sex[i].checked = sex[i].id == e.detail.value
            if (sex[i].checked == true) {
                this.setData({
                    sexid: sex[i].id, 
                })
            }
        }
    },
    //绑定输入的姓名 
    bininput_name: function (e) {
        this.setData({
            username: e.detail.value
        })
    },
    //绑定输入的身份证 
    bininput_identity: function (e) {
        if(/^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/.test(e.detail.value)){
            this.setData({identity:e.detail.value})
        }
    },
    //绑定输入的电话 
    bininput_mobile: function (e) {
        if(/^1[3456789]\d{9}$/.test(e.detail.value)){
            this.setData({phone: e.detail.value})
        }
    },
    //绑定输入的样本编码
    bininput_sampleid: function (e) {
        this.setData({
            sampleid: e.detail.value
        })
    },
    //绑定输入的样本采集日期
    bininput_collectiondate: function (e) {
        if(e.detail.value){
        this.setData({
            collectiondate: e.detail.value ? e.detail.value : new Date().toLocaleString(),
           
        })
    }
    },
    //协议点击按钮
    checkedTap: function () {
        this.setData({
            checked: !this.data.checked
        })
    },
    btnckreport: function (e) {
        if (!this.data.username) {
            wx.showToast({
                title: '姓名必填',
                icon: 'error',
                duration: 2000
            })
        } else if (!(/^1[3456789]\d{9}$/.test(this.data.phone))) {
            wx.showToast({
                title: '手机号格式错误',
                icon: 'error',
                duration: 2000
            })
        } else if (!this.data.sexid) {
            wx.showToast({
                title: '请选择性别',
                icon: 'error',
                duration: 2000
            })
        } else if (this.data.identity == "" ? false : (!(/^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/.test(this.data.identity)))) {
            wx.showToast({
                title: '身份证格式错误',
                icon: 'error',
                duration: 2000
            })
        }else if (!this.data.collectiondate) {
            wx.showToast({
                title: '请选择采样时间',
                icon: 'none',
                duration: 2000
            })
        }  else if (!this.data.checked) {
            wx.showToast({
                title: '请勾选用户协议',
                icon: 'none',
                duration: 2000
            })
        } else {
            let oThis = this
            wx.showModal({
                title: '信息确认',
                content: '请再次确认填写信息是否正确，如有信息不符请联系客服！',
                cancelText: "再看看",
                success: function (res) {
                    if (res.confirm) {
                        let formdata = {}
                        formdata.idCard = oThis.data.identity ? oThis.data.identity : ""
                        if (oThis.data.identity) {
                            formdata.idstart = oThis.data.identity.length == 18 ? 16 : 14;
                            formdata.sex = oThis.data.identity.substr(formdata.idstart, 1) % 2
                            formdata.age = new Date().getFullYear() - parseInt(oThis.data.identity.substr(6, 4))
                        } else {
                            formdata.sex = -1
                        }
                        formdata.sex = oThis.data.sexid
                        formdata.tel = oThis.data.phone
                        formdata.sampleid = oThis.data.sampleid
                        formdata.username = oThis.data.username
                        formdata.created = oThis.data.collectiondate
                        
                        wx.getStorage({
                            key: 'sessionuser',
                            success: function (sessionuser) {
                                wx.request({
                                    url: "https://bainuo.beijingepidial.com/client/liver/saveuser",
                                    header: {
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    },
                                    method: "POST",
                                    data: formdata,
                                    // data: {"sampleid": 1121032800079},
                                    complete: function (res) {
                                        //用户点击确定后没值的输入值后就不可编辑
                                        //一定要写成this.data.isDisabled，不然判断出不来
                                        oThis.setData({
                                            colldateDisable:true,
                                            phoneDisable:true,
                                            usernameDisable:true,
                                            identityDisable:true,
                                            sexDisable:true
                                        })
                                       
                                        
                                        let url = '../report_epiliver/report_liverstatus?sampleid=' + oThis.data.sampleid + "&phone=" + sessionuser.data.phone + "&username" + oThis.data.username
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
                    } else {
                        console.log('用户点击再看看')
                    }
                }
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let sampleid = options.sampleid
        let oThis = this
        wx.getStorage({
            key: 'sessionuser',
            success: function (res) {
                oThis.setData({
                    phone: res.data.phone,
                    phoneDisable:res.data.phone ? true :false ,
                    sampleid: sampleid,
                })
                let data = {}
                data.sampleid = sampleid
                data.tel = res.data.phone
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
                            if (res.data.sex == sex[i].id) {
                                sex[i].checked = true
                                oThis.setData({
                                    sexid: sex[i].id
                                })
                            }
                        }
                        oThis.setData({
                            identity: res.data.idCard ? res.data.idCard : "",
                            username: res.data.username,
                            collectiondate: String(res.data.created) != "undefined" ? String(res.data.created) : "",
                            sex: sex,
                            identityDisable:res.data.idCard ? true :false ,
                            usernameDisable:res.data.username?true:false,
                            sexDisable:res.data.sex?true:false,
                            colldateDisable:res.data.created?true:false,
                        })
                    },
                    fail: function (res) {
                        wx.showModal({
                            title: '提示',
                            content: "用户登录状态失效，请重新登录"
                        })
                    }
                })

            }
        })

    },
})