import React, { Component } from 'react'
import {Card} from 'antd'
import ThesisInfo from './Thesis/ThesisInfo';

export default class AchievementInfo extends Component {

    render() {
        const { id, type } = this.props.location.state
        let achievementInfo
        switch (type) {
            case 'thesis':
                achievementInfo = <ThesisInfo id={id} />
                break;
            // case 'competition':
            //     achievementInfo = <ThesisInfo id={id} />
            //     break;
            // case 'patent':
            //     achievementInfo = <ThesisInfo id={id} />
            //     break;
            default:
                break;
        }
        return (
            <div>
                <Card>
                    {achievementInfo}
                </Card>
                <Card>审批操作</Card>
            </div>
        )
    }
}
