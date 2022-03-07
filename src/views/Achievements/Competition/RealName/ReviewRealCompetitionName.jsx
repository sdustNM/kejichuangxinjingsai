import React, { Component } from 'react'
import { Form, Input, Button, Select, DatePicker, List, Space, Modal, Popconfirm } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import moment from 'moment';
import { getDDInfo } from '../../../../services/Achievements'
import { reviewRealCompetition } from '../../../../services/Achievements/competitionName';
import AppendixList from '../../AppendixList';

const { TextArea } = Input
const { Option } = Select

const layout = {
    labelCol: { span: 4, },
    wrapperCol: { span: 16, }
}
const tailLayout = {
    wrapperCol: { offset: 4, span: 16 }
}

export default class ReviewRealCompetitionName extends Component {
    formRef = React.createRef();
    state = {
        levelList: [],
        typeList: [],
        baseNameList: []
    }

    async componentDidMount() {
        const dd = await getDDInfo()
        if (dd.result) {
            const data = JSON.parse(dd.data)
            //console.log(data)
            this.setState({
                levelList: data.ddLevel,
                typeList: data.ddType,
                baseNameList: data.ddList
            }, this.initForm)

        }
    }
    initForm = () => {
        const { record } = this.props
        const initialValues = {
            realName: record.name,
            baseCompetitionName: record.baseCompetitionid,
            sponsor: record.sponsor && record.sponsor.split(','),
            competitionType: record.type,
            competitionLevel: record.comLevel,
            year: !record.batch ? null : moment(record.batch, 'YYYY'),
            session: record.sessionNumber,
            //advice: record.advice
        }
        this.formRef.current.setFieldsValue(initialValues)
    }

    handleApprove = () => this.save(true)
    handleReject = () => this.save(false)

    save = async valid => {

        try {
            const values = await this.formRef.current.validateFields();
            const params = {
                id: this.props.record.id,
                name: values.realName,
                type: values.competitionType,   //A,B,C类
                sponsor: values.sponsor && values.sponsor.join(','),
                baseCompetitionid: values.baseCompetitionName,   //固定比赛
                batch: values.year && values.year.format('YYYY'), //年份
                sessionNumber: values.session,  //届数
                comLevel: values.competitionLevel,
                valid, //待审核
                advice: values.advice
            }

            //console.log(values)
            //console.log(params)

            const res = await reviewRealCompetition(params)
            console.log(res)
            if (res.result) {
                Modal.success({
                    content: '操作成功！'
                });
                this.props.closeModal()
            }
            else {
                Modal.error({
                    content: `操作失败！${res.message}`
                });
            }
        } catch (e) {
            console.log(e)
        }
    }


    render() {
        const { levelList, typeList, baseNameList } = this.state
        const { record } = this.props
        console.log(record)
        return (
            <Form
                {...layout}
                name="competition"
                ref={this.formRef}
            //onFinish={this.onFinish}
            >
                <Form.Item
                    label="实际比赛名称"
                    name="realName"
                    rules={[
                        {
                            required: true,
                            message: '实际比赛名称不能为空!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    label="固定竞赛名称"
                    name="baseCompetitionName"
                    rules={[
                        {
                            required: true,
                            message: '固定竞赛名称必须选择!',
                        },
                    ]}>
                    <Select
                        showSearch
                        optionFilterProp='children'
                    >
                        {baseNameList.map(item => <Option key={item.Id} value={item.Id}>{item.Name}</Option>)}
                    </Select>
                </Form.Item>
                <Form.List
                    name="sponsor"
                    rules={[
                        {
                            validator: async (_, depts) => {
                                if (!depts || depts.length < 1) {
                                    return Promise.reject('至少填入一个主办单位！')
                                }
                                else { return Promise.resolve() }
                            },
                        },
                    ]}>
                    {(fields, { add, remove }, { errors }) => {
                        return (
                            <div>
                                {fields.map((field, index) => (
                                    <Form.Item
                                        {...(index === 0 ? layout : tailLayout)}
                                        label={index === 0 ? '主办单位' : ''}
                                        required={false}
                                        key={field.key}
                                    >
                                        <Form.Item
                                            {...field}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={[
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message: "请输入主办单位或删除",
                                                },
                                            ]}
                                            noStyle
                                        >
                                            <Input placeholder="请与证书落款完全一致" style={{ width: '60%' }} />
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
                                        <PlusOutlined /> <span>新增主办单位</span>
                                    </Button>
                                    <Form.ErrorList errors={errors} />
                                </Form.Item>
                            </div>
                        );
                    }}
                </Form.List>
                <Form.Item
                    label="竞赛类别"
                    name="competitionType"
                    rules={[
                        {
                            required: true,
                            message: '竞赛类别必须选择!',
                        },
                    ]}>
                    <Select>
                        {typeList.map(item => <Option key={item.Id} value={item.Id}>{item.Name}</Option>)}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="竞赛等级"
                    name="competitionLevel"
                    rules={[
                        {
                            required: true,
                            message: '竞赛等级必须选择!',
                        },
                    ]}>
                    <Select>
                        {levelList.map(item => <Option key={item.Id} value={item.Id}>{item.Name}</Option>)}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="年份"
                    name="year"
                    rules={[
                        {
                            required: true,
                            message: '年份信息不能为空!',
                        },
                    ]}
                >
                    <DatePicker picker="year" />
                </Form.Item>
                <Form.Item
                    label="届数"
                    name="session"
                    rules={[
                        {
                            required: true,
                            message: '届数信息不能为空!',
                        },
                    ]}
                >
                    <Input placeholder='请输入届数' />
                </Form.Item>
                <Form.Item
                    label="证明材料"
                >
                    {record.approveAppendix && record.approveAppendix.length > 0 ? <AppendixList fileList={record.approveAppendix} bordered={true} /> : '无'}
                </Form.Item>
                <Form.Item
                    label="相似名称"
                >
                    {record.simuList && record.simuList.length > 0 ? (
                        <List
                            size="small"
                            bordered
                            dataSource={record.simuList}
                            renderItem={item => <List.Item>{item}</List.Item>}
                        />) : '无'}
                </Form.Item>
                <Form.Item
                    label="审核意见"
                    name="advice"
                >
                    <TextArea
                        placeholder="请填写审核意见"
                        autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                </Form.Item>

                <Form.Item {...tailLayout} >
                    <Space>
                        <Button key="approve" type="primary" onClick={this.handleApprove}>
                            通过
                        </Button>
                        <Popconfirm
                            title={`拒绝后，此竞赛名称将不能再次申请，请再次确认！`}
                            onConfirm={this.handleReject}
                            okText="确认"
                            cancelText="取消"
                        >
                            <Button key="reject" type="danger">拒绝</Button>
                        </Popconfirm>
                    </Space>
                </Form.Item>
            </Form>
        )
    }
}
