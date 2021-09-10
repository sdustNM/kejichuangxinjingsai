import React, { Component } from 'react'
import { Card, Form, Input, Button, Select, DatePicker, Space, message, Descriptions, Modal } from 'antd';
import { ConsoleSqlOutlined, DoubleLeftOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import moment from "moment"
import { getUserID, getUserName, isStudent } from "../../../utils/auth"
import AchievementAppendixUpload from '../AchievementAppendixUpload'

import { setCompetitionByID, getCompetitionByID, getDDInfo, getRealCompetitionNameList } from '../../../services/Achievements'
import SelectAllManComplete from '../../../components/SelectAllManComplete';
import CompetitionNameForm from './RealName/CompetitionNameForm';
///import { template } from '@babel/core';

const { Option } = Select
const { TextArea } = Input

const layout = {
    labelCol: { span: 4, },
    wrapperCol: { span: 16, }
}
const tailLayout = {
    wrapperCol: { offset: 4, span: 16 }
}


class CompetitionForm extends Component {
    constructor(...props) {
        super(...props)
        this.state = {
            id: props[0].location.state && props[0].location.state.id,
            baseCompetitionNameList: [],
            realCompetitionNameList: [],
            competitionLevelList: [],
            competitionTypeList: [],
            noCompetitionName: true,
            competitionType: '',
            competitionLevel: '',
            rewardLevelList: [],
            competition: {},
            isDXJ: false, //是否单项奖
            rewardList: null,
            supportList: null,
            noticeList: null,
            clickDisabled: false,
            isStudent: isStudent(),
            isModalVisible: false //实际比赛名称申请模态框显示状态
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

        let competitionLevel = ''
        let competitionType = ''
        let competitionLevelList = []
        let competitionTypeList = []
        let rewardLevelList = []
        let baseCompetitionNameList = []
        let realCompetitionNameList = []

        const dd = await getDDInfo()
        if (dd.result) {
            const data = JSON.parse(dd.data)
            //console.log(data)

            competitionLevelList = data.ddLevel
            competitionTypeList = data.ddType
            rewardLevelList = data.ddRewardLevel
            baseCompetitionNameList = data.ddList
        }

        //编辑时，获取待编辑竞赛信息
        if (id) {
            const res = await getCompetitionByID({ id })
            if (res.result) {
                competition = JSON.parse(res.data)
                console.log(competition)
                competition.rewardAppendix && (rewardList = competition.rewardAppendix)
                competition.supportAppendix && (supportList = competition.supportAppendix)
                competition.rewardNoticeAppendix && (noticeList = competition.rewardNoticeAppendix)
                realCompetitionNameList = await this.getNameList(competition.固定竞赛id)
                competitionLevel = competition.等级
                competitionType = competition.类别
            }

        }

        this.setState({
            noCompetitionName: !competition.竞赛名称id,
            competitionLevel,
            competitionType,
            competitionLevelList,
            competitionTypeList,
            rewardLevelList,
            baseCompetitionNameList,
            realCompetitionNameList,
            competition,
            isDXJ: competition.获奖等级 === '单项奖',
            rewardList,
            supportList,
            noticeList
        }, this.setFormValue)
    }

    setFormValue = () => {

        const { id, competition, rewardList, supportList, noticeList, competitionType, competitionLevel } = this.state
        //console.log(rewardList, this.getAppendixUrls(rewardList))
        //console.log(this.state.realCompetitionNameList)
        if (id) {
            this.formRef.current.setFieldsValue({
                competitionLevel: this.getLevel(competitionLevel),
                competitionType: this.getType(competitionType),
                baseCompetitionName: competition.固定竞赛id,
                realCompetitionName: competition.竞赛名称id,
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
        //console.log(list)
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
            //"等级": competitionLevel,
            //"类别": competitionType,
            "竞赛id": values.realCompetitionName,
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

        //console.log(values)
        //console.log(params)
        const res = await setCompetitionByID(params)
        if (res.result) {
            message.success('操作成功')
            this.back()
        }
        else {
            message.error('操作失败')
            this.setState({ clickDisabled: false })
        }

    }

    back = () => {
        if (this.state.isStudent) {
            this.props.history.replace({ pathname: '/student/ReviewList' })
        } else {
            this.props.history.go(-1)
        }
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

    onChangeBaseName = async value => {
        //const res = await getRealCompetitionNameList({ baseId: value })
        const realCompetitionNameList = await this.getNameList(value)
        if (realCompetitionNameList) {
            this.formRef.current.setFieldsValue({ realCompetitionName: '' })
            this.setState({ realCompetitionNameList, noCompetitionName: true })
        }
    }
    getNameList = async value => {
        const res = await getRealCompetitionNameList({ baseId: value })
        if (res.result) {
            return JSON.parse(res.data).sort((a, b) => b.sortid - a.sortid) //按sortid逆序排列
        }
    }
    onChangeRealName = value => {
        const realCompetition = this.state.realCompetitionNameList.find(item => item.Id === value)
        console.log(realCompetition)
        if (realCompetition) {
            this.setState({
                noCompetitionName: false,
                competitionLevel: this.getLevel(realCompetition.ComLevel),
                competitionType: this.getType(realCompetition.Type)
            })
        }
        else {
            this.setState({
                noCompetitionName: true
            })
        }

    }

    getLevel = id => {
        const level = this.state.competitionLevelList.find(item => item.Id === id)
        return level ? level.Name : ''
    }
    getType = id => {
        const type = this.state.competitionTypeList.find(item => item.Id === id)
        return type ? type.Name : ''
    }

    changeRewardLevel = async value => {
        this.setState({
            isDXJ: value === '单项奖'
        })
    }

    applyCompetitionName = () => {
        this.setState({
            isModalVisible: true
        })
    }
    handleClose = () => {
        this.setState({
            isModalVisible: false
        })
    }

    render() {
        const { id, isModalVisible, isDXJ, competitionLevel, competitionType,
            noCompetitionName, baseCompetitionNameList, realCompetitionNameList,
            competitionLevelList, competitionTypeList, rewardLevelList, competition,
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
            <>
                <Card title={title} extra={extra}>
                    <Form
                        {...layout}
                        name="competition"
                        ref={this.formRef}
                        onFinish={this.onFinish}
                    >
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
                                {baseCompetitionNameList.map(item => <Option key={item.Id} value={item.Id}>{item.Name}</Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="实际竞赛名称"
                            name="realCompetitionName"
                            rules={[
                                {
                                    required: true,
                                    message: '实际竞赛名称必须选择!',
                                },
                            ]}>
                            <Select onChange={this.onChangeRealName} >
                                <Option key='0' value=''>没有找到比赛名称</Option>
                                {realCompetitionNameList.map(item => <Option key={item.Id} value={item.Id}>{item.Name}</Option>)}
                            </Select>
                        </Form.Item>
                        {noCompetitionName ?
                            <Form.Item {...tailLayout}>
                                <Button type="link" onClick={this.applyCompetitionName} >点击申请实际竞赛名称</Button>
                            </Form.Item>
                            :
                            <Form.Item label="竞赛等级、类别">
                                <Input.Group>
                                    <Input style={{ width: 100 }} readOnly value={competitionLevel} />
                                    <Input style={{ width: 100 }} readOnly value={competitionType} />
                                </Input.Group>
                            </Form.Item>
                        }
                        <Form.Item
                            label="所在组别"
                            name="group"
                            rules={[
                                {
                                    required: true,
                                    message: '所在组别不能为空!',
                                },
                            ]}
                        >
                            <Input placeholder='请输入竞赛组别' />
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
                            rules={[
                                {
                                    required: true,
                                    message: '作品名称不能为空!',
                                },
                            ]}
                        >
                            <Input placeholder='请输入作品名称' />
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
                            label="证书编号或有效网址"
                            name="certificateNo"
                            rules={[
                                {
                                    required: true,
                                    message: '证书编号或有效网址不能为空!',
                                },
                            ]}
                        >
                            <Input placeholder='请输入证书编号或有效网址' />
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
                <Modal
                    width={800}
                    title="实际比赛名称申请"
                    visible={isModalVisible}
                    maskClosable={false}
                    //destroyOnClose={true}
                    onCancel={this.handleClose}
                    footer={null}
                >
                    <CompetitionNameForm
                        baseNameList={baseCompetitionNameList}
                        levelList={competitionLevelList}
                        typeList={competitionTypeList}
                        closeModal={this.handleClose}
                    />
                </Modal>
            </>
        )
    }
}

export default CompetitionForm
