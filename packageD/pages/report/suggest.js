import * as echarts from '../../../packageD/ec-canvas/echarts';

// const app = getApp();
// let that=null
function data_bpbar(chart, ydata) {
    // that.onShow()
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
                expepiageval: (0.9044 * that.data.inpchroage + 8.9657).toFixed(4)
            })
            console.info(that.data.expepiageval)
            that.initBprandar();

        }
    },

    onLoad: function () {
        // that=this
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
            let star = 0.9044 * 1 + 8.9657
            let end = 0.9044 * 100 + 8.9657

            var option = {
                color: ['#dd4444', '#fec42c'],
                legend: {
                    top: -10,
                    data: ['实际年龄', '预期生物学年龄'],
                    textStyle: {
                        fontSize: 16
                    }
                },
                xAxis: {
                    scale: true,
                    name: "实际年龄",
                    type: 'value',
                    nameTextStyle: {
                        padding: [0, 0, 0, 0],
                        fontStyle: 'normal'
                    },
                    nameRotate: 0,
                    nameGap: 30,
                    nameLocation: 'center',
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'dashed'

                        }
                    },
                },
                yAxis: {
                    scale: true,
                    name: "生物学年龄",
                    type: 'value',
                    nameTextStyle: {
                        padding: [0, 0, 0, 20]
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'dashed'

                        }
                    },
                },

                tooltip: {
                    show: true,
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    },
                    smooth: true,
                    lineStyle: {
                        normal: {
                            opacity: 0.5
                        }
                    },
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',

                },

                lineStyle: {
                    normal: {
                        type: 'solid',
                        width: 30
                    }
                },
                legend: {
                    left: 'left',
                    data: [that.data.inpepiage, that.data.inpchroage]
                },
                axisPointer: {
                    link: {
                        xAxisIndex: 'all'
                    },
                    label: {
                        backgroundColor: '#777'
                    }
                },
                series: [{
                        name: '生物学年龄',
                        type: 'scatter',
                        symbolSize: 10,
                        data: [
                            [that.data.inpchroage, that.data.inpepiage]
                        ],
                        itemStyle: {
                            color: that.data.inpepiage > that.data.expepiageval ? 'red' : 'green'

                        },
                    },
                    {
                        type: 'line',
                        symbolSize: 0,
                        color: 'transparent',
                        data: [star, end],
                        lineStyle: {
                            width: 2
                        }
                    },
                    {
                        name: '预期生物学年龄',
                        type: 'scatter',
                        symbolSize: 10,
                        color: '#9db2ed',
                        data: [
                            [that.data.inpchroage, that.data.expepiageval]
                        ]
                    },

                ]
            };
            chart.setOption(option);
            return chart;
            //                 chart.setOption(option);

            // data_bpbar(chart, that.data);
            // this.chart = chart;
            // return chart;
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