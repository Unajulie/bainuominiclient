Page({

    /**
     * 页面的初始数据
     */
    // 下拉框
    data: {
        spotarray: [],
        salesarray: [],
        payarray: [],
        sexarray: ["男", "女"],
        ellipsis: true,
        clickid: -1
    },
      /**
     * 收起/展开按钮点击事件
     */
    ellipsis: function () {
        var value = !this.data.ellipsis;
        this.setData({
            ellipsis: value
        })
    },
    // 拍客户信息照
    takePhoto() {
        wx.navigateTo({
            url: '/pages/photo/photo', //跳转到自定义的一个拍照页面
        })
    },
    //输入获取泛癌样本二维码
    inputVal: function (e) {
        let sampleid = e.detail.value
        this.setData({
            sampleid: sampleid
        })
    },
    //相机扫扫描获取样本二维码
    scanSampCode: function (e) {
        var that = this;
        // 只允许从相机扫码
        if(e.currentTarget.dataset.disable==false){
        wx.scanCode({
            onlyFromCamera: true,
            success(res) {
                console.log(res)
                that.setData({
                    sampleid: res.result
                });
            }
        })
    }else{
        console.info("当前不能扫描")
    }
    },
    //相机扫扫描获取客户信息二维码
    scanUserCode: function (e) {
        var oThis = this;
        // 只允许从相机扫码
        if(e.currentTarget.dataset.disable==false){
        wx.scanCode({
            onlyFromCamera: true,
            success(res) {
                console.log(res)
                let data = {}
                data.qrid = res.result
                wx.request({
                    url: "https://bainuo.beijingepidial.com/client/hpv/checkqrinfo",
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "POST",
                    data: data,
                    // data: {"sampleid": 1121032800079},
                    complete: function (res) {
                        oThis.setData({
                            username: res.data.username,
                            sexval: res.data.sex,
                            identity: res.data.idCard,
                            phone: res.data.phone,
                            age:res.data.age
                        })
                    }
                })
            }
        })
    }else{
        console.info("当前不能扫描")
    }
    },
    //绑定输入的样本采集日期
    bitselect_colldate: function (e) {
        if (e.detail.value) {
            this.setData({
                colldate: e.detail.value ? e.detail.value : new Date().toLocaleString(),
            })
        }
    },
    //绑定选择的结算类型
    bitselect_paymethod: function (e) {
        console.info(e)
        console.info(this.data.payarray[e.detail.value])
        if (e.detail.value) {
            this.setData({
                paymethod: e.detail.value
            })
        }
    },
    //绑定选择的采样地点
    bitselect_collspot: function (e) {
        if (e.detail.value) {
            this.setData({
                spotval: e.detail.value
            })
        }
    },
    //绑定选择的销售
    bitselect_sale: function (e) {
        if (e.detail.value) {
            this.setData({
                saleval: e.detail.value
            })
        }
    },
    //绑定输入的姓名 
    bininput_name: function (e) {
        this.setData({
            username: e.detail.value
        })
    },
    //绑定选择的性别 
    bitselect_sex: function (e) {
        this.setData({
            sexval: e.detail.value
        })
    },
    //获取年龄
    bitinput_age: function (e) {
        this.setData({
            age: e.detail.value
        })
    },
    //绑定输入的身份证 
    bininput_identity: function (e) {
        this.setData({
            identity: e.detail.value
        })
    },
    //绑定输入的手机号码
    bininput_phone: function (e) {
        this.setData({
            phone: e.detail.value
        })
    },
    // 获取备注信息
    bitinput_staffnote: function (e) {
        this.setData({
            staffnote: e.detail.value
        })
    },
    // 保存销售绑定的客户信息
    savebindedrep: function (e) {
        if (!this.data.sampleid) {
            wx.showToast({
                title: '请填入样本编号',
                icon: 'error',
                duration: 2000
            })
        } else if (!this.data.colldate) {
            wx.showToast({
                title: '请选择采样时间',
                icon: 'error',
                duration: 2000
            })
        }else if (!this.data.saleval) {
            wx.showToast({
                title: '请选择业务人员',
                icon: 'none',
                duration: 2000
            })
        }  else if (!this.data.spotval) {
            wx.showToast({
                title: '请选择采样地点',
                icon: 'error',
                duration: 2000
            })
        } else if (!this.data.username) {
            wx.showToast({
                title: '请选择姓名',
                icon: 'error',
                duration: 2000
            })
        } else if (!this.data.sexval) {
            wx.showToast({
                title: '请选择性别',
                icon: 'error',
                duration: 2000
            })
        } else if (!(/^1[3456789]\d{9}$/.test(this.data.phone))) {
            wx.showToast({
                title: '请输入手机号',
                icon: 'error',
                duration: 2000
            })
        } else if (this.data.identity == "" ? false : (!(/^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/.test(this.data.identity)))) {
            wx.showToast({
                title: '身份证格式错误',
                icon: 'error',
                duration: 2000
            })
        } else if (!this.data.colldate) {
            wx.showToast({
                title: '请选择采样时间',
                icon: 'none',
                duration: 2000
            })
        } else {
            let oThis = this
            wx.getStorage({
                key: 'sessionuser',
                success: function (res) {
                    let formdata = {}
                    formdata.sex = oThis.data.sexval
                    formdata.tel = oThis.data.phone
                    formdata.sampleid = oThis.data.sampleid
                    formdata.username = oThis.data.username
                    formdata.created = oThis.data.colldate
                    formdata.spotval = oThis.data.spotval
                    formdata.stafftel = res.data.phone
                    formdata.idCard = oThis.data.identity ? oThis.data.identity : ""
                    formdata.age = oThis.data.age ? oThis.data.age : ""
                    formdata.paymethod = oThis.data.paymethod ? oThis.data.paymethod : ""
                    formdata.saleval = oThis.data.saleval ? oThis.data.saleval : ""
                    formdata.staffnote = oThis.data.staffnote ? oThis.data.staffnote : ""
                    wx.request({
                        url: "https://bainuo.beijingepidial.com/client/hpv/staff/saveuserinfo",
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        method: "POST",
                        data: formdata,
                        complete: function (res) {
                            if (res.data.status == "success") {
                                wx.showToast({
                                    title: '保存成功',
                                    icon: 'success',
                                    duration: 2000
                                })
                                oThis.setData({
                                    sexval: "",
                                    age: "",
                                    phone: "",
                                    sampleid: "",
                                    username: "",
                                    colldate: "",
                                    paymethod: "",
                                    saleval: "",
                                    spotval: "",
                                    identity: "",
                                    staffnote: ""
                                })
                                oThis.onLoad()
                            }else if(res.data.status=="notexist"){
                                wx.showToast({
                                    title: '样本号已被使用或不存在',
                                    icon: 'error',
                                    duration: 2000
                                })
                            }
                        }
                    })
                },
                fail: function (res) {
                    console.info(res)
                }
            })
        }
    },
// 工作人员点击临时列表信息展示后可修改保存信息
changeMergedinfo: function (e) {
    let that = this
    this.setData({
        clickid: e.currentTarget.id,
        clickedtab: this.data.mergedlist[e.currentTarget.id]
    })
    let data = {}
    data.sampleid = e.currentTarget.dataset.sampleid
    data.username = e.currentTarget.dataset.username
    wx.request({
        url: "https://bainuo.beijingepidial.com/client/hpv/mergedinfo",
        header: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: data,
        complete: function (res) {
            that.setData({
                mergedinfolist: res.data,
                sampleid: res.data.sampleid,
                sexval: res.data.sex,
                age: res.data.age,
                phone: res.data.tel,
                username: res.data.username,
                colldate: res.data.created,
                paymethod: res.data.paymethod,
                saleval: res.data.saleval,
                spotval: res.data.sex,
                identity: res.data.idCard,
                staffnote: res.data.staffnote
            })
        }
    })
},
// 点击全部采样信息上传后给所有记录加上一个disable标记，返回来的值有了disable:1后就让所有带这个标记的不可编辑
uploadall: function (e) {
    let that = this
    let samplelist = []
    if(that.data.mergedlist==0){
        wx.showToast({
            title: '请绑定采样信息',
            icon: 'error',
            duration: 2000
        })
    }else{
    for (var i = 0; i < that.data.mergedlist.length; i++) {
        that.data.mergedlist[i].sampleid
        samplelist.push(that.data.mergedlist[i].sampleid)
    }
    wx.request({
        url: "https://bainuo.beijingepidial.com/client/hpv/markmergedinfo",
        header: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: samplelist,
        complete: function (res) {
            for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].sampleid && res.data[i].disable == 1) {
                    that.setData({
                        textdisable: 1
                    })
                }
            }
            wx.showToast({
                title: '批量上传成功',
                icon: 'error',
                duration: 2000
            })
            that.onLoad()
        }
    })
   
}
},

    onLoad: function (options) {
        // 判断进来该页面时有无带sampleid进来，有则是已有客户信息展示，无则是新增绑定
        let that = this
        if (options&&options.sampleid) {
            let that = this
            let data = {}
            data.sampleid = options.sampleid
            data.username = options.username
            data.disable = options.disable
            wx.request({
                url: "https://bainuo.beijingepidial.com/client/hpv/mergedinfo",
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "POST",
                data: data,
                complete: function (res) {
                    that.setData({
                        disable: res.data.disable,
                        mergedinfolist: res.data,
                        sampleid: res.data.sampleid,
                        sexval: res.data.sex,
                        age: res.data.age,
                        phone: res.data.tel,
                        username: res.data.username,
                        colldate: res.data.created,
                        paymethod: res.data.paymethod,
                        saleval: res.data.saleval,
                        spotval: res.data.sex,
                        identity: res.data.idCard,
                        staffnote: res.data.staffnote
                    })

                }
            })
        } else {
            console.info("新绑定")
        }
         // 一加载进页面就展示未点击上传的绑定条码信息
         wx.getStorage({
            key: 'sessionuser',
            success: function (res) {
                let data = {}
                data.stafftel = res.data.phone
                wx.request({
                    url: "https://bainuo.beijingepidial.com/client/hpv/unmergedlist",
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "POST",
                    data: data,
                    complete: function (res) {
                        that.setData({
                            mergedlist: res.data,
                        })
                        wx.hideLoading()
                    }
                })

                wx.request({
                    url: "https://bainuo.beijingepidial.com/client/salenspot/search",
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "POST",
                    data: data,
                    complete: function (res) {
                        let spotdata = []
                        let saledata = []
                        let paydata = []
                        for (var i = 0; i < res.data.spots.length; i++) {
                            spotdata.push(res.data.spots[i].spotname)
                        }
                        for (var j = 0; j < res.data.sales.length; j++) {
                            saledata.push(res.data.sales[j].salesname)
                        }
                        for (var k = 0; k < res.data.pays.length; k++) {
                                paydata.push(res.data.pays[k].payname)
                            }
                        that.setData({
                            spotarray: spotdata,
                            salesarray: saledata,
                            payarray: paydata
                        })
                    }
                })
            },
        })
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