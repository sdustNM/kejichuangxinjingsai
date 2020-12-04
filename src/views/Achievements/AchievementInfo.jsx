import React, { Component } from 'react'
import { Button, Card, Space, Modal, Input, message } from 'antd'
import { DoubleLeftOutlined } from '@ant-design/icons'
import ThesisInfo from './Thesis/ThesisInfo';
import CompetitionInfo from './Competition/CompetitionInfo';
import PatentInfo from './Patent/PatentInfo';
import { getArticleByID, getCompetitionByID, getPatentByID} from '../../services/Achievements'
import { isAdminister, isSuperAdminister, isStudent } from '../../utils/auth';
import { setDepartmentReview, setSchoolReview } from '../../services/Achievements'

const { TextArea } = Input
const stateList = ['拒绝', '驳回修改', '学院审核中', '学校审核中']
export default class AchievementInfo extends Component {

    state = {
        id: this.props.location.state && this.props.location.state.id,
        type: this.props.location.state && this.props.location.state.type,
        info: null,
        status: '',
        visible: false,
        result: 1,
        remark: ''
    }

    componentDidMount() {
        const { id, type } = this.state
        //console.log(this.props.location.state)
        if (id) this.getAchievementInfo(id, type)

    }

    getAchievementInfo = async () => {
        let info
        switch (this.state.type) {
            case '论文':
                info = await this.getThesisInfo()
                break;
            case '竞赛':
                info = await this.getCompetitionInfo()
                break;
            case '专利':
                info = await this.getPatentInfo()
                break;
            default:
                break;
        }
        console.log(info)
        if(info){
            this.setState({
                info,
                status: stateList[info.State + 1]
            })
        }
            
    }

    getThesisInfo = async () => {
        const { id } = this.state
        const res = await getArticleByID({ id })
        if (res.result) {
            return JSON.parse(res.data)  
        }
    }
    getCompetitionInfo = async () => {
        const { id } = this.state
        const res = await getCompetitionByID({ id })
        if (res.result) {
            return JSON.parse(res.data)  
        }
    }
    getPatentInfo = async () => {
        const { id } = this.state
        const res = await getPatentByID({ id })
        if (res.result) {
            return JSON.parse(res.data)  
        }
    }

    showModal = result => {
        this.setState({
            visible: true,
            result
        })
    }

    handleOk = async () => {
        const { id, type, result, remark } = this.state
        const params = {
            id,
            type,
            result,
            remark
        }
        console.log(params)
        let res = {}
        if (isAdminister()) {
            res = await setDepartmentReview(params)
        }
        else if (isSuperAdminister()) {
            res = await setSchoolReview(params)
        } else {
            message.warning('没有权限，无法操作！')
        }
        if (res.result) {
            message.success('操作成功！')
            this.props.history.replace({ pathname: '/administer/reviewList' })
        }
    }

    handleCancel = () => {
        this.setState({
            visible: false,
            remark: ''
        })
    }

    changeRemark = e => {
        this.setState({ remark: e.target.value })
    }

    render() {
        let achievementInfo
        switch (this.state.type) {
            case '论文':
                achievementInfo = this.state.info && <ThesisInfo info={this.state.info} size='middle' />
                break;
            case '竞赛':
                achievementInfo = this.state.info && <CompetitionInfo info={this.state.info} size='middle' />
                break;
            case '专利':
                achievementInfo = this.state.info && <PatentInfo info={this.state.info} size='middle' />
                break;
            default:
                break;
        }
        const title = isStudent() ? this.state.status : (
            <Space size='large'>
                <Button type='primary' onClick={() => this.showModal(1)}>审核通过</Button>
                <Button type='primary' onClick={() => this.showModal(0)}>驳回修改</Button>
                <Button type='danger' onClick={() => this.showModal(-1)}>终止</Button>
            </Space>
        )
        const extra = (
            <Button onClick={() => { this.props.history.go(-1) }}><DoubleLeftOutlined />返回</Button>
        )
        return (
            <>
                <Card title={title} extra={extra}>
                    {achievementInfo}
                </Card>
                <Modal
                    title="审核意见"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <TextArea
                        value={this.state.remark}
                        onChange={this.changeRemark}
                        placeholder="请填写审核意见"
                        autoSize={{ minRows: 5, maxRows: 10 }}
                    />
                </Modal>
            </>
        )
    }
}
