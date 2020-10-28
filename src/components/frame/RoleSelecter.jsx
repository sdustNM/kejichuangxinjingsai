import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Menu, Dropdown, Button } from 'antd';
import { UserSwitchOutlined } from '@ant-design/icons'
import { getRoleList, getRoleName, getPage } from '../../utils/auth';
import { getJwtUser } from '../../utils/jwtHelper'
import { switchRole } from '../../services/login';
class RoleSelecter extends Component {

    select = ({ key }) => {
        console.log(key)
        switchRole({ entryId: key }).then(res => {
            console.log(res)
            if(res.result){
                
                getPage(res.data, this.props.history)
            }
        })
    }

    render() {
        //console.log(getJwtUser())
        //console.log(getRoleList())
        const menu = (
            <Menu onClick={this.select}>
                <Menu.ItemGroup title={`当前角色：${getRoleName()}`}>
                    <Menu.Divider />
                    {
                        getRoleList().map(r => (
                            <Menu.Item
                                key={r}
                            >
                                {getRoleName(r)}
                            </Menu.Item>
                        ))
                    }
                </Menu.ItemGroup>
            </Menu>
        );
        return (
            <Dropdown overlay={menu} trigger={['click']}>
                <Button
                    style={{ color: 'white' }}
                    type='ghost'
                >
                    <UserSwitchOutlined />切换角色
                    </Button>
            </Dropdown>
        )
    }
}

export default withRouter(RoleSelecter)
