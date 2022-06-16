// import request from '../../servers/request'
// import { showToast } from '../../utils/util'

Page({
    data: {
        questions: [],
        questions2: [],
        // 有几项问卷
        count: 0,
        // 问卷目前正在哪项以及输入的值是什么
        curId: 0,
        // 蓝色进度条宽度
        activeWidth: 0,
        // 向后端返回的数据
        survey_result: [],

    },
    onLoad() {
        let that = this
        wx.showModal({
            title: '提示',
            confirmText: "是",
            cancelText: "否",
            content: '您是否已经仔细阅读过防癌健康生活指南？',
            success: function (res) {
                if (res.confirm) {
                    that.setData({
                        read: true,
                    })
                    console.info(that.data.read)
                    that.readTrue()
                } else {
                    that.setData({
                        read: false,
                    })
                    console.info(that.data.read)
                    that.readFalse()
                }
            }

        })

    },
    readTrue() {
        let that = this
        // 问卷后端返回数组
        let questions = [{
                question: '尊敬的用户,',
                type: 3
            },
            {
                question: '1.阅读防癌健康生活指南什么因素最影响您的阅读体验？(多选)',
                type: 4,
                id: 0,
                inputval: "",
                options: [{
                        id: 0,
                        text: '想下载指南但不知道在哪下载',
                        isselected: false
                    },
                    {
                        id: 1,
                        text: '字体太小，太模糊看不清',
                        isselected: false
                    },
                    {
                        id: 2,
                        text: '篇幅太冗长',
                        isselected: false
                    },
                    {
                        id: 3,
                        text: '其他问题',
                        isselected: false
                    },
                ]
            },
            {
                question: '2.您觉得防癌健康生活指南篇幅长吗?',
                type: 2,
                id: 1,
                inputval: "",
                options: [{
                        id: 4,
                        text: '篇幅很长',
                        isselected: false
                    },
                    {
                        id: 5,
                        text: '篇幅合适',
                        isselected: false
                    },
                ]
            },
            {
                question: '3.防癌健康生活指南中的建议在此之前您是否有了解过？',
                type: 2,
                id: 2,
                inputval: "",
                options: [{
                        id: 6,
                        text: '完全没有了解过，改变了我的认知',
                        isselected: false
                    },
                    {
                        id: 7,
                        text: '有些知识了解过，大多数没听说过',
                        isselected: false
                    },
                    {
                        id: 8,
                        text: '绝大多数知识了解过，少数不知道',
                        isselected: false
                    },
                ]
            },
            {
                question: '4.阅读防癌健康生活指南后，您觉得哪些内容对预防癌症非常有用？(多选)?',
                type: 4,
                id: 3,
                inputval: "",
                options: [{
                        id: 9,
                        text: '饮食建议中的《防癌健康饮食建议表》',
                        isselected: false
                    },
                    {
                        id: 10,
                        text: '运动建议中的运动强度量化标准 ',
                        isselected: false
                    },
                    {
                        id: 11,
                        text: '心里情绪和癌症发生相关的内容',
                        isselected: false
                    },
                    {
                        id: 12,
                        text: '其他内容',
                        isselected: false
                    },
                ]
            },
            {
                question: '5.您是否会按照防癌健康生活指南上的建议改变饮食和生活习惯？',
                type: 2,
                id: 4,
                inputval: "",
                options: [{
                        id: 13,
                        text: '我会部分按照防癌健康生活指南更改生活习惯',
                        isselected: false
                    },
                    {
                        id: 14,
                        text: '我会再评估一下指南能给我的生活带来的变化 ',
                        isselected: false
                    },

                ]
            },
            {
                question: '6.您是否会将指南给亲友看，并且建议他们按照指南内容调整生活习惯？',
                type: 2,
                id: 5,
                inputval: "",
                options: [{
                        id: 15,
                        text: '会给他们看，但是仅仅给他们展示一下',
                        isselected: false
                    },
                    {
                        id: 16,
                        text: '会给他们看，并且也建议他们按照指南调整生活习惯',
                        isselected: false
                    },
                    {
                        id: 17,
                        text: '不会分享',
                        isselected: false
                    },
                    {
                        id: 18,
                        text: '已经分享过了',
                        isselected: false
                    },
                ]
            },
            {
                question: '7.报告中呈现的文字内容是否有您不理解的地方？',
                type: 5,
                id: 6,
                inputval: "",
                options: [{
                        id: 19,
                        text: '没有',
                        isselected: false
                    },
                    {
                        id: 20,
                        text: '有 ',
                        isselected: false
                    },
                ]
            },
            {
                question: '8.您觉得针对M值低风险人群的防癌健康生活建议是否有可参考性，以及您是否会参照建议尝试改变生活习惯？',
                type: 2,
                id: 7,
                inputval: "",
                options: [{
                        id: 21,
                        text: '很有参考性，会按照建议改变',
                        isselected: false
                    },
                    {
                        id: 22,
                        text: '很有参考性，但是总体难以改变',
                        isselected: false
                    },
                    {
                        id: 23,
                        text: '没有参考性，也不会尝试改变',
                        isselected: false
                    },
                ]
            },
            {
                question: '9.您觉得癌症筛查检测周期长吗？',
                type: 2,
                id: 8,
                inputval: "",
                options: [{
                        id: 24,
                        text: '很长，希望能够缩短检测周期',
                        isselected: false
                    },
                    {
                        id: 25,
                        text: '不算很长，能够接受',
                        isselected: false
                    },
                ]
            },
            {
                question: '10.整个检测流程您是否有不满意的地方？',
                type: 5,
                id: 9,
                inputval: "",
                options: [{
                        id: 26,
                        text: '没有',
                        isselected: false
                    },
                    {
                        id: 27,
                        text: '有',
                        isselected: false
                    },
                ]
            },
            {
                question: '11.您对本次的检测服务体验整体感到？',
                type: 2,
                id: 10,
                inputval: "",
                options: [{
                        id: 28,
                        text: '非常满意',
                        isselected: false
                    },
                    {
                        id: 29,
                        text: '满意',
                        isselected: false
                    },
                    {
                        id: 30,
                        text: '普通',
                        isselected: false
                    },
                    {
                        id: 31,
                        text: '非常不满意',
                        isselected: false
                    },
                ]
            },
            {
                question: '12.请问您是否还会选择我司提供的检测服务',
                type: 2,
                id: 11,
                inputval: "",
                options: [{
                        id: 32,
                        text: '会',
                        isselected: false
                    },
                    {
                        id: 33,
                        text: '不会',
                        isselected: false
                    },
                ]
            },
            {
                question: '13.您认为整套检测流程中哪些地方还需要进一步提升',
                type: 5,
                id: 12,
                inputval: "",
                options: [{
                        id: 34,
                        text: '不需要',
                        isselected: false
                    },
                    {
                        id: 35,
                        text: '需要',
                        isselected: false
                    },
                ]
            },
        ]
        that.setData({
            questions: questions,
            count: questions.length,
            // 最终的问卷调查结果
            survey_result: Array(questions.length - 1).fill(0),
        })
    },
    readFalse() {
        let that = this
        let questions2 = [{
                question: '温馨提示：',
                type: 7
            },
            {
                question: '1.您没有仔细阅读防癌健康生活指南的原因是？',
                type: 4,
                id: 0,
                inputval: "",
                options: [{
                        id: 0,
                        text: '不知道在哪里领取指南',
                        isselected: false
                    },
                    {
                        id: 1,
                        text: '指南内容太多，且主要内容不突出，没耐心看',
                        isselected: false
                    },
                    {
                        id: 2,
                        text: '指南内容字太小看不清',
                        isselected: false
                    },
                    {
                        id: 3,
                        text: '其他原因',
                        isselected: false
                    },
                ]

            },
            {
                question: '2.检测报告中呈现的文字内容是否有您不理解的地方?',
                type: 5,
                id: 1,
                inputval: "",
                options: [{
                        id: 4,
                        text: '没有',
                        isselected: false
                    },
                    {
                        id: 5,
                        text: '有',
                        isselected: false
                    },

                ]
            },
            {
                question: '3.您觉得针对M值低风险人群的防癌健康生活建议是否有可参考性，以及您是否会参照建议尝试改变生活习惯？',
                type: 2,
                id: 2,
                inputval: "",
                options: [{
                        id: 6,
                        text: '很有参考性，会按照建议改变',
                        isselected: false
                    },
                    {
                        id: 7,
                        text: '很有参考性，但是总体难以改变',
                        isselected: false
                    },
                    {
                        id: 8,
                        text: '没有参考性，也不会尝试改变',
                        isselected: false
                    },

                ]
            },
            {
                question: '4.您觉得癌症筛查检测周期长吗？',
                type: 2,
                id: 3,
                inputval: "",
                options: [{
                        id: 9,
                        text: '很长，希望能够缩短检测周期',
                        isselected: false
                    },
                    {
                        id: 10,
                        text: '不算很长，能够接受',
                        isselected: false
                    },

                ]
            },
            {
                question: '5.整个检测流程您是否有不满意的地方?',
                type: 5,
                id: 4,
                inputval: "",
                options: [{
                        id: 11,
                        text: '没有',
                        isselected: false
                    },
                    {
                        id: 12,
                        text: '有',
                        isselected: false
                    },

                ]
            },
            {
                question: '6.您对本次的检测服务体验整体感到？',
                type: 2,
                id: 5,
                inputval: "",
                options: [{
                        id: 13,
                        text: '非常满意',
                        isselected: false
                    },
                    {
                        id: 14,
                        text: '满意',
                        isselected: false
                    },
                    {
                        id: 15,
                        text: '普通',
                        isselected: false
                    },
                    {
                        id: 16,
                        text: '不满意 ',
                        isselected: false
                    },
                    {
                        id: 17,
                        text: '非常不满意 ',
                        isselected: false
                    },
                ]
            },
            {
                question: '7.请问您是否还会选择我司提供的检测服务',
                type: 5,
                id: 6,
                inputval: "",
                options: [{
                        id: 18,
                        text: '会',
                        isselected: false
                    },
                    {
                        id: 19,
                        text: '不会',
                        isselected: false
                    },

                ]
            },
            {
                question: '8.您认为整套检测流程中哪些地方还需要进一步提升',
                type: 5,
                id: 7,
                inputval: "",
                options: [{
                        id: 20,
                        text: '不需要',
                        isselected: false
                    },
                    {
                        id: 21,
                        text: '需要',
                        isselected: false
                    },
                ]
            },
        ]
        that.setData({
            questions2: questions2,
            count: questions2.length,
            // 最终的问卷调查结果
            survey_result: Array(questions2.length - 1).fill(0),
        })
    },
    //点击开始回答问卷
    handleStart() {
        const {
            curId
        } = this.data
        this.setData({
            curId: curId + 1,
        })
    },
    // 点击问卷某个选项进行下一步问卷
    handleNext() {
        const {
            curId,
            count,
            survey_result
        } = this.data
        if (survey_result[curId - 1] == 0) {
            wx.showToast({
                title: '请选择',
                icon: 'error',
                duration: 2000
            })
            return
        }
        const step = 670 / count
        this.setData({
            curId: curId + 1,
            activeWidth: step * (curId + 1)
        })
    },
    // 上一步
    handleLast() {
        const {
            curId,
            count
        } = this.data

        if (this.data.curId !== 0) {
            this.setData({
                curId: curId - 1
            })
        }
        const step = 670 / count
        this.setData({
            activeWidth: step * (curId - 1)
        })

    },
    // 用户仅单选
    handleSelect(e) {
        let {
            id,
            question,
            index,
            value,
            options,
            isselected,
            text
        } = e.currentTarget.dataset
        console.info(options)
        this.data.survey_result.splice((index), 1, {
            id,
            question,
            value,
            text,
            isselected,
            options
        })
   
        if (this.data.read == true) {
            this.data.survey_result[id].inputval = this.data.questions[id].inputval

        } else {
            this.data.survey_result[id].inputval = this.data.questions2[id].inputval
        }
        // this.data.survey_result[id].inputval = ""
        let survey_result = this.data.survey_result
        this.setData({
            survey_result
        })

        console.log('survey_result:', this.data.survey_result)
    },
    //用户单选加填写
    handleSinSelect(e) {
        let {
            id,
            question,
            value,
            index,
            text,
            optionid,
            isselected
        } = e.currentTarget.dataset
        let options = this.data.survey_result[id].options ? this.data.survey_result[id].options : e.currentTarget.dataset.options
        //控制单选框中只有最后一个选中的才能被选中， 其他的都变成不选中状态
        options[optionid].isselected = (isselected == false ? true : false)

        // for (let i = 0; i < options.length; i++) {
        //     if (options[optionid].isselected==true) {
        //         options[i + 1].isselected == false
        //         console.info(options[i + 1].isselected)
        //         options[optionid].isselected == options[i + 1].isselected
        //     } else {
        //         options[i - 1].isselected = false
        //         console.info(options[i-1 ].isselected)
        //         options[optionid].isselected == options[i - 1].isselected
              
        //     }
        // }
        this.data.survey_result.splice(index, 1, {
            id,
            question,
            isselected,
            options,
            value,
            text
        })
        if (this.data.read == true) {
            this.data.survey_result[id].inputval = this.data.questions[id].inputval

        } else {
            this.data.survey_result[id].inputval = this.data.questions2[id].inputval
        }
        let survey_result = this.data.survey_result
        this.setData({
            survey_result
        })
        // console.info(survey_result)
    },
    //单选填写
    handlesinInput(e) {
        let {
            id,
            index,
            question
        } = e.currentTarget.dataset
        let options = this.data.survey_result[id].options ? this.data.survey_result[id].options : e.currentTarget.dataset.options
        // console.info(options)
        options.splice(options.length - 1, 1)
        options[options.length] = {
            id: options.length + 1,
            "text": "说明:" + e.detail.value,
            isselected: true,
            extra: true
        }
        let inputval = this.data.survey_result[id].inputval ? this.data.survey_result[id].inputval : e.detail.value
        this.data.survey_result.splice(index, 1, {
            id,
            question,
            options,
            inputval
        })
        let survey_result = this.data.survey_result
        this.setData({
            survey_result
        })
        console.info(survey_result)
    },
    // 用户多选加填写
    handleMultiSelect(e) {
        let {
            id,
            question,
            value,
            index,
            text,
            optionid,
            isselected
        } = e.currentTarget.dataset
        let options = this.data.survey_result[id].options ? this.data.survey_result[id].options : e.currentTarget.dataset.options
        options[optionid].isselected = (isselected == false ? true : false)
        this.data.survey_result.splice(index, 1, {
            id,
            question,
            isselected,
            options,
            value,
            text
        })
        if (this.data.read == true) {
            this.data.survey_result[id].inputval = this.data.questions[id].inputval
        } else {
            this.data.survey_result[id].inputval = this.data.questions2[id].inputval
        }
        let survey_result = this.data.survey_result
        this.setData({
            survey_result
        })
        console.info(survey_result)
    },
    //多选加填写
    handleInput(e) {
        console.info(e.detail.value)
        let {
            id,
            index,
            question,
        } = e.currentTarget.dataset
        let options = this.data.survey_result[id].options ? this.data.survey_result[id].options : e.currentTarget.dataset.options
        options.splice(options.length - 1, 1)
        options[options.length] = {
            id: options.length + 1,
            "text": "其他:" + e.detail.value,
            isselected: true,
            extra: true
        }
        let inputval = this.data.survey_result[id].inputval ? this.data.survey_result[id].inputval : e.detail.value
        this.data.survey_result.splice(index, 1, {
            id,
            question,
            options,
            inputval
        })
        let survey_result = this.data.survey_result
        this.setData({
            survey_result
        })
        console.info(survey_result)

    },
    checkboxChange(e) {
        const {
            id,
            question,
            isselected,
            value,
            index,
            text
        } = e.currentTarget.dataset
        const {
            survey_result
        } = this.data
        survey_result.splice(index, 1, {
            id,
            question,
            isselected,
            value,
            text
        })
        console.info(value)
        console.info(text)
        console.info(isselected)
        if (value) {
            this.setData({
                survey_result

            })
        }
        const {
            selectedata
        } = e.target.dataset.value

        // this.setData({
        //   [string]: !this.data.options[e.target.dataset.value].isselected
        // })
        // let detailValue = this.data.options.filter(it => it.isselected).map(it => it.value)
        // console.log('所有选中的值为：', detailValue)
    },
    // 如果有是输入框，则输入
    //   handleInput(e) {
    //     const { value } = e.detail
    //     const { id,question, index } = e.currentTarget.dataset
    //     const { survey_result } = this.data
    // console.info(e)
    //     survey_result.splice(index, 1, { id,question, value })
    //     this.setData({
    //       survey_result
    //     })
    //     // console.log('survey_result:', this.data.survey_result)
    //   },
    // 静止用手左右滑动
    forbid() {
        return false
    },
    // 提交问卷
    submitQues() {
        let oThis = this
        wx.getStorage({
            key: 'sessionuser',
            success: function (sessionuser) {
                let quesarrs = {}
                console.info(sessionuser)
                quesarrs.phone = sessionuser.data.phone
                quesarrs.username = sessionuser.data.username
                quesarrs.questions = oThis.data.survey_result
                console.info(quesarrs)
                wx.request({
                    url: "https://bainuo.beijingepidial.com/client/users/save/ques",
                    header: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    data: quesarrs,
                    // data: {"sampleid": 1121032800079},
                    complete: function (res) {
                        //用户点击确定后没值的输入值后就不可编辑
                        //一定要写成this.data.isDisabled，不然判断出不来
                        console.info(res)
                        if (res.statusCode == 200) {
                            wx.showToast({
                                title: '问卷保存成功',
                                icon: 'success',
                                duration: 2000,
                                // success: () => {
                                //     setTimeout(() => {
                                //       wx.navigateBack();
                                //     }, 2000);
                                //   }
                                complete: function () {
                                    setTimeout(function () {
                                        wx.switchTab({
                                            url: "/pages/report/report"
                                        })
                                    }, 2000);
                                }
                            });
                        }
                    }
                })
            }
        })
    }
})