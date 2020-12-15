import React, { Component } from 'react'
import { Card, Form, Input, Button, Select, DatePicker, Space, message, Descriptions, Tag } from 'antd';
import { DoubleLeftOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import moment from "moment"
import { getUserID, getUserName, isStudent } from "../../../utils/auth"
import AchievementAppendixUpload from '../AchievementAppendixUpload'

import { setCompetitionByID, getCompetitionByID, getDDInfo } from '../../../services/Achievements'
import SelectAllManComplete from '../../../components/SelectAllManComplete';
///import { template } from '@babel/core';

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


class CompetitionForm extends Component {
    constructor(...props) {
        super(...props)
        this.state = {
            id: props[0].location.state && props[0].location.state.id,
            competitionLevelList: [],
            competitionTypeList: [],
            competitionTypeName: {},
            competitionNameList: [],
            rewardLevelList: [],
            competition: {},
            isDXJ: false,
            rewardList: null,
            supportList: null,
            noticeList: null,
            clickDisabled: false,
            isStudent: isStudent()
        }
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.initForm()
    }

    initForm = async () => {
        const { id } = this.state
        let competition = {}
        let rewardList = []
        let supportList = []
        let noticeList = []

        let competitionLevelList = []
        let competitionTypeList = []
        let rewardLevelList = []
        let competitionTypeName = {}
        let competitionNameList = []

        if (id) {
            const res = await getCompetitionByID({ id })
            if (res.result) {
                competition = JSON.parse(res.data)
                competition.rewardAppendix && (rewardList = competition.rewardAppendix)
                competition.supportAppendix && (supportList = competition.supportAppendix)
                competition.rewardNoticeAppendix && (noticeList = competition.rewardNoticeAppendix)
            }
        }

        const dd = await getDDInfo()
        if (dd.result) {
            const data = JSON.parse(dd.data)
            let competitionName = {}
            data.ddType.map(type => {
                competitionName[type.Id] = data.ddList.filter(name => name.Type === type.Name)
            })
            competitionTypeName = competitionName
            competitionLevelList = data.ddLevel
            competitionTypeList = data.ddType
            rewardLevelList = data.ddRewardLevel
            if (competition && competition.类别) {
                competitionNameList = competitionName[competition.类别]
            }
        }

        this.setState({
            competitionLevelList,
            competitionTypeList,
            rewardLevelList,
            competitionTypeName,
            competitionNameList,
            competition,
            isDXJ: competition.获奖等级 === '单项奖',
            rewardList,
            supportList,
            noticeList
        }, this.setFormValue)
    }

    setFormValue = () => {

        const { id, competition, rewardList, supportList, noticeList } = this.state
        //console.log(rewardList, this.getAppendixUrls(rewardList))
        if (id) {
            this.formRef.current.setFieldsValue({
                competitionLevel: competition.等级,
                competitionType: competition.类别,
                competitionName: competition.竞赛名称id,
                group: competition.组别,
                rewardLevel: competition.获奖等级,
                dxjName: competition.单项奖名称,
                zbdw: competition.主办单位 && competition.主办单位.split(','),
                yearMonth: competition.获奖时间 ? moment(competition.获奖时间, 'YYYY.MM') : null,
                works: competition.作品名称,
                studentName: competition.学生姓名,
                studentNo: competition.学号,
                mobile: competition.联系方式,
                yhkh: competition.银行卡号,
                sfzh: competition.身份证号,
                others: competition.成员列表id && competition.成员列表id.split(','),
                teacher: competition.第一指导教师id,
                otherTeachers: competition.其他指导教师id && competition.其他指导教师id.split(','),
                certificateNo: competition.证书编号,
                reward: this.getAppendixUrls(rewardList),
                support: this.getAppendixUrls(supportList),
                notice: this.getAppendixUrls(noticeList),
                remark: competition.备注
            })
        }
        else {
            this.formRef.current.setFieldsValue({
                others: [undefined],
                otherTeachers: [undefined],
                studentName: getUserName(),
                studentNo: getUserID(),
            })
        }

    }


    getAppendixUrls = list => {
        console.log(list)
        return list.reduce((pre, competition) => {
            return pre ? pre + ',' + competition.rawUrl : competition.rawUrl
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
            await this.save(values, this.state.competition.State)
        } catch (errorInfo) {
            alert(`保存失败,请认真核对所填信息:${errorInfo.errorFields[0].errors[0]}`)
            this.setState({ clickDisabled: false })
        }
    }

    save = async (values, flag) => {
        const { id } = this.state
        const params = {
            id,
            sno: values.studentNo,
            "等级": values.competitionLevel,
            "类别": values.competitionType,
            "竞赛名称": values.competitionName,
            "获奖等级": values.rewardLevel,
            "组别": values.group,
            "单项奖名称": values.dxjName,
            "主办单位": values.zbdw && values.zbdw.join(','),
            "获奖时间year": values.yearMonth && values.yearMonth.format('YYYY'),
            "获奖时间month": values.yearMonth && values.yearMonth.format('MM'),
            "作品名称": values.works,
            "联系方式": values.mobile,
            "银行卡号": values.yhkh,
            "身份证号": values.sfzh,
            "成员列表": values.others && values.others.map(x => x.type + ":" + x.value).join(','),
            "第一指导教师": values.teacher && values.teacher.type && (values.teacher.type + ":" + values.teacher.value),
            "其他指导教师": values.otherTeachers && values.otherTeachers.map(x => x.type + ":" + x.value).join(','),
            "证书编号": values.certificateNo,
            "获奖证书url": values.reward,
            "指导教师证书url": values.support,
            "获奖通知url": values.notice,
            "备注": values.remark,
            state: flag
        }

        console.log(params)
        const res = await setCompetitionByID(params)
        if (res.result) {
            message.success('操作成功')
            this.back()
        }
        this.setState({ clickDisabled: false })
    }

    back = () => {
        if (this.state.isStudent) {
            this.props.history.replace({ pathname: '/student/ReviewList' })
        } else {
            this.props.history.go(-1)
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

    changeType = async value => {
        this.setState({ competitionNameList: this.state.competitionTypeName[value] }, () => {
            this.formRef.current.setFieldsValue({ competitionName: '' })
        })
    }

    changeCompetitionName = value => {
        this.setState({
            competitionName: this.state.competitionNameList[value],
            competitionNameId: value
        })

    }

    changeRewardLevel = async value => {
        this.setState({
            isDXJ: value === '单项奖'
        })
    }

    render() {
        const { id, userID, userName, isDXJ,
            competitionLevelList, competitionTypeList, competitionNameList, rewardLevelList, competition,
            rewardList, supportList, noticeList, clickDisabled } = this.state
        const title = (
            <Space direction="vertical">
                <h2>
                    <strong>竞赛成果申报</strong>
                </h2>
                {id && (
                    <Descriptions title={<span style={{ color: 'red' }}>{competition.状态备注}</span>} style={{ width: '100%' }} size='small' column={3} bordered >
                        <Descriptions.Item label='学院意见' span={3}>{competition.学院意见}</Descriptions.Item>
                        <Descriptions.Item label='学校意见' span={3}>{competition.学校意见}</Descriptions.Item>
                    </Descriptions>)
                }
            </Space>
        )
        const extra = <Button onClick={this.back}><DoubleLeftOutlined />返回</Button>
        return (
            <Card title={title} extra={extra}>
                <Form
                    {...layout}
                    name="competition"
                    ref={this.formRef}
                    onFinish={this.onFinish}
                >
                    {/* 竞赛等级 */}
                    <Form.Item
                        label="竞赛等级"
                        name="competitionLevel"
                        rules={[
                            {
                                required: true,
                                message: '竞赛等级必须选择!',
                            },
                        ]}>
                        <Select style={{ width: 100 }}>
                            {competitionLevelList.map(item => <Option key={item.Id} value={item.Id}>{item.Name}</Option>)}
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
                        <Select style={{ width: 100 }} onChange={this.changeType} value={this.state.competitionTypeId}>
                            {competitionTypeList.map(item => <Option key={item.Id} value={item.Id}>{item.Name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="竞赛名称"
                        name="competitionName"
                        rules={[
                            {
                                required: true,
                                message: '竞赛名称必须选择!',
                            },
                        ]}>
                        <Select
                            showSearch
                            optionFilterProp='children'
                            showArrow={false}
                            onChange={this.changeName}
                        >
                            {competitionNameList.map(item => <Option key={item.Id} value={item.Id.toString()}>{item.Name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="所在组别"
                        name="group"
                    >
                        <Input placeholder='选填，没有可不填' />
                    </Form.Item>
                    <Form.Item
                        label="获奖等级"
                        name="rewardLevel"
                        rules={[
                            {
                                required: true,
                                message: '获奖等级必须选择!',
                            },
                        ]}>
                        <Select style={{ width: 100 }} onChange={this.changeRewardLevel}>
                            {rewardLevelList.map(item => <Option key={item.Id} value={item.Id}>{item.Name}</Option>)}
                        </Select>
                    </Form.Item>
                    {
                        isDXJ && (
                            <Form.Item
                                label="单项奖名称"
                                name="dxjName"
                                rules={[
                                    {
                                        required: true,
                                        message: '单项奖需填写奖项名称!',
                                    },
                                ]}>
                                <Input placeholder='如最佳创意奖、最佳作品奖等' />
                            </Form.Item>
                        )
                    }
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
                        label="作品名称"
                        name="works"
                    >
                        <Input placeholder='如果没有无需填写' />
                    </Form.Item>


                    <Form.Item
                        label="负责人姓名"
                        name="studentName"
                        rules={[
                            {
                                required: true,
                                message: '负责人姓名不能为空!',
                            },
                        ]}
                    >
                        <Input readOnly style={{ width: 200 }} />

                    </Form.Item >
                    <Form.Item
                        label="负责人学号"
                        name="studentNo"
                        rules={[
                            {
                                required: true,
                                message: '负责人学号不能为空!',
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
                    // rules={[
                    //     {
                    //         required: true,
                    //         message: '银行卡号不能为空!',
                    //     },
                    // ]}
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
                        <SelectAllManComplete initvalue={this.state.competition && this.state.competition.第一指导教师id} />
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
                        label="证书编号"
                        name="certificateNo"
                    >
                        <Input placeholder='与证书一致，无编号的证书无需填写' />
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
                        {rewardList ? <AchievementAppendixUpload appendixList={rewardList} maxNum={1} maxSize={1} fileType='competition' /> : <></>}
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
                        {noticeList ? <AchievementAppendixUpload appendixList={noticeList} maxSize={1} fileType='competition' /> : <></>}
                    </Form.Item>
                    <Form.Item
                        label="项目指导教师证书(jpg)"
                        name="support"
                    >
                        {supportList ? <AchievementAppendixUpload appendixList={supportList} maxSize={1} fileType='competition' /> : <></>}
                    </Form.Item>
                    <Form.Item
                        label="备注"
                        name="remark"
                    >
                        <TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        {this.state.isStudent ? (
                            <Space>
                                <Button type="primary" onClick={this.submit} disabled={clickDisabled}>保存</Button>
                                <Button type="primary" htmlType="submit" disabled={clickDisabled}>保存并提交</Button>
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

export default CompetitionForm
