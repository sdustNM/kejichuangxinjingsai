import React from 'react'
import { List, Button } from 'antd'


const data = [
  {
    id: 1,
    avatar: null,
    title: '通知1',
    description: "科大公告防疫专题关于征集2020年度国家社科基金中华学术外译项目选题的通知"
  },
  {
    id: 2,
    avatar: null,
    title: '通知2',
    description: "关于申报青岛市第三十四次社会科学优秀成果奖的通知"
  },
  {
    id: 3,
    avatar: null,
    title: '通知3',
    description: "关于教职工个人核对养老保险参保信息的通知"
  },
  {
    id: 4,
    avatar: null,
    title: '通知4',
    description: "关于做好新提拔科级干部任前谈话、到岗和工作交接等事项的通知"
  },
];

class NoticeList extends React.Component {

  
  render() {
    return (
      <div>
        <List
          // style={{ backgroundColor: '#adc6ff' }}
          // header={<div >Header</div>}
          // footer={<div>Footer</div>}
          bordered
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item
              
              key={item.id}
              actions={[
                <Button
                  type="primary"
                  key={`a-${item.id}`}>
                  详情
              </Button>]}
            >
              <List.Item.Meta
                {...item}
              />
            </List.Item>
          )}
        />
      </div>
    )
  }
}


export default NoticeList;