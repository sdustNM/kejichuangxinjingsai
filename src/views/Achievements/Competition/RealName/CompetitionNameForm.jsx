import React, { Component } from 'react'
import { Form, Input, Button, Select, DatePicker, message, Modal } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import AchievementAppendixUpload from '../../AchievementAppendixUpload'
import { queryRealCompetitionByName, setRealCompetition } from '../../../../services/Achievements/competitionName';
const { Search } = Input;
const { Option } = Select

const layout = {
    labelCol: { span: 4, },
    wrapperCol: { span: 16, }
}
const tailLayout = {
    wrapperCol: { offset: 4, span: 16 }
}
export default class CompetitionNameForm extends Component {

    formRef = React.createRef();
    state = {
        isNameValid: false,
    }

    checkNameState = async () => {
        //alert(this.formRef.current.getFieldValue('applyName'))
        this.setState({ isNameValid: false })
        const realName = this.formRef.current.getFieldValue('realName')
        if (!realName || realName.trim() === '') {
            message.error('请先输入竞赛名称！')
            return
        }
        const res = await queryRealCompetitionByName({ realName })
        if (res.result) {
            this.setState({ isNameValid: true })
            message.success(res.message)
        }
    }
    //isNameValid = async applyName => await queryRealCompetitionByName({ applyName }).result

    onChangeBaseName = async value => {
        //console.log(this.props.baseNameList)
        const competitionType = this.props.baseNameList.find(item => item.Id === value).Type
        this.formRef.current.setFieldsValue({ competitionType })
    }

    save = async () => {
        try {
            const values = await this.formRef.current.validateFields();
            const params = {
                name: values.realName,
                type: values.competitionType,   //A,B,C类
                baseCompetitionid: values.baseCompetitionName,   //固定比赛
                sponsor: values.sponsors && values.sponsors.join(','),
                batch: values.year && values.year.format('YYYY'), //年份
                sessionNumber: values.session,  //届数
                comLevel: values.competitionLevel,
                //valid: null, //待审核
                approveUrl: values.support,
            }

            //console.log(values)
            //console.log(params)
            const res = await setRealCompetition(params)
            if (res.result) {
                Modal.success({
                    content: res.message
                });
                //message.success('申请成功，请等待管理员审核！')
                this.props.closeModal()
            }
            else {
                Modal.error({
                    content: res.message
                });
                //message.error('操作失败')
            }
        } catch { }
    }

    render() {
        const { isNameValid } = this.state
        return (

            <Form
                {...layout}
                name="competition"
                ref={this.formRef}
            //onFinish={this.onFinish}
            >
                <Form.Item
                    label="实际竞赛名称"
                    name="realName"
                    rules={[
                        {
                            required: true,
                            message: '实际竞赛名称不能为空!',
                        },
                    ]}
                >
                    <Search
                        placeholder="请输入申请竞赛名称并点击查询"
                        allowClear
                        enterButton="查询"
                        //size="large"
                        onSearch={this.checkNameState}
                    />
                </Form.Item>


                {isNameValid && (
                    <>
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
                                //showArrow={false}
                                onChange={this.onChangeBaseName}
                            >
                                {this.props.baseNameList.map(item => <Option key={item.Id} value={item.Id}>{item.Name}</Option>)}
                            </Select>
                        </Form.Item>

                        <Form.List
                            name="sponsors"
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
                                {this.props.typeList.map(item => <Option key={item.Id} value={item.Id}>{item.Name}</Option>)}
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
                                {this.props.levelList.map(item => <Option key={item.Id} value={item.Id}>{item.Name}</Option>)}
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
                            label="证明材料(jpg)"
                            name="support"
                            rules={[
                                {
                                    required: true,
                                    message: '至少上传一个竞赛证明材料!',
                                },
                            ]}
                        >
                            <AchievementAppendixUpload maxNum={3} maxSize={1} fileType='sys' />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" onClick={this.save}>提交申请</Button>
                        </Form.Item>

                    </>
                )}


            </Form>


        )
    }
}
