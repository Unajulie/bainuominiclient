import * as echarts from '../../../packageD/ec-canvas/echarts';

const app = getApp();
// 初始化图表
// function initChart(canvas, width, height, dpr) {
//     // let that=this
//     const chart = echarts.init(canvas, null, {
//         width: width,
//         height: height,
//         devicePixelRatio: dpr 
//     });
//     canvas.setChart(chart);
//     var epiagebox=[1,1,1,1]
//     // let epiage=that.data.epiage
//     // let exepiage=that.data.exepiage
//     var testimes=[]
//     for(var i=0;i<=epiagebox.length;i++){
//         console.info(i)
//         testimes.push("第"+(i+1)+"次检测")
//     }
//     var option = {
//         title: {
//             text: '生物学年龄检测结果记录表',
//             left: 'center'
//         },
//         color: ['#ffd302','#edabc9','#6ae2c3'],
//         legend: {
//             data: ['实际年龄','生物学年龄', '预期生物学年龄'],
//             top: 30,
//             left: 'center',
//             backgroundColor: '#cecece',
//             z: 100,
//         },
//         grid: {
//             containLabel: true
//         },
//         tooltip: {
//             show: true,
//             trigger: 'axis'
//         },
//         xAxis: {
//             type: 'category',
//             boundaryGap: false,
//             data: testimes,
//             splitLine: {
//                 show: true
//             }, //网格线
//         },
//         yAxis: {
//             type: 'value',
//             boundaryGap: true,
//             data: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
//             show: true,

//         },

//         series: [{
//             name: '实际年龄',
//             type: 'line',
//             smooth: true,
//             data: [35,36,65]
//         },{
//             name: '生物学年龄',
//             type: 'line',
//             smooth: true,
//             data: [36,39,67]
//         }, {
//             name: '预期生物学年龄',
//             type: 'line',
//             smooth: true,
//             data: [34,36,65]
//         }]
//     };

//     chart.setOption(option);
//     return chart;
// }
//页外页面指针
// let that =null; 
// function initChart(canvas, width, height, dpr) {
//     const chart = echarts.init(canvas, null, {
//         width: width,
//         height: height,
//         devicePixelRatio: dpr
//     });
//     canvas.setChart(chart);
//     wx.getStorage({
//         key: 'sessionuser',
//         success: function (sessionuser) {
//             let formdata= {}
//             formdata.tel= sessionuser.data.phone
//             wx.request({
//                 url: "https://bainuo.beijingepidial.com/client/epiage/getchartdata",
//                 header: {
//                     "Content-Type": "application/x-www-form-urlencoded"
//                 },
//                 method: "POST",
//                 data:formdata,
//                 complete: function (res) {
//                     console.info(res)
//                     that.setData({
//                         datearray:res.data[0].date,
//                         chroarray:res.data[0]. inpchroage,
//                         epiagearray:res.data[0]. inpepiage,
//                         expepiagearray:res.data[0]. expepiageval,
//                     })
//                     console.info(that.data.epiagearray)
//                     var testimes = []
//                     for (var i = 1; i <= that.data.epiagearray.length; i++) {
//                         testimes.push("第" + (i) + "次检测")
//                     }
//                     var option = {
//                         title: {

//                             left: 'center'
//                         },
//                         color: ['#ffd302', '#edabc9', '#6ae2c3'],
//                         legend: {
//                             data: ['实际年龄', '生物学年龄', '预期生物学年龄'],
//                             top: 10,
//                             left: 'center',
//                             backgroundColor: '#cecece',
//                             z: 100,
//                         },
//                         grid: {
//                             containLabel: true
//                         },
//                         tooltip: {
//                             show: true,
//                             trigger: 'axis'
//                         },
//                         xAxis: {
//                             type: 'category',
//                             boundaryGap: false,
//                             data: testimes,
//                             splitLine: {
//                                 show: true
//                             }, //网格线
//                         },
//                         yAxis: {
//                             type: 'value',
//                             boundaryGap: true,
//                             data: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
//                             show: true,

//                         },

//                         series: [{
//                             name: '实际年龄',
//                             type: 'line',
//                             smooth: true,
//                             data: that.data.chroarray
//                         }, {
//                             name: '生物学年龄',
//                             type: 'line',
//                             smooth: true,
//                             data: that.data.epiagearray
//                         }, {
//                             name: '预期生物学年龄',
//                             type: 'line',
//                             smooth: true,
//                             data:that.data.expepiagearray
//                         }]
//                     };
//                     chart.setOption(option);
//                     return chart;
//                 }
//             })
//         }
//     })

