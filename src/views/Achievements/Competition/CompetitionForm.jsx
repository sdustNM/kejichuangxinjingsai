import React, { Component } from 'react'
import { Card, Form, Input, Button, Select, DatePicker, Space, message, Descriptions, Tag } from 'antd';
import { ConsoleSqlOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import moment from "moment"
import { getUserID, getUserName } from "../../../utils/auth"
import AchievementAppendixUpload from '../AchievementAppendixUpload'

import { setCompetitionByID, getCompetitionByID, getDDInfo } from '../../../services/Achievements'
import SelectAllManComplete from '../../../components/SelectAllManComplete';
import { template } from '@babel/core';

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
            userID: getUserID(),
            userName: getUserName(),
            competitionLevelList: [],
            competitionTypeList: [],
            competitionTypeName: {},
            competitionNameList: [],
            rewardLevelList: [],
            item: {},
            isDXJ: false
        }
        this.formRef = React.createRef();
    }


    componentDidMount() {
        this.initForm()
    }

    initForm = async () => {
        const { id } = this.state
        let item = {}

        let competitionLevelList = []
        let competitionTypeList = []
        let rewardLevelList = []
        let competitionTypeName = {}
        let competitionNameList = []

        if (id) {
            const res = await getCompetitionByID({ id })
            //console.log(res)
            if (res.result) {
                item = JSON.parse(res.data)
            }
        }

        const dd = await getDDInfo()
        if (dd.result) {
            const data = JSON.parse(dd.data)
            let competitionName = {}
            data.ddType.map(type => {
                competitionName[type.Id] = data.ddList.filter(name => name.Type === type.Id)
            })
            competitionTypeName = competitionName
            competitionLevelList = data.ddLevel
            competitionTypeList = data.ddType
            rewardLevelList = data.ddRewardLevel
            if (item && item.类别) {
                competitionNameList = competitionName[item.类别]
            }
        }

        this.setState({
            competitionLevelList,
            competitionTypeList,
            rewardLevelList,
            competitionTypeName,
            competitionNameList,
            item,
            isDXJ: item.类别 === '单项奖' 
        }, this.setFormValue)
    }

    setFormValue = () => {
        const { item } = this.state
        if (item) {
            console.log(this.state)
            this.formRef.current.setFieldsValue({
                competitionLevel: item.等级,
                competitionType: item.类别,
                competitionName: item.竞赛名称,
                group: item.组别,
                rewardLevel: item.获奖等级,
                dxjName: item.单项奖名称,
                zbdw: item.主办单位 && item.主办单位.split(','),
                yearMonth: item.获奖时间 ? moment(item.获奖时间, 'YYYY.MM') : null,
                works: item.作品名称,
                mobile: item.联系方式,
                yhkh: item.银行卡号,
                sfzh: item.身份证号,
                others: !item.成员列表 ? [''] : item.成员列表.split(','),
                teacher: item.第一指导教师,
                otherTeachers: !item.其他指导教师 ? [''] : item.其他指导教师.split(','),
                certificateNo: item.证书编号,
                certificate: this.getAppendixUrls(item.certificateAppendix),
                evidence: this.getAppendixUrls(item.evidenceListAppendix),
                remark: item.备注
            })
        }

    }


    getAppendixUrls = list => {
        return list && list.reduce((pre, item) => {
            return pre ? pre + ',' + item.url : item.url
        }, null)
    }

    onFinish = async values => {
        console.log(values)
        await this.save(values, 1)
    }

    save = async (values, flag) => {
        const { id, userID } = this.state
        console.log(values.others)
        const params = {
            id,
            sno: userID,
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
            "第一指导教师": values.teacher && (values.teacher.type + ":" + values.teacher.value),
            "其他指导教师": values.otherTeachers && values.otherTeachers.map(x => x.type + ":" + x.value).join(','),
            "证书编号": values.certificateNo,
            "证书扫描件url": values.certificate,
            "证明材料url": values.evidence,
            "备注": values.remark,
            state: flag
        }

        console.log(params)
        const res = await setCompetitionByID(params)
        if (res.result) {
            message.success('操作成功')
            this.props.history.replace({ pathname: '/student/ReviewList' })
        }
    }

    checkCooperators = (rule, value) => {
        if (value !== undefined && value.value !== "") {
            //value:{type: x;value: x;selectedValue: x}
            //console.log(value);
            if (value.type == 0 && value.selectedValue == undefined) return Promise.reject("校内人员必须从下拉框中区配！");
            return Promise.resolve();
        }
        return Promise.reject("请选择参与人!");
    };

    changeType = async value => {
        console.log(value)
        this.setState({ competitionNameList: this.state.competitionTypeName[value] }, () => {
            this.formRef.current.setFieldsValue({ competitionName: '' })
        })
    }

    changeCompetitionName=value=>{
        this.setState({ 
            competitionName: this.state.competitionNameList[value],
            competitionNameId:value
        })
        
    }

    changeRewardLevel = async value => {
        this.setState({
            isDXJ: value === '单项奖'
        })
    }

    handleSearch = value => {

        // r = data.map(item => {
        //     return {
        //       value: item.id,
        //       label: (<div
        //         style={{
        //           display: 'flex',
        //           justifyContent: 'space-between',
        //         }}
        //       >
        //         <span>{item.id}</span>
        //         <span>{item.name}</span>
        //         <span>{item.department}</span>
        //       </div>)
        //     }

        //   })
    
      };

    
    render() {
        const { id, userID, userName, isDXJ,
            competitionLevelList, competitionTypeList, competitionNameList, rewardLevelList, item } = this.state
        //console.log(competitionLevelList, competitionTypeList, competitionNameList, rewardLevelList)
        const title = (
            <Space direction="vertical">
                <h2>
                    <strong>竞赛成果申报</strong>
                </h2>
                {id && (
                    <Descriptions style={{ width: '100%' }} size='small' column={3} bordered >
                        <Descriptions.Item label='学院意见' span={3}>{item.学院意见}</Descriptions.Item>
                        <Descriptions.Item label='学校意见' span={3}>{item.学校意见}</Descriptions.Item>
                    </Descriptions>)
                }
            </Space>
        )

        return (
            <Card title={title}>
                <Form
                    {...layout}
                    name="thesis"
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
                                    if (!depts) {
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
                        label="负责人"
                        name="head"
                        initialValue={`${userName}(${userID})`}
                        rules={[
                            {
                                required: true,
                                message: '负责人不能为空!',
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
                    // rules={[
                    //     {
                    //         required: true,
                    //         message: '第一指导教师不能为空!',
                    //     },
                    // ]}
                    >
                        <SelectAllManComplete />
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
                        name="certificate"
                        rules={[
                            {
                                required: true,
                                message: '至少上传一个获奖证书图片!',
                            },
                        ]}
                    >
                        {item.certificateAppendix ? <AchievementAppendixUpload appendixList={item.certificateAppendix} maxNum={1} maxSize={1} fileType='competition' /> : <></>}
                    </Form.Item>
                    <Form.Item
                        label="相关证明材料(jpg)"
                        name="evidence"
                    >
                        {item.evidenceAppendix ? <AchievementAppendixUpload appendixList={item.evidenceAppendix} maxSize={1} fileType='competition' /> : <></>}
                    </Form.Item>
                    <Form.Item
                        label="备注"
                        name="remark"
                    >
                        <TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Space>
                            <Button type="primary" htmlType="submit">保存并提交</Button>
                            {/* <Button type="primary" onClick={this.submit}>保存并提交</Button> */}
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default CompetitionForm