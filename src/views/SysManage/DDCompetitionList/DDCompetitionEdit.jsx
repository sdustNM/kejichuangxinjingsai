import React from 'react'
import { Form, Input, Button, Space, message, Select } from 'antd'
import { getDDCompetitionById, setDDCompetitionById, getTypeList } from '../../../services/Achievements/ddOperation'
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const { Option } = Select;

class DDCompetitionEdit extends React.Component {

    state = {
        readonly: { readOnly: false },
        typeList: [],
    }
    formRef = React.createRef();
    componentDidMount() {
        console.log(this.props)

        getTypeList().then(res => {
            if (res.result) {
                let typeList = JSON.parse(res.data)
                this.setState({ typeList })
            }
        });

        const { id } = this.props
        if (id) {
            getDDCompetitionById({ "id": id }).then(res => {
                if (res.result) {
                    let item = JSON.parse(res.data)
                    console.log(item)
                    this.formRef.current.setFieldsValue({
                        id: item.Id,
                        name: item.Name,
                        type: item.Type,
                        sortid: item.Sortid ? item.Sortid : item.Id,
                    });

                }
            })
            this.setState({
                readonly: { readOnly: true }
            })

        }
    }

    handleSelectChange = value => {
        // selectedType=value
    }

    onFinish = value => {
        //console.log(value)
        //const { id } = this.props
        let competition = {
            name: value.name,
            id: value.id,
            type: value.type,
            sortid: value.sortid,
        }
        console.log("update:", competition)
        setDDCompetitionById(competition).then(res => {
            if (res.result) {
                message.success('修改成功！')
                this.props.hideModal()
            }
        })
    }

    render() {
        const { readonly, typeList } = this.state
        return (
            <Form
                {...layout}
                ref={this.formRef}
                name="control-ref"
                onFinish={this.onFinish}
            >
                <Form.Item
                    label="编号"
                    name="id"
                >
                    <Input  {...readonly} placeholder='id不填写时，系统会自动生成' />
                </Form.Item>

                <Form.Item
                    label="名称"
                    name="name"
                    rules={[{ required: true, message: '名称不能为空!' }]}
                >
                    <Input placeholder='请输入名称' />
                </Form.Item>

                <Form.Item
                    label="类型"
                    name="type"
                >
                    <Select style={{ width: 120 }} onChange={this.handleSelectChange}>
                        {
                            typeList.map(item => (<Option value={item.id} key={item.Id}>{item.Name}</Option>))

                        }

                    </Select>

                </Form.Item>
                <Form.Item
                    label="排序号"
                    name="sortid"
                    rules={[{ required: true, message: '排序号!' }]}
                >
                    <Input placeholder='请输入排序号' />
                </Form.Item>


                <Form.Item {...tailLayout}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            {!this.props.id ? '创建' : '修改'}
                        </Button>
                        <Button type="primary" onClick={() => this.props.hideModal()}>
                            取消
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        )
    }
}

export default DDCompetitionEdit