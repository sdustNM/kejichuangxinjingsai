import React, { Component } from 'react'
import { Form, Input, Space, Button, Select, message, DatePicker, List } from 'antd'
import AppendixList from '../../../Project/AppendixList'
import moment from 'moment'
import { getDDInfo } from '../../../../services/Achievements'
import { setRealName } from '../../../../services/Achievements/competitionName'

const layout = {
    labelCol: { span: 4 }, wrapperCol: { span: 16 }
}
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
}
const { Option } = Select

export default class RealCompetitionEdit extends Component {
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
            this.setState({
                levelList: data.ddLevel,
                typeList: data.ddType,
                baseNameList: data.ddList
            }, this.initForm)
        }
    }
    componentDidUpdate(preProps) {
        if (preProps.record.Id === this.props.record.Id) return
        this.initForm()
    }

    initForm = () => {
        const { record } = this.props
        console.log(record)
        const initialValues = {
            id: record.id,
            sortid: record.sortid,
            realName: record.name,
            baseCompetitionName: record.baseCompetitionid,
            competitionType: record.type,
            competitionLevel: record.comLevel,
            year: !record.batch ? null : moment(record.batch, 'YYYY'),
            session: record.sessionNumber
        }
        this.formRef.current.setFieldsValue(initialValues)
    }

    onFinish = async values => {
        const params = {
            id: values.id,
            sortid: values.sortid,
            name: values.realName,
            type: values.competitionType,   //A,B,C类
            baseCompetitionid: values.baseCompetitionName,   //固定比赛
            batch: values.year && values.year.format('YYYY'), //年份
            sessionNumber: values.session,  //届数
            comLevel: values.competitionLevel,
            valid: true
        }
        console.log(params)
        const res = await setRealName(params)
        if (res.result) {
            message.success('保存成功！')
            this.props.hideModal()
        }
    }
    onCancel = () => {
        this.props.hideModal()
    }
    render() {
        const { levelList, typeList, baseNameList } = this.state
        const { record } = this.props
        //console.log(record)
        return (
            <Form
                {...layout}
                name="competition"
                ref={this.formRef}
                onFinish={this.onFinish}
            >
                <Form.Item
                    label="编号"
                    name="id"
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    label="排序号"
                    name="sortid"
                >
                    <Input placeholder='请输入排序号' />
                </Form.Item>
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
                <Form.Item {...tailLayout} >
                    <Space>
                        <Button key="approve" type="primary" htmlType='submit'>修改</Button>
                        <Button key="reject" type="danger" onClick={this.onCancel}>取消</Button>
                    </Space>
                </Form.Item>
            </Form>
        )
    }
}
