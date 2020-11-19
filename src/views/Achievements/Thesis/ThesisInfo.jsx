import React, { Component } from 'react'
import { Card, Descriptions } from 'antd'

class ThesisInfo extends Component {
    constructor(...props){
        super(...props)
        this.state = {
            thesisInfo: {}
        }
    }
    async componentDidMount(){
        const id = this.props.thesisID
        // if(id){
        //     const res = await getArticleByID({ id })
        //     console.log(res)
        //     if (res.result) {
        //         const item = JSON.parse(res.data)
        //         console.log(item)
        //         const others = !item.其它作者 ? [''] : item.其它作者.split(',')
        //         this.formRef.current.setFieldsValue({
        //             thesisName: item.论文名称,
        //             journal: item.发表期刊,
        //             others: !item.其它作者 ? [''] : item.其它作者.split(','),
        //         })
        //     }
        // }
    }
    render() {
        return (
            <Card>
                <Descriptions
                    bordered
                    column={2}
                    title='论文信息'
                >
                    <Descriptions.Item label={<strong>论文名称</strong>} span={2}>XXXXX</Descriptions.Item>
                </Descriptions>
            </Card>
        )
    }
}

export default ThesisInfo
