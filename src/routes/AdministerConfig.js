
import React from 'react'

import {
  HomeOutlined,
  ProfileOutlined,
  SmileOutlined
} from '@ant-design/icons';


import CompetitionEdit from '../views/administers/CompetitionEdit'
import ProjectManager from '../views/administers/ProjectManager'
import ProjectDetail from '../views/administers/ProjectDetail'
import AdministerManager from '../views/administers/AdministerManager';
import DepartmentManager from '../views/administers/DepartmentManager';
import TeacherManager from '../views/administers/TeacherManager';
import StudentManager from '../views/administers/StudentManager';
import CompetitionManagerXiao from '../views/administers/CompetitionManagerXiao'
import CompetitionManagerYuan from '../views/administers/CompetitionManagerYuan';
import ExpertManager_List from '../views/administers/ExpertManager_List';



export const administerConfig = [
  {
  path: '/administer/competitions/xiao',
  component: CompetitionManagerXiao,
  isShow:true,
  title:'学生竞赛',
  exact: true
}, 
{
  path: '/administer/competitions/xiao',
  component: CompetitionManagerXiao,
  isShow:true,
  title:'校级竞赛',
  exact: true
},{
  path: '/administer/competitions/yuan',
  component: CompetitionManagerYuan,
  isShow:true,
  title:'院级竞赛',
  exact: true
},  {
  path: '/administer/competitionEdit',
  component: CompetitionEdit
}, {
  path: '/administer/projects',
  component: ProjectManager,
  exact: true
}, {
  path: '/administer/projectDetail',
  component: ProjectDetail
},{
  path: '/administer/administers',
  component: AdministerManager,
  exact: true
},{
  path: '/administer/departments',
  component: DepartmentManager,
  exact: true
},{
  path: '/administer/teachers',
  component: TeacherManager,
  exact: true
},{
  path: '/administer/students',
  component: StudentManager,
  exact: true
},{
  path: '/administer/Experts',
  component: ExpertManager_List,
  exact: true
}

]

