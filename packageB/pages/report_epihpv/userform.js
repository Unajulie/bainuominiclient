Page({

    /**
     * 页面的初始数据
     */
    data: {
        sex: [{
            id: "0",
            value: '男'
        }, {
            id: "1",
            value: '女',
        }],
        checked: false,
        endate: new Date().toLocaleDateString().replace(new RegExp('/', 'g'), '-')
    },
    //绑定选择的性别
    radioChange: function (e) {
        // console.log('radio发生change事件，携带value值为：', e.detail.value)
        const sex = this.data.sex
        for (let i = 0, len = sex.length; i < len; ++i) {
            sex[i].checked = sex[i].id == e.detail.value
            if (sex[i].checked == true) {
                this.setData({
                    sexid: sex[i].id
                })
            }
        }
        console.log(this.data.sexid);
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
    // //绑定输入的样本编码
    // bininput_sampleid: function (e) {
    //     this.setData({
    //         identity: e.detail.value
    //     })
    // },
    //绑定输入的样本采集日期
    // bininput_collectiondate: function (e) {
    //     this.setData({
    //         collectiondate: e.detail.value
    //     })
    //     console.info(e.detail.value)
    // },
    //协议点击按钮
    checkedTap: function () {
        this.setData({
            checked: !this.data.checked
        })
    },
    //点击查看报告
    btnckreport: function (e) {
        if (!this.data.username) {
            wx.showToast({
                title: '姓名必填',
                // 用户编辑修改二维码信息
                checkqrinfo: function (e) {
                    let oThis = this
                    console.info(oThis.data.qrid)
                    wx.request({
                        url: "https://bainuo.beijingepidial.com/client/hpv/checkqrinfo",
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        method: "POST",
                        data: {
                            "qrid": oThis.data.qrid,
                            "username": oThis.data.username
                        },
                        complete: function (res) {
                            console.info("------")
                            console.info(res)
                            oThis.setData({
                                qrid: res.data.id,
                                username: res.data.username,
                                sex: res.data.sex,
                                colldate: res.data.colldate
                            })
                            wx.navigateTo({
                                url: "../report_epihpv/userform?qrid" + res.data.id + "&username=" + res.data.username
                            })
                        }
                    })
                },
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
        } else if (!this.data.checked) {
            wx.showToast({
                title: '请勾选用户协议',
                icon: 'none',
                duration: 2000
            })
        } else {
            let oThis = this
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
            formdata.phone = oThis.data.phone
            formdata.username = oThis.data.username
            // formdata.colldate = oThis.data.collectiondate
            formdata.qrid=oThis.data.qrid
            wx.getStorage({
                key: 'sessionuser',
                success: function (sessionuser) {
                    wx.request({
                        url: "https://bainuo.beijingepidial.com/client/user/hpv/saveuser",
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        method: "POST",
                        data: formdata,
                        complete: function (res) {
                            console.info(res)
                            if (res.data.status == "success") {
                                wx.showToast({
                                    title: '提交成功',
                                    icon: 'success',
                                    duration: 2000
                                },
                                wx.navigateTo({
                                    url:  '../report_epihpv/applyqr?qrid=' + res.data.id + "&username=" + oThis.data.username
                                })
                                )
                            } else {
                                oThis.setData({
                                    qrid: res.data.id
                                })
                                let url = '../report_epihpv/applyqr?qrid=' + res.data.id + "&username=" + oThis.data.username
                                console.info(url)
                                wx.navigateTo({
                                    url: url
                                })
                            }
                        }
                    })
                },

            })
        }
    },
    onLoad: function (options) {
        let oThis = this
        console.info(options)
        if (options.qrid) {
            const sex = oThis.data.sex
            for (let i = 0, len = sex.length; i < len; ++i) {
                if (options.sex == sex[i].id) {
                    sex[i].checked = true
                    oThis.setData({
                        sexid: sex[i].id
                    })
                }
            }
            console.info(sex)
            oThis.setData({
                qrid: options.qrid,
                username: options.username,
                sex: sex,
                phone: options.phone,
                identity: options.idCard,
                // collectiondate: options.colldate,
            })
        } else {
            wx.getStorage({
                key: 'sessionuser',
                success: function (res) {
                    oThis.setData({
                        phone: res.data.phone,
                    })
                    let data = {}
                    data.phone = res.data.phone
                    wx.request({
                        url: "https://bainuo.beijingepidial.com/client/hpv/finduser",
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
                                // collectiondate: String(res.data.colldate) != "undefined" ? String(res.data.colldate) : "",
                                sex: sex,
                            })
                        },
                    })

                }
            })
        }
    },
})