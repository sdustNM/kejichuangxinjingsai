import { Card } from "antd";
import React from 'react';
import ProjectInfo from "./ProjectInfo";

class ProjectScoreList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            projectId:'1'
         }
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