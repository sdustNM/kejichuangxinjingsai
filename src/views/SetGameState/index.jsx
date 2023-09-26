import React, { Component, isValidElement } from 'react'
import { Space, Switch } from 'antd'
import { isGameStart } from '../../utils/gameState';
import { startGame, stopGame } from '../../services/gameState';

export default class SetGameState extends Component {

    state = {
        isValid: isGameStart()
    }

    onClick = async (checked, envet) => {
        console.log(checked)
        if (checked) {
            await this.start();
        }
        else {
            await this.stop();
        }
        this.setState({
            isValid: isGameStart()
        })
    }
    start = async () => {
        const res = await startGame();
        if(res.result){
            console.log(res, 'start');
            sessionStorage.setItem('gameState', 1)
        }
        
    }
    stop = async () => {
        const res = await stopGame();
        if(res.result){
            console.log(res,'stop');
            sessionStorage.setItem('gameState', 0)
        }
    }

    render() {
        console.log(isGameStart())
        return (
            <Space direction='vertical'>
                <h2>成果提交开关</h2>
                <Switch checkedChildren="开启" unCheckedChildren="关闭" checked={isGameStart()} onClick={this.onClick} />
            </Space>


        );
    }
}

