import { Card } from "antd";
import React from 'react';
import ProjectInfo from "./ProjectInfo";

class ProjectScoreList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            projectId:'1'
         }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!nextProps.projectID) return null
        getProjectInfoByID({ id: nextProps.projectID }).then(res => {
          if (res.data.result) {
            const item = JSON.parse(res.data.data)
            console.log(item)
            return {
              project: {
                id: item.id,
                name: item.name,
                sno: item.sno,
                teacher: item.projectTeacherName,
                cooperator: item.ProjectCooperator,
                description: item.projectDes,
                mainList: item.AppendixMain,
                videoList: item.AppendixVideo,
                bzList: item.Appendixbz
              }
            }
          }
        })
      }
      
    render() { 
        return (
            <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
                <ProjectInfo projectID={projectId}></ProjectInfo>
            </Card>
        );
    }
}
 
export default ProjectScoreList;