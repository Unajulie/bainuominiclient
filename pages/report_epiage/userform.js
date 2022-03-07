// pages/report_epiliver/userform.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        checked: false,
        collectiondate: "",
        endate: new Date().toLocaleDateString().replace(new RegExp('/','g'),'-')
    },

    //绑定输入的姓名 
    bininput_name: function (e) {
        this.setData({
            username: e.detail.value
        })
    },
    //绑定选择的性别 
    bininput_sex: function (e) {
        this.setData({
            sex: e.detail.value
        })
    },
    //绑定输入的身份证 
    bininput_identity: function (e) {
        this.setData({
            identity: e.detail.value
        })
    },
    //绑定输入的电话 
    bininput_mobile: function (e) {
        this.setData({
            phone: e.detail.value
        })
    },
    //绑定输入的样本编码
    bininput_sampleid: function (e) {
        this.setData({
            sampleid: e.detail.value ? e.detail.value == undefined : ""
        })
    },
    //绑定输入的样本采集日期
    bininput_collectiondate: function (e) {
        this.setData({
            collectiondate: e.detail.value
        })
        console.info(e.detail.value)
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
        } else if (this.data.identity == "" ? false : (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.data.identity)))) {
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
        } else if (!this.data.checked) {
            wx.showToast({
                title: '请勾选用户协议',
                icon: 'none',
                duration: 2000
            })
        } else {
            let oThis = this
            wx.showModal({
                title: '信息确认',
                content: '请再次确认填写信息是否正确,如有信息不符请联系客服！',
                cancelText: "再看看",
                success: function (res) {
                    if (res.confirm) {
                        let formdata = {}
                        formdata.idCard = oThis.data.identity
                        if (oThis.data.identity) {
                            formdata.idstart = oThis.data.identity.length == 18 ? 16 : 14;
                            formdata.sex = oThis.data.identity.substr(formdata.idstart, 1) % 2
                            formdata.age = new Date().getFullYear() - parseInt(oThis.data.identity.substr(6, 4))
                            console.info(formdata.sex)
                        } else {
                            formdata.sex = -1
                        }
                        formdata.tel = oThis.data.phone
                        formdata.sampleid = oThis.data.sampleid
                        formdata.username = oThis.data.username
                        formdata.created = oThis.data.collectiondate
                        formdata.checktime = new Date().toLocaleDateString()
                        console.info(formdata)
                        wx.showLoading({
                            title: '加载中',
                            duration: 10000,
                            mask: true
                        })
                        wx.getStorage({
                            key: 'sessionuser',
                            success: function (sessionuser) {
                                wx.request({
                                    url: "https://bainuo.beijingepidial.com/client/epiage/saveuser",
                                    header: {
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    },
                                    method: "POST",
                                    data: formdata,
                                    // data: {"sampleid": 1121032800079},
                                    complete: function (res) {
                                        console.info(res.data)
                                        wx.hideLoading({
                                            success: (res) => {},
                                        })
                                        //    let url = "../report_epiage/report_epistatus?status=" + res.data.status + "&barcode=" + formdata.sampleid + "&phone=" + formdata.phone
                                        let url = '../report_epiage/report_epistatus?sampleid=' + formdata.sampleid
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
                    phoneDisable: res.data.phone ? true : false,
                    sampleid: sampleid
                })
                let data = {}
                data.sampleid = sampleid
                data.tel = res.data.phone
                wx.request({
                    url: "https://bainuo.beijingepidial.com/client/epiage/finduser",
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "POST",
                    data: data,
                    // data: {"sampleid": 1121032800079},
                    complete: function (res) {
                        oThis.setData({
                            identity: res.data.idCard ? res.data.idCard : "",
                            username: res.data.username,
                            collectiondate: String(res.data.created) != "undefined" ? String(res.data.created) : "",
                            identityDisable: res.data.idCard ? true : false,
                            usernameDisable: res.data.username ? true : false,
                            colldateDisable: res.data.created ? true : false,
                        })
                        console.info(res.data)
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