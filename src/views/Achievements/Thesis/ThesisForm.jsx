import React, { Component } from 'react'
import { Card, Form, Input, Button, Select, DatePicker, Space, message, Descriptions } from 'antd';
import { MinusCircleOutlined, PlusOutlined, DoubleLeftOutlined } from '@ant-design/icons'
import moment from "moment"
import { getUserID, getUserName, isStudent } from "../../../utils/auth"
import SelectManComplete from '../../../components/SelectAllManComplete'
import AchievementAppendixUpload from '../AchievementAppendixUpload'

import { setArticleByID, getArticleByID, getArticleDDInfo } from '../../../services/Achievements'
import { IsValid } from '../../../utils/config';
const { Option } = Select
const { TextArea } = Input

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 16,
    },
}
const tailLayout = {
    wrapperCol: {
        offset: 4,
        span: 16,
    },
}

const index = ['中文核心期刊', 'SCI', 'EI']

class ThesisForm extends Component {
    constructor(...props) {
        super(...props)
        this.state = {
            id: props[0].location.state && props[0].location.state.id,
            yuanReview: '',
            xiaoReview: '',
            coverList: null,
            contentsList: null,
            articleList: null,
            stateBz: '',
            isIndex: false,
            indexList: null,
            rewardList: null,
            clickDisabled: false,
            state: 0,
            isStudent: isStudent()
        }
        this.formRef = React.createRef()
        this.collectionList = []
    }

    async componentDidMount() {
        const res = await getArticleDDInfo()
        if (res.result) {
            this.collectionList = JSON.parse(res.data).ddType
        }
        const { id } = this.state
        let coverList = []
        let contentsList = []
        let articleList = []
        let yuanReview = ''
        let xiaoReview = ''
        let stateBz = ''
        let isIndex = false
        let indexList = []
        let rewardList = []
        let state = 0
        if (id) {
            const res = await getArticleByID({ id })
            //console.log(res)
            if (res.result) {
                const item = JSON.parse(res.data)
                console.log(item)
                item.coverAppendix && (coverList = item.coverAppendix)
                item.contentsAppendix && (contentsList = item.contentsAppendix)
                item.articleAppendix && (articleList = item.articleAppendix)
                item.indexAppendix && (indexList = item.indexAppendix)
                item.rewardAppendix && (rewardList = item.rewardAppendix)

                //console.log(coverList, this.getAppendixUrls(coverList))
                this.formRef.current.setFieldsValue({
                    thesisName: item.论文名称,
                    journal: item.发表期刊,
                    publishYear: !item.发表时间year ? null : moment(item.发表时间year, 'YYYY'),
                    issue: item.发表期号,
                    collection: item.期刊收录,
                    studentName: item.姓名,
                    studentNo: item.学号,
                    mobile: item.联系方式,
                    yhkh: item.银行卡号,
                    sfzh: item.身份证号,
                    others: !item.其他作者id ? [undefined] : item.其他作者id.split(','),
                    cover: this.getAppendixUrls(coverList),
                    contents: this.getAppendixUrls(contentsList),
                    article: this.getAppendixUrls(articleList),
                    index: this.getAppendixUrls(indexList),
                    reward: this.getAppendixUrls(rewardList),
                    remark: item.备注,
                })
                stateBz = item.stateBz
                yuanReview = item.学院意见
                xiaoReview = item.学校意见
                isIndex = index.includes(item.期刊收录)
                state = item.State
            }

        }
        else {
            this.formRef.current.setFieldsValue({
                others: [undefined],
                studentName: getUserName(),
                studentNo: getUserID(),
            })
        }
        this.setState({
            coverList,
            contentsList,
            articleList,
            yuanReview,
            xiaoReview,
            stateBz,
            isIndex,
            indexList,
            rewardList,
            state
        })
    }

    getAppendixUrls = list => {
        return list.reduce((pre, item) => {
            return pre ? pre + ',' + item.url : item.url
        }, null)
    }

    changeCollection = value => {
        this.setState({ isIndex: index.includes(value) })
    }

    onFinish = async values => {
        this.setState({ clickDisabled: true })
        //console.log(values)
        await this.save(values, 1)
    }

    submit = async () => {
        try {
            this.setState({ clickDisabled: true })
            const values = await this.formRef.current.validateFields();
            await this.save(values, 0)
        } catch (errorInfo) {
            alert(`保存失败,请认真核对所填信息:${errorInfo.errorFields[0].errors[0]}`)
            //console.log('Failed:', errorInfo);
            this.setState({ clickDisabled: false })
        }
    }
    adminSubmit = async () => {
        try {
            this.setState({ clickDisabled: true })
            const values = await this.formRef.current.validateFields();
            await this.save(values, this.state.state)
        } catch (errorInfo) {
            alert(`保存失败,请认真核对所填信息:${errorInfo.errorFields[0].errors[0]}`)
            //console.log('Failed:', errorInfo);
            this.setState({ clickDisabled: false })
        }
    }

    save = async (values, flag) => {
        const { id } = this.state
        //console.log(values.others)
        const params = {
            id,
            sno: values.studentNo,
            "articleName": values.thesisName,
            "journal": values.journal,
            "publishYear": values.publishYear && values.publishYear.format('YYYY'),
            "volumn": values.issue,
            "cite": values.collection,
            "link": values.mobile,
            "银行卡号": values.yhkh,
            "身份证号": values.sfzh,
            "otherAuthors": values.others && values.others.map(x => x.type + ":" + x.value).join(','),
            "coverUrl": values.cover,
            "contentUrl": values.contents,
            "paperUrl": values.article,
            "indexUrl": values.index,
            "rewardUrl": values.reward,
            "bz": values.remark,
            state: flag
        }

        //console.log(params)
        const res = await setArticleByID(params)
        if (res.result) {
            message.success('操作成功')
            this.back()
        }
        this.setState({ clickDisabled: false })
    }

    checkCooperators = (rule, value) => {
        console.log("check:", value)
        if (value != undefined && value != "" && value.type != "undefined") {
            if (value.type == "0" && (value.selectedValue == undefined || value.selectedValue == '')) {
                return Promise.reject("校内人员必须从下拉框中区配！");
            }
            if (value.type == "2" || value.value != "") return Promise.resolve();
        }

        return Promise.reject("校内请选择人员，校外请输入姓名!");
    };

    back = () => {
        if (this.state.isStudent) {
            this.props.history.replace({ pathname: '/student/ReviewList' })
        } else {
            this.props.history.go(-1)
        }
    }


