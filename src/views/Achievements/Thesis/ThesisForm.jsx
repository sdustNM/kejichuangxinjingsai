import React, { Component } from 'react'
import { Card, Form, Input, Button, Select, DatePicker, Space, message, Descriptions } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import moment from "moment"
import { getUserID, getUserName } from "../../../utils/auth"
import SelectManComplete from '../../../components/SelectAllManComplete'
import AchievementAppendixUpload from '../AchievementAppendixUpload'

import { setArticleByID, getArticleByID } from '../../../services/Achievements'

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
const collectionList = [
    {
        key: 'null',
        name: '无'
    },
    {
        key: 'EI',
        name: 'EI'
    },
    {
        key: 'SCI',
        name: 'SCI'
    },
    {
        key: 'SSCI',
        name: 'SSCI(社会科学类)'
    },
    {
        key: 'ISTP',
        name: 'ISTP'
    },
    {
        key: 'A&HCI',
        name: 'A&HCI'
    },
    {
        key: '中文核心期刊',
        name: '中文核心期刊'
    }
]
class ThesisForm extends Component {
    constructor(...props) {
        super(...props)
        this.state = {
            id: props[0].location.state && props[0].location.state.id,
            userID: getUserID(),
            userName: getUserName(),
            collectionList: collectionList,
            yuanReview: '',
            xiaoReview: '',
            coverList: null,
            contentsList: null,
            articleList: null,
        }
        this.formRef = React.createRef();
    }

    async componentDidMount() {
        const { id } = this.state
        let coverList = []
        let contentsList = []
        let articleList = []
        let yuanReview = ''
        let xiaoReview = ''
        if (id) {
            const res = await getArticleByID({ id })
            //console.log(res)
            if (res.result) {
                const item = JSON.parse(res.data)
                console.log(res.data, item)
                item.coverAppendix && (coverList = item.coverAppendix)
                item.contentsAppendix && (contentsList = item.contentsAppendix)
                item.articleAppendix && (articleList = item.articleAppendix)

                console.log(coverList,this.getAppendixUrls(coverList))
                this.formRef.current.setFieldsValue({
                    thesisName: item.论文名称,
                    journal: item.发表期刊,
                    publishYear: !item.发表时间year ? null : moment(item.发表时间year, 'YYYY'),
                    issue: item.发表期号,
                    collection: item.期刊收录,
                    mobile: item.联系方式,
                    others: !item.其他作者 ? [undefined] : item.其他作者.split(','),
                    cover: this.getAppendixUrls(coverList),
                    contents: this.getAppendixUrls(contentsList),
                    article: this.getAppendixUrls(articleList),
                    remark: item.备注
                })

                yuanReview = item.学院意见
                xiaoReview = item.学校意见
            }
        }
        else {
            this.formRef.current.setFieldsValue({
                others: [undefined]
            })
        }
        this.setState({
            coverList,
            contentsList,
            articleList,
            yuanReview,
            xiaoReview,
        })
    }

    getAppendixUrls = list => {
        return list.reduce((pre, item) => {
            return pre ? pre + ',' + item.url : item.url
        }, null)
    }

    onFinish = async values => {
        //console.log(values)
        await this.save(values, 1)
    }

    // submit = async () => {
    //     try {
    //         const values = await this.formRef.current.validateFields();
    //         //console.log('Success:', values);
    //         await this.save(values, 1)
    //       } catch (errorInfo) {
    //         //console.log('Failed:', errorInfo);
    //       }

    // }

    save = async (values, flag) => {
        const { id, userID } = this.state
        console.log(values.others)
        const params = {
            id,
            sno: userID,
            "articleName": values.thesisName,
            "journal": values.journal,
            "publishYear": values.publishYear && values.publishYear.format('YYYY'),
            "volumn": values.issue,
            "cite": values.collection,
            "link": values.mobile,
            "otherAuthors": values.others && values.others.map(x => x.type + ":" + x.value).join(','),
            "coverUrl": values.cover,
            "contentUrl": values.contents,
            "paperUrl": values.article,
            "bz": values.remark,
            state: flag
        }

        console.log(params)
        const res = await setArticleByID(params)
        if (res.result) {
            message.success('操作成功')
            this.props.history.replace({ pathname: '/student/ReviewList' })
        }
    }

    checkCooperators = (rule, value) => {
        if (value !== undefined && value.value !== "") {
            //value:{type: x;value: x;selectedValue: x}
            //console.log("ddd",value,value.selectedValue);
            if (value.type === "0" && value.selectedValue === undefined) 
            { 
                return Promise.reject("校内人员必须从下拉框中区配！");
               
            }
            return Promise.resolve();
        }
        return Promise.reject("校内请选择参与人，校外请输入姓名!");
    };

    render() {
        const { id, userID, userName, collectionList, coverList, contentsList, articleList, yuanReview, xiaoReview } = this.state
        const title = (
            <Space direction="vertical">
                <h2>
                    <strong>论文成果申报</strong>
                </h2>
                {id && (
                    <Descriptions style={{ width: '100%' }} size='small' column={3} bordered >
                        <Descriptions.Item label='学院意见' span={3}>{yuanReview}</Descriptions.Item>
                        <Descriptions.Item label='学校意见' span={3}>{xiaoReview}</Descriptions.Item>
                    </Descriptions>)
                }
            </Space>
        )
        return (
            <Card title={title}>
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
                        <Select style={{ width: 200 }}>
                            {collectionList.map(item => <Option key={item.key} value={item.name}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="第一作者"
                        name="student"
                        initialValue={`${userName}(${userID})`}
                        rules={[
                            {
                                required: true,
                                message: '第一作者不能为空!',
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

                    <Form.Item
                        label="备注"
                        name="remark"
                    >
                        <TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Space>
                            <Button type="primary" htmlType="submit">保存并提交</Button>
                            {/* <Button type="primary" onClick={this.submit}>保存并提交</Button> */}
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default ThesisForm
