import React, { Component } from 'react'
import { Card, Form, Input, Button, DatePicker, Space, message, Descriptions, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined, DoubleLeftOutlined } from '@ant-design/icons'
import moment from "moment"
import { getUserID, getUserName, isStudent } from "../../../utils/auth"
import SelectAllManComplete from '../../../components/SelectAllManComplete';
import AchievementAppendixUpload from '../AchievementAppendixUpload'

import { setOthersByID, getOthersByID } from '../../../services/Achievements'
import { isGameStart } from '../../../utils/gameState';

const { TextArea } = Input
const { Option } = Select

const layout = {
    labelCol: { span: 4 }, wrapperCol: { span: 16 }
}
const tailLayout = {
    wrapperCol: { offset: 4, span: 16 }
}

class OthersForm extends Component {
    formRef = React.createRef()
    state = {
        id: this.props.location.state && this.props.location.state.id,
        yuanReview: '',
        xiaoReview: '',
        stateBz: '',
        item: {},
        noticeList: null,
        rewardList: null,
        supportList: null,
        moreList: null,
        clickDisabled: false,
        state: 0,
        isStudent: isStudent(),
        IsValid : isGameStart()
    }

    async componentDidMount() {
        const { id } = this.state
        let item = {}
        let noticeList = []
        let rewardList = []
        let supportList = []
        let moreList = []
        let yuanReview = ''
        let xiaoReview = ''
        let stateBz = ''
        let state = 0
        if (id) {
            const res = await getOthersByID({ id })
            //console.log(res)
            if (res.result) {
                item = JSON.parse(res.data)
                console.log(item)
                item.rewardNoticeAppendix && (noticeList = item.rewardNoticeAppendix)
                item.rewardAppendix && (rewardList = item.rewardAppendix)
                item.moreAppendix && (moreList = item.moreAppendix)
                item.supportAppendix && (supportList = item.supportAppendix)
                stateBz = item.stateBz
                yuanReview = item.学院意见
                xiaoReview = item.学校意见
                state = item.State
            }
        }
        this.setState({
            item,
            noticeList,
            rewardList,
            supportList,
            moreList,
            yuanReview,
            xiaoReview,
            stateBz,
            state
        }, this.setFormValue)
    }

    setFormValue = () => {
        const { id, item, noticeList, rewardList, supportList, moreList } = this.state
        if (id) {
            this.formRef.current.setFieldsValue({
                honourName: item.荣誉名称,
                level: item.等级,
                type: item.类别,
                group: item.组别,
                zbdw: item.主办单位 && item.主办单位.split(','),
                yearMonth: item.获奖时间 ? moment(item.获奖时间, 'YYYY.MM') : null,
                studentName: item.学生姓名,
                studentNo: item.学号,
                mobile: item.联系方式,
                yhkh: item.银行卡号,
                sfzh: item.身份证号,
                others: item.成员列表id && item.成员列表id.split(','),
                teacher: item.第一指导教师id,
                otherTeachers: item.其他指导教师id && item.其他指导教师id.split(','),
                certificateNo: item.证书编号,
                reward: this.getAppendixUrls(rewardList),
                support: this.getAppendixUrls(supportList),
                notice: this.getAppendixUrls(noticeList),
                more: this.getAppendixUrls(moreList),
                remark: item.备注
            })

        } else {
            this.formRef.current.setFieldsValue({
                others: [undefined],
                studentName: getUserName(),
                studentNo: getUserID(),
            })
        }
    }

    getAppendixUrls = list => {
        return list.reduce((pre, item) => {
            return pre ? pre + ',' + item.rawUrl : item.rawUrl
        }, null)
    }

    onFinish = async values => {
        this.setState({ clickDisabled: true })
        await this.save(values, 1)
    }

    submit = async () => {
        try {
            this.setState({ clickDisabled: true })
            const values = await this.formRef.current.validateFields();
            await this.save(values, 0)
        } catch (errorInfo) {
            alert(`保存失败,请认真核对所填信息:${errorInfo.errorFields[0].errors[0]}`)
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
        const params = {
            id,
            sno: values.studentNo,
            荣誉名称: values.honourName,
            等级: values.level,
            类别: values.type,
            组别: values.group,
            主办单位: values.zbdw && values.zbdw.join(','),
            获奖时间year: values.yearMonth && values.yearMonth.format('YYYY'),
            获奖时间month: values.yearMonth && values.yearMonth.format('MM'),
            联系方式: values.mobile,
            银行卡号: values.yhkh,
            身份证号: values.sfzh,
            成员列表: values.others && values.others.map(x => x.type + ":" + x.value).join(','),
            第一指导教师: values.teacher && values.teacher.type && (values.teacher.type + ":" + values.teacher.value),
            其他指导教师: values.otherTeachers && values.otherTeachers.map(x => x.type + ":" + x.value).join(','),
            证书编号: values.certificateNo,
            获奖证书url: values.reward,
            获奖通知url: values.notice,
            其他证明材料url: values.more,
            指导教师证书url: values.support,
            备注: values.remark,
            state: flag
        }
        console.log(values)
        console.log(params)
        const res = await setOthersByID(params)
        if (res.result) {
            this.setState({ clickDisabled: false })
            message.success('操作成功')
            this.back()
        }

        //this.setState({ clickDisabled: false })
    }

    checkCooperators = (rule, value) => {
        //console.log("check:", value)
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
        const { id, item, noticeList, rewardList, supportList, moreList,
            yuanReview, xiaoReview, stateBz, clickDisabled,IsValid } = this.state
        console.log(item)
        const title = (
            <Space direction="vertical">
                <h2>
                    <strong>其他成果申报</strong>
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
                    name="others"
                    ref={this.formRef}
                    onFinish={this.onFinish}
                >
                    <Form.Item
                        label="荣誉名称"
                        name="honourName"
                        rules={[
                            {
                                required: true,
                                message: '荣誉名称不能为空!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="等级"
                        name="level"
                        rules={[
                            {
                                required: true,
                                message: '等级必须选择!',
                            },
                        ]}
                    >
                        <Select>
                            <Option key='国赛' value='国赛'>国赛</Option>
                            <Option key='省赛' value='省赛'>省赛</Option>
                            <Option key='市赛' value='市赛'>市赛</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="类别"
                        name="type"
                        rules={[
                            {
                                required: true,
                                message: '类别必须选择!',
                            },
                        ]}
                    >
                        <Select>
                            <Option key='个人荣誉称号' value='个人荣誉称号'>个人荣誉称号</Option>
                            <Option key='团体荣誉称号' value='团体荣誉称号'>团体荣誉称号</Option>
                            <Option key='其他' value='其他3'>其他</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="组别"
                        name="group"
                        rules={[
                            {
                                required: true,
                                message: '组别不能为空!',
                            },
                        ]}
                    >
                        <Input placeholder='请输入组别.没有请填“无”' />
                    </Form.Item>
                    <Form.List
                        name="zbdw"
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
                        label="获奖时间"
                        name="yearMonth"
                        rules={[
                            {
                                required: true,
                                message: '获奖时间不能为空!',
                            },
                        ]}
                    >
                        <DatePicker picker="month" />
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
                                            label={index === 0 ? '其他成员' : ''}
                                            required={false}
                                            key={field.key}
                                        >
                                            <Form.Item
                                                {...field}
                                                validateTrigger={['onChange', 'blur']}
                                                rules={[
                                                    {
                                                        validator: this.checkCooperators
                                                    },
                                                ]}
                                                noStyle
                                            >
                                                <SelectAllManComplete />
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
                                            <PlusOutlined /> <span>点击添加团队其他成员</span>
                                        </Button>
                                    </Form.Item>
                                </div>
                            );
                        }}
                    </Form.List>
                    <Form.Item
                        label="第一指导教师"
                        name="teacher"
                        validateTrigger={['onChange']}
                        rules={[
                            {
                                validator: this.checkCooperators
                            },
                        ]}
                    >
                        <SelectAllManComplete initvalue={item && item.第一指导教师id} />
                    </Form.Item>
                    <Form.List name="otherTeachers">
                        {(fields, { add, remove }) => {
                            //console.log(fields)
                            return (
                                <div>
                                    {fields.map((field, index) => (
                                        <Form.Item
                                            {...(index === 0 ? layout : tailLayout)}
                                            label={index === 0 ? '其他指导教师' : ''}
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
                                                <SelectAllManComplete />
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
                                            <PlusOutlined /> <span>点击添加其他指导教师</span>
                                        </Button>
                                    </Form.Item>
                                </div>
                            );
                        }}
                    </Form.List>
                    <Form.Item
                        label="证书编号或有效网址"
                        name="certificateNo"
                        rules={[
                            {
                                required: true,
                                message: '证书编号或有效网址不能为空!',
                            },
                        ]}
                    >
                        <Input placeholder='证书编号与证书一致或填入有效网址，没有请填“无”' />
                    </Form.Item>

                    <Form.Item
                        label="获奖通知(jpg)"
                        name="notice"
                        rules={[
                            {
                                required: true,
                                message: '至少上传一个盖有主办单位公章的通知图片!',
                            },
                        ]}
                    >
                        {noticeList ? <AchievementAppendixUpload appendixList={noticeList} maxSize={1} fileType='others' /> : <></>}
                    </Form.Item>
                    <Form.Item
                        label="获奖证书(jpg)"
                        name="reward"
                        rules={[
                            {
                                required: true,
                                message: '至少上传一个获奖证书图片!',
                            },
                        ]}
                    >
                        {rewardList ? <AchievementAppendixUpload appendixList={rewardList} maxNum={1} maxSize={1} fileType='others' /> : <></>}
                    </Form.Item>
                    <Form.Item
                        label="其他证明材料(jpg)"
                        name="more"
                    >
                        {moreList ? <AchievementAppendixUpload appendixList={moreList} maxSize={1} fileType='others' /> : <></>}
                    </Form.Item>
                    <Form.Item
                        label="指导教师证书(jpg)"
                        name="support"
                    >
                        {supportList ? <AchievementAppendixUpload appendixList={supportList} maxSize={1} fileType='others' /> : <></>}
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

export default OthersForm