// }
function data_bpbar(chart, ydata) {

}
Page({
    data: {
        ec: {},
    },
    //获得输入的实际年龄 
    bininput_chroage: function (e) {
        console.info(e.detail.value)
        this.setData({
            inpchroage: e.detail.value
        })
    },
    //获得输入的生物学年龄
    bininput_epiage: function (e) {
        console.info(e.detail.value)
        this.setData({
            inpepiage: e.detail.value
        })
    },
    // 按确定按钮生成图表
    genchart: function (e) {
        if (!this.data.inpchroage) {
            wx.showToast({
                title: '实际年龄必填',
                icon: 'error',
                duration: 2000
            })
        } else if (!this.data.inpepiage) {
            wx.showToast({
                title: '生物学年龄必填',
                icon: 'error',
                duration: 2000
            })
        } else {
            let that = this
            // 计算预期生物学年龄
            that.setData({
                expepiageval: (0.9044 * that.data.inpchroage + 8.9657).toFixed(2)
            })
            console.info(that.data.expepiageval)
            let formdata = {}
            formdata.inpchroage = that.data.inpchroage
            formdata.inpepiage = that.data.inpepiage
            formdata.expepiageval = that.data.expepiageval
            formdata.date = new Date().toLocaleDateString().replaceAll('/', '-')
            // formdata.date="2022-6-30"
            wx.getStorage({
                key: 'sessionuser',
                success: function (sessionuser) {
                    formdata.tel = sessionuser.data.phone
                    wx.request({
                        url: "https://bainuo.beijingepidial.com/client/epiage/genchart",
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        method: "POST",
                        data: formdata,
                        complete: function (res) {
                            if (res.data == "success") {
                                wx.showToast({
                                    title: '更新成功',
                                    icon: 'none',
                                    duration: 2000
                                })
                                // 样本保存成功后展示图表
                                that.initBprandar();
                            }
                        }
                    })
                },
                fail: function (res) {
                    console.info("failed")
                }
            })
        }
    },

    onLoad: function () {
    },

    // 初始化图表
    initBprandar() {
        let that = this
        let chart;
        this.randarComponent.init((canvas, width, height, dpr) => {
            chart = echarts.init(canvas, null, {
                width: width,
                height: height,
                devicePixelRatio: dpr,
            });
            wx.getStorage({
                key: 'sessionuser',
                success: function (sessionuser) {
                    let formdata = {}
                    formdata.tel = sessionuser.data.phone
                    wx.request({
                        url: "https://bainuo.beijingepidial.com/client/epiage/getchartdata",
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        method: "POST",
                        data: formdata,
                        complete: function (res) {
                            that.setData({
                                datearray: res.data[0].date,
                                chroarray: res.data[0].inpchroage,
                                epiagearray: res.data[0].inpepiage,
                                expepiagearray: res.data[0].expepiageval,
                            })
                            console.info(that.data)
                            var testimes = []
                            for (var i = 1; i <= that.data.datearray.length; i++) {
                                testimes.push("第" + (i) + "次检测:" + that.data.datearray[i - 1])
                            }
                            var option = {
                                title: {

                                    left: 'center'
                                },
                                color: ['#ffd302', '#edabc9', '#6ae2c3'],
                                legend: {
                                    data: ['实际年龄', '生物学年龄', '预期生物学年龄'],
                                    top: 10,
                                    left: 'center',
                                    backgroundColor: '#cecece',
                                    z: 100,
                                },
                                grid: {
                                    containLabel: true
                                },
                                tooltip: {
                                    show: true,
                                    trigger: 'axis'
                                },
                                xAxis: {
                                    type: 'category',
                                    boundaryGap: false,
                                    data: testimes,
                                    splitLine: {
                                        show: true
                                    }, //网格线
                                },
                                yAxis: {
                                    type: 'value',
                                    boundaryGap: true,
                                    data: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
                                    show: true,

                                },

                                series: [{
                                    name: '实际年龄',
                                    type: 'line',
                                    smooth: true,
                                    data: that.data.chroarray
                                }, {
                                    name: '生物学年龄',
                                    type: 'line',
                                    smooth: true,
                                    data: that.data.epiagearray
                                }, {
                                    name: '预期生物学年龄',
                                    type: 'line',
                                    smooth: true,
                                    data: that.data.expepiagearray
                                }]
                            };
                            chart.setOption(option);
                            return chart;
                        }
                    })
                }
            })
            data_bpbar(chart, that.data);
            this.chart = chart;
            return chart;
        });
    },
    onShow: function () {
        this.randarComponent = this.selectComponent("#mychart-radar");
        //这个id要对应你在wxml里边图表的容器id
        this.initBprandar();
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
        // that =null;   //记得释放
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