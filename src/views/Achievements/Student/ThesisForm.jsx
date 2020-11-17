import React, { Component } from 'react'
import { Card, Form, Input, Button, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

import { getUserID, getUserName } from "../../../utils/auth"
import SelectManComplete from '../../../components/SelectAllManComplete';

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
    state = {
        id: getUserID(),
        name: getUserName()
    }
    formRef = React.createRef();

    onFinish = values => {
        console.log(values)
    }

    checkCooperators = (rule, value) => {
        if (value !==undefined && value.value !=="" ) {
          return Promise.resolve();
        }
    
        return Promise.reject("请选择参与人!");
      };

    render() {
        const { id, name } = this.state
        console.log(id, name)
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
                        label="发表时间及期号"
                        name="publishTime"
                        rules={[
                            {
                                required: true,
                                message: '发表时间及期号不能为空!',
                            },
                        ]}
                    >
                        <Input placeholder='示例：2020年01期' />
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
                        initialValue={`${name}(${id})`}
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
                                                        validator:this.checkCooperators
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
