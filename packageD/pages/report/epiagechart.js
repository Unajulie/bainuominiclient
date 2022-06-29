import * as echarts from '../../../packageD/ec-canvas/echarts';
//在page外定义一个函数用来获取数据并渲染到页面上
// let that = null;

function data_bpbar(chart, ydata) {
    console.info("000000000000000000000000")
    console.info(chart)
    console.info(ydata)
}

Page({
    /**
     * 页面的初始数据
     */
    data: {
        ec: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // that = this;
    },

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
                                testimes.push("第" + (i) + "次检测:"+ that.data.datearray[i-1])
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

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

    /**
     * 生命周期函数--监听页面显示
     */

    onShow: function () {
        this.randarComponent = this.selectComponent("#mychart-radar");
        //这个id要对应你在wxml里边图表的容器id
        this.initBprandar();
    }
})