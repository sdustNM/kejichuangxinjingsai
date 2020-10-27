import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Menu, Dropdown, Button } from 'antd';
import { UserSwitchOutlined } from '@ant-design/icons'
import { getRole, getRoleList, getRoleName } from '../../utils/auth';
import { getJwtUser } from '../../utils/jwtHelper'
class RoleSelecter extends Component {

    select = ({ key }) => {
        this.props.history.push(`/loginSSO?entryId=${key}`)
    }

    render() {
        console.log(getJwtUser())
        console.log(getRoleList())
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
