import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Menu, Dropdown, Button } from 'antd';
import { UserSwitchOutlined } from '@ant-design/icons'
import { getRole, getRoleList, getRoleName } from '../../utils/auth';

class RoleSelecter extends Component {
    constructor(...props) {
        super(...props)
        this.state = {
            role: getRole(),
            roleList: [1, 2, 3]//getRoleList()
        }
    }

    select = ({ key }) => {
        this.props.history.push(`/loginSSO?entryId=${key}`)
    }

    render() {
        console.log(this.state)
        const { role, roleList } = this.state
        const menu = (
            <Menu onClick={this.select}>
                <Menu.ItemGroup title={`当前角色：${getRoleName(role)}`}>
                    <Menu.Divider />
                    {
                        roleList.map(r => (
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
