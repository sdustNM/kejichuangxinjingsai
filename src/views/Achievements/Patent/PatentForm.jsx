import React, { Component } from 'react'
import { Card, Form, Radio, Input, Button, DatePicker, Space, message, Descriptions } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import moment from "moment"
import { getUserID, getUserName } from "../../../utils/auth"
import SelectManComplete from '../../../components/SelectAllManComplete'
import AchievementAppendixUpload from '../AchievementAppendixUpload'

import { setPatentByID, getPatentByID } from '../../../services/Achievements'

const { TextArea } = Input

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
class PatentForm extends Component {
    constructor(...props) {
        super(...props)
        this.state = {
            id: props[0].location.state && props[0].location.state.id,
            type: '',
            userID: getUserID(),
            userName: getUserName(),
            yuanReview: '',
            xiaoReview: '',
            fileList: null,
            stateBz:''
        }
        this.formRef = React.createRef();
    }

    async componentDidMount() {
        const { id } = this.state
        let fileList = []
        let yuanReview = ''
        let xiaoReview = ''
        let stateBz = ''
        if (id) {
            const res = await getPatentByID({ id })
            //console.log(res)
            if (res.result) {
                const item = JSON.parse(res.data)
                console.log(item)
                item.paperAppendix && (fileList = item.paperAppendix)


                this.formRef.current.setFieldsValue({
                    patentName: item.专利名称,
                    patentNo: item.专利申请号,
                    patentType: item.专利类型,
                    patentee: item.专利权人,
                    mobile: item.联系方式,
                    others: !item.其他发明人 ? [undefined] : item.其他发明人.split(','),
                    applicationDate: !item.申请时间 ? null : moment(item.申请时间, 'YYYY-MM-DD'),
                    publicDate: !item.授权公告日期 ? null : moment(item.授权公告日期, 'YYYY-MM-DD'),
                    photo: this.getAppendixUrls(fileList),
                    remark: item.备注
                })
                stateBz = item.状态备注
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
            fileList,
            yuanReview,
            xiaoReview,
            stateBz
        })
    }

    getAppendixUrls = list => {
        return list.reduce((pre, item) => {
            return pre ? pre + ',' + item.url : item.url
        }, null)
    }

    onFinish = async values => {
        console.log(values)
        await this.save(values, 1)
    }

    submit = async () => {
        try {
            const values = await this.formRef.current.validateFields();
            //console.log('Success:', values);
            await this.save(values, 0)
          } catch (errorInfo) {
            //console.log('Failed:', errorInfo);
            alert(`保存失败,请认真核对所填信息:${errorInfo.errorFields[0].errors[0]}`)
          }
    }

    save = async (values, flag) => {
        const { id, userID } = this.state
        const params = {
            id,
            sno: userID,
            "专利名称": values.patentName,
            "专利权人": values.patentee,
            "专利类型": values.patentType,
            "联系方式": values.mobile,
            "身份证号": values.sfzh,
            "银行卡号": values.yhkh,
            "开户行": values.khh,
            "其他发明人": values.others && values.others.map(x => x.type + ":" + x.value).join(','),
            "申请时间": values.applicationDate && values.applicationDate.format('YYYY-MM-DD'),
            "专利申请号": values.patentNo,
            "授权公告日期": values.publicDate && values.publicDate.format('YYYY-MM-DD'),
            "专利证书照片url": values.photo,
            "备注": values.remark,
            state: flag
        }

        console.log(values)
        console.log(params)
        const res = await setPatentByID(params)
        if (res.result) {
            message.success('操作成功')
            this.props.history.replace({ pathname: '/student/reviewList' })
        }
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


    render() {
        const { id, type, userID, userName, fileList, yuanReview, xiaoReview, stateBz } = this.state
        const title = (
            <Space direction="vertical">
                <h2>
                    <strong>专利成果申报</strong>
                </h2>
                {(id && stateBz) && (
                    <Descriptions title={<span style={{color:'red'}}>{stateBz}</span>} style={{ width: '100%' }} size='small' column={3} bordered >
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
                    name="patent"
                    ref={this.formRef}
                    onFinish={this.onFinish}
                >

                    <Form.Item
                        label="专利名称"
                        name="patentName"
                        rules={[
                            {
                                required: true,
                                message: '专利名称不能为空!',
                            },
                        ]}
                    >
                        <Input placeholder='与专利证书完全一致' />
                    </Form.Item>
                    <Form.Item
                        label="专利申请号"
                        name="patentNo"
                        rules={[
                            {
                                required: true,
                                message: '专利申请号不能为空!',
                            },
                        ]}
                    >
                        <Input placeholder='与专利证书完全一致' />
                    </Form.Item>
                    <Form.Item
                        label="专利形式"
                        name="patentType"
                        rules={[
                            {
                                required: true,
                                message: '请选择专利形式!',
                            },
                        ]}
                    >
                        <Radio.Group
                            onChange={e => this.setState({ type: e.target.value })}
                            value={type}
                            buttonStyle='solid'
                        >
                            <Radio.Button value='发明'>发明</Radio.Button>
                            <Radio.Button value='实用新型'>实用新型</Radio.Button>
                            <Radio.Button value='外观设计'>外观设计</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="专利权人"
                        name="patentee"
                        rules={[
                            {
                                required: true,
                                message: '专利权人不能为空!',
                            },
                        ]}
                    >
                        <Input placeholder='山东科技大学或其它单位、个人' />
                    </Form.Item>
                    <Form.Item
                        label="第一发明人"
                        name="inventor"
                        initialValue={`${userName}(${userID})`}
                        rules={[
                            {
                                required: true,
                                message: '第一发明人不能为空!',
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
                    {
                        type === '发明' && (
                            <>
                                <Form.Item
                                    label="身份证号"
                                    name="sfzh"
                                    rules={[
                                        {
                                            required: true,
                                            message: '身份证号不能为空!',
                                        },
                                    ]}
                                >
                                    <Input placeholder='请输入身份证号' style={{ width: 400 }} />
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
                                    <Input placeholder='请输入银行卡号' style={{ width: 400 }} />
                                </Form.Item>
                                <Form.Item
                                    label="开户行"
                                    name="khh"
                                    rules={[
                                        {
                                            required: true,
                                            message: '银行开户行不能为空!',
                                        },
                                    ]}
                                >
                                    <Input placeholder='请输入银行开户行' style={{ width: 400 }} />
                                </Form.Item>
                            </>
                        )
                    }
                    <Form.List name="others">
                        {(fields, { add, remove }) => {
                            //console.log(fields)
                            return (
                                <div>
                                    {fields.map((field, index) => (
                                        <Form.Item
                                            {...(index === 0 ? layout : tailLayout)}
                                            label={index === 0 ? '其他发明人' : ''}
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
                                            <span><PlusOutlined /> 添加其他发明人</span>
                                        </Button>
                                    </Form.Item>
                                </div>
                            );
                        }}
                    </Form.List>
                    <Form.Item
                        label="申请时间"
                        name="applicationDate"
                        rules={[
                            {
                                required: true,
                                message: '申请时间不能为空!',
                            },
                        ]}
                    >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item
                        label="授权公告时间"
                        name="publicDate"
                        rules={[
                            {
                                required: true,
                                message: '授权公告时间不能为空!',
                            },
                        ]}
                    >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item
                        label="专利证书照片"
                        name="photo"
                        rules={[
                            {
                                required: true,
                                message: '请上传专利证书照片!',
                            },
                        ]}
                    >
                        {fileList ? <AchievementAppendixUpload appendixList={fileList} maxNum={1} maxSize={3} fileType='patent' /> : <></>}
                    </Form.Item>
                    <Form.Item
                        label="备注"
                        name="remark"
                    >
                        <TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Space>
                            <Button type="primary" onClick={this.submit}>保存</Button>
                            <Button type="primary" htmlType="submit">保存并提交</Button>
                            {/*  */}
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default PatentForm
