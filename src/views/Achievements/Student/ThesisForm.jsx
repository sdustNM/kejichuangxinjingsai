import React, { Component } from 'react'
import { Card, Form, Input, Button, Select, DatePicker } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

import { getUserID, getUserName } from "../../../utils/auth"
import SelectManComplete from '../../../components/SelectAllManComplete'
import ThesisAppendixUpload from './ThesisAppendixUpload'

import { setArticleByID, getArticleByID } from '../../../services/Archieve_Article'

const { Option } = Select

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 4,
        span: 16,
    },
};
class ThesisForm extends Component {
    constructor(...props) {
        super(...props)
        this.state = {
            id: props[0].location.state && props[0].location.state.projectID,
            userID: getUserID(),
            userName: getUserName(),
            coverList: null,
            contentsList: null,
            papersList: null,
        }
        this.formRef = React.createRef();
    }

    async componentDidMount() {
        const { id } = this.state
        let coverList = []
        let contentsList = []
        let papersList = []

        if (id) {
            const res = await getArticleByID({ id: 1 })
            console.log(res)
            if (res.result) {
                const item = JSON.parse(res.data)
                this.formRef.current.setFieldsValue({
                    thesisName: item.论文名称,
                    journal: item.发表期刊,
                })
            }
        }

        this.setState({
            coverList,
            contentsList,
            papersList
        })
    }

    onFinish = async values => {
        console.log(values)
        const { id, userID } = this.state
        const params = {
            id,
            sno: userID,
            "论文名称": values.thesisName,
            "发表期刊": values.journal,
            "发表时间year": values.publishTime && values.publishTime.format('YYYY'),
            "发表时间month": values.publishTime && values.publishTime.format('MM'),
            "发表期号": values.issue,
            "期刊收录": values.collection,
            "联系方式": values.mobile,
            "其它作者": values.others && values.others.join(','),
            "期刊封面url": this.getAppendixUrl("cover"),
            "目录页url": this.getAppendixUrl("contents"),
            "论文页url": this.getAppendixUrl("papers"),
            "备注": values.remark
        }

        console.log(params)
        const res = await setArticleByID(params)
        console.log(res)
    }


    checkCooperators = (rule, value) => {
        if (value !== undefined && value.value !== "") {
            return Promise.resolve();
        }
        return Promise.reject("请选择参与人!");
    };

    render() {
        const { id, userID, userName, coverList, contentsList, papersList } = this.state
        //console.log(id, name)
        return (
            <Card title={<h2><strong>论文成果申报</strong></h2>}>
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
                        label="发表时间"
                        name="publishTime"
                        rules={[
                            {
                                required: true,
                                message: '发表时间不能为空!',
                            },
                        ]}
                    >
                        <DatePicker picker="month" />
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
                        <Input />
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
                            <Option value="null">无</Option>
                            <Option value="EI">EI</Option>
                            <Option value="SCI">SCI</Option>
                            <Option value="CSCI">CSCI</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="第一作者"
                        name="student"
                        initialValue={`${userName}(${userID})`}
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
                        <Input placeholder='请输入手机号' />
                    </Form.Item>

                    <Form.List name="others">
                        {(fields, { add, remove }) => {
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
                                message: '至少上传一个封面图片!',
                            },
                        ]}
                    >
                        {coverList ? <ThesisAppendixUpload appendixList={coverList} maxNum={1} /> : <></>}
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
                        {contentsList ? <ThesisAppendixUpload appendixList={contentsList} maxNum={1} /> : <></>}
                    </Form.Item>
                    <Form.Item
                        label="论文页"
                        name="papers"
                        rules={[
                            {
                                required: true,
                                message: '至少上传一个论文正文页图片!',
                            },
                        ]}
                    >
                        {papersList ? <ThesisAppendixUpload appendixList={papersList} ref={this.papersAppedixRef} /> : <></>}
                    </Form.Item>

                    <Form.Item
                        label="备注"
                        name="remark"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default ThesisForm