    render() {
        //console.log(this.formRef)
        //console.log(this.formRef && this.formRef.current && this.formRef.current.getFieldInstance('article'))
        const { id, coverList, contentsList, articleList, yuanReview, xiaoReview, stateBz,
            isIndex, indexList, rewardList, clickDisabled } = this.state
        const title = (
            <Space direction="vertical">
                <h2>
                    <strong>论文成果申报</strong>
                </h2>
                {(id && stateBz) && (
                    <Descriptions title={<span style={{ color: 'red' }}>{stateBz}</span>} style={{ width: '100%' }} size='small' column={3} bordered >
                        <Descriptions.Item label='学院意见' span={3}>{yuanReview}</Descriptions.Item>
                        <Descriptions.Item label='学校意见' span={3}>{xiaoReview}</Descriptions.Item>
                    </Descriptions>)
                }
            </Space>
        )
        const extra = <Button onClick={this.back}><DoubleLeftOutlined />返回</Button>

        return (
            <Card title={title} extra={extra}>
                <Form
                    {...layout}
                    name="thesis"
                    ref={this.formRef}
                    onFinish={this.onFinish}
                >
                    <Form.Item
                        label="论文名称"
                        name="thesisName"
                        rules={[
                            {
                                required: true,
                                message: '论文名称论文发表期刊不能为空!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="发表期刊"
                        name="journal"
                        rules={[
                            {
                                required: true,
                                message: '论文发表期刊不能为空!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="发表年份"
                        name="publishYear"
                        rules={[
                            {
                                required: true,
                                message: '发表时间不能为空!',
                            },
                        ]}
                    >
                        <DatePicker picker="year" />
                    </Form.Item>
                    <Form.Item
                        label="期号"
                        name="issue"
                        rules={[
                            {
                                required: true,
                                message: '期号不能为空!',
                            },
                        ]}
                    >
                        <Input style={{ width: 120 }} />
                    </Form.Item>
                    <Form.Item
                        label="收录情况"
                        name="collection"
                        rules={[
                            {
                                required: true,
                                message: '收录情况必须选择!',
                            },
                        ]}>
                        <Select style={{ width: 200 }} onChange={this.changeCollection}>
                            {this.collectionList.map(item => <Option key={item.Id} value={item.Name}>{item.Name}</Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="作者姓名"
                        name="studentName"
                        rules={[
                            {
                                required: true,
                                message: '作者姓名不能为空!',
                            },
                        ]}
                    >
                        <Input readOnly style={{ width: 200 }} />

                    </Form.Item >
                    <Form.Item
                        label="作者学号"
                        name="studentNo"
                        rules={[
                            {
                                required: true,
                                message: '作者学号不能为空!',
                            },
                        ]}
                    >
                        <Input readOnly style={{ width: 200 }} />

                    </Form.Item >

                    <Form.Item
                        label="联系方式"
                        name="mobile"
                        rules={[
                            {
                                required: true,
                                message: '联系方式不能为空!',
                            },
                        ]}
                    >
                        <Input placeholder='请输入手机号' style={{ width: 200 }} />
                    </Form.Item>
                    <Form.Item
                        label="银行卡号"
                        name="yhkh"
                        rules={[
                            {
                                required: true,
                                message: '银行卡号不能为空!',
                            },
                        ]}
                    >
                        <Input placeholder='青岛泰安校区填农行卡，济南校区填建行卡' />
                    </Form.Item>
                    <Form.Item
                        label="身份证号"
                        name="sfzh"
                        rules={[
                            {
                                required: true,
                                message: '身份证号不能为空!',
                            },
                            {
                                pattern: /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|30|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/,
                                message: '身份证号不合法!',
                            }
                        ]}
                    >
                        <Input placeholder='请输入身份证号' />
                    </Form.Item>

                    <Form.List name="others">
                        {(fields, { add, remove }) => {
                            //console.log(fields)
                            return (
                                <div>
                                    {fields.map((field, index) => (
                                        <Form.Item
                                            {...(index === 0 ? layout : tailLayout)}
                                            label={index === 0 ? '其他作者' : ''}
                                            required={false}
                                            key={field.key}
                                        >
                                            <Form.Item
                                                {...field}
                                                validateTrigger={['onChange']}
                                                rules={[
                                                    {
                                                        validator: this.checkCooperators
                                                    },
                                                ]}
                                                noStyle
                                            >
                                                <SelectManComplete />
                                            </Form.Item>
                                            {fields.length > 0 ? (
                                                <MinusCircleOutlined
                                                    className="dynamic-delete-button"
                                                    style={{ margin: '0 8px' }}
                                                    onClick={() => {
                                                        remove(field.name);
                                                    }}
                                                />
                                            ) : null}
                                        </Form.Item>
                                    ))}

                                    <Form.Item
                                        {...tailLayout}
                                    >
                                        <Button
                                            type="dashed"
                                            onClick={() => {
                                                add();
                                            }}
                                            style={{ width: '60%' }}
                                        >
                                            <PlusOutlined /> 添加其他作者
                                        </Button>
                                    </Form.Item>
                                </div>
                            );
                        }}
                    </Form.List>

                    <Form.Item
                        label="期刊封面"
                        name="cover"
                        rules={[
                            {
                                required: true,
                                message: '至少上传一个期刊封面图片!',
                            },
                        ]}
                    >
                        {coverList ? <AchievementAppendixUpload appendixList={coverList} maxNum={1} maxSize={3} fileType='article' /> : <></>}
                    </Form.Item>
                    <Form.Item
                        label="目录页"
                        name="contents"
                        rules={[
                            {
                                required: true,
                                message: '至少上传一个包含论文题目的目录图片!',
                            },
                        ]}
                    >
                        {contentsList ? <AchievementAppendixUpload appendixList={contentsList} maxNum={1} maxSize={3} fileType='article' /> : <></>}
                    </Form.Item>
                    <Form.Item
                        label="论文页"
                        name="article"
                        rules={[
                            {
                                required: true,
                                message: '至少上传一个论文正文页图片!',
                            },
                        ]}
                    >
                        {articleList ? <AchievementAppendixUpload appendixList={articleList} maxSize={3} fileType='article' /> : <></>}
                    </Form.Item>
                    {
                        isIndex && (
                            <Form.Item
                                label="检索证明"
                                name="index"
                                rules={[
                                    {
                                        required: true,
                                        message: '中文核心期刊发表或被SCI、EI等检索的的论文，需提交检索证明！',
                                    },
                                ]}
                            >
                                {indexList ? <AchievementAppendixUpload appendixList={indexList} maxSize={1} fileType='article' /> : <></>}
                            </Form.Item>
                        )
                    }
                    <Form.Item
                        label="相关材料"
                        name="reward"
                    >
                        {rewardList ? <AchievementAppendixUpload
                            appendixList={rewardList}
                            maxSize={3}
                            fileType='article'
                            tip='在校内外会议上获奖的论文，需提交会议通知、获奖作品名单或获奖证书照片或扫描件'
                        /> : <></>}
                    </Form.Item>
                    <Form.Item
                        label="备注"
                        name="remark"
                    >
                        <TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        {this.state.isStudent ? (<Space>
                            <Button type="primary" onClick={this.submit} disabled={clickDisabled}>保存</Button>
                            {IsValid && <Button type="primary" htmlType="submit" disabled={clickDisabled}>保存并提交</Button> }
                            <Button type="primary" onClick={this.back} disabled={clickDisabled}>取消</Button>
                        </Space>) : (<Space>
                            <Button type="primary" onClick={this.adminSubmit} disabled={clickDisabled}>保存</Button>
                            <Button type="primary" onClick={this.back} disabled={clickDisabled}>取消</Button>
                        </Space>)}
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default ThesisForm
