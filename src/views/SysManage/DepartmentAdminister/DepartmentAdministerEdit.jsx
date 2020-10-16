import React from 'react'
import {
  Table, Button, Popconfirm, message, Space,Row 
} from 'antd'

import { PlusCircleOutlined } from '@ant-design/icons'
import { getDepartmentAdministersById,removeDepartmentAdminister,addDepartmentAdminister } from '../../../services/administer/deparmentAdminister';
import SelectManComplete from '../../../components/SelectManComplete'



class DepartmentAdministerEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      visible: false,
      administerID:''
    }
  }

  componentDidMount() {
    this.refresh() 
  }



  refresh = () => {
    console.log("dd"+this.props.departmentId)
    getDepartmentAdministersById({"DepartmentNo":this.props.departmentId}).then(res => {
      console.log(res)
      if (res.result) {
        let list = []
        let data = JSON.parse(res.data)
        data.map(item =>
          list.push({
            id: item.id,
            key: item.id,
            name: item.username,
             gender: item.gender,
          })
        )
        //console.log(data)
        this.setState({
          dataSource: list,
        })
      }

    })
  }

  addAdminister=()=>{
    addDepartmentAdminister({"departmentNo":this.props.departmentId,"administerID":this.state.administerID}).then(res=>{
      if (res.result)
      {
        message.info("添加用户成功");
        this.refresh();
      }
      else {
        message.error(res.message)
      }
    })

  }

  chooseMan=(man)=>{
    this.setState(
      {
        administerID:man
      }
    )
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false
    })
    this.refresh()
  }

  remove = administerID => {
    //移除操作
    removeDepartmentAdminister({"departmentNo": this.props.departmentId, "administerID":administerID}).then(
      res => {
        if(res.result){
          message.success('移除成功！', 1)
          this.refresh()
        }
        else{
          message.error(res.message, 1)
        }
      }
    )
  }

 


  render() {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'key',
        key: 'ID'
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender'
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Popconfirm
            title={`确认移除${record.name}的管理员权限吗?`}
            onConfirm={() => {this.remove(record.id)}}
            okText="确认"
            cancelText="取消"
          >
            <Button
              type='danger'
              size='small'
              shape='round'
            >
              移除
            </Button>
          </Popconfirm>
        ),
      },
    ];

   

    const { dataSource } = this.state
    return (
      <div>
        <Space direction="vertical">
          <Row>
            <SelectManComplete chooseMan={this.chooseMan} />
            <Button type='default' onClick={()=>{ this.addAdminister();}}>
              <PlusCircleOutlined />添加
           </Button>
          </Row>
          <Table
            dataSource={dataSource}
            columns={columns}
          />
        </Space>
      </div>
    )
  }
}
export default DepartmentAdministerEdit