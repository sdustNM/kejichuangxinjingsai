import React, { Component } from 'react'
import { Form, Input, Space, Button, Select, message } from 'antd'
import { getTypeList } from '../../../../services/Achievements/ddOperation'
import { setBaseName } from '../../../../services/Achievements/competitionName'

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const { Option } = Select;

export default class BaseCompetitionEdit extends Component {
    state = {
        typeList: [],
    }
    formRef = React.createRef();
    async componentDidMount() {
        //console.log('mount', this.props.record)
        const res = await getTypeList()
        if (res.result) {
            const typeList = JSON.parse(res.data)
            this.setState({ typeList }, this.initForm)
        }
    }

    componentDidUpdate(preProps) {
        if (preProps.record.Id === this.props.record.Id) return
        this.initForm()
    }

    initForm = () => {
        const { record } = this.props
        const init = {
            id: record.Id,
            name: record.Name,
            type: record.Type,
            sortid: record.Sortid
        }
        this.formRef.current.setFieldsValue(init)
    }

    onFinish = async value => {
        const params = {
            name: value.name,
            id: value.id,
            type: value.type,
            sortid: value.sortid,
        }
        const res = await setBaseName(params)
        if (res.result) {
            message.success('保存成功！')
            this.props.hideModal()
        }

    }
    onCancel = () => {
        this.props.hideModal()
    }

    render() {
        return (
            <Form
                {...layout}
                ref={this.formRef}
                name="baseEdit"
                onFinish={this.onFinish}
            >
                <Form.Item
                    label="编号"
                    name="id"
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    label="竞赛名称"
                    name="name"
                    rules={[{ required: true, message: '固定竞赛名称不能为空!' }]}
                >
                    <Input placeholder='请输入固定竞赛名称' />
                </Form.Item>

                <Form.Item
                    label="竞赛类型"
                    name="type"
                    rules={[{ required: true, message: '竞赛类型必须选择!' }]}
                >
                    <Select style={{ width: 120 }}>
                        {
                            this.state.typeList.map(item => <Option value={item.Id} key={item.Id}>{item.Name}</Option>)
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label="排序号"
                    name="sortid"
                    rules={[{ required: true, message: '排序号不能为空!' }]}
                >
                    <Input placeholder='请输入排序号' />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            {this.props.record.id ? '修改' : '创建'}
                        </Button>
                        <Button type="primary" onClick={this.props.hideModal}>
                            取消
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        )
    }
}
