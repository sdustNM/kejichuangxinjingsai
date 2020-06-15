
import React from 'react'

import {
  HomeOutlined,
  ProfileOutlined,
  SmileOutlined
} from '@ant-design/icons';

import ProjectList from "../views/students/ProjectList";
import CompititionList from "../views/students/CompetitionList";
import NoticeList from "../views/students/NoticeList";
import Notice from '../views/students/Notice';

import CompetitionManager from '../views/administers/CompetitionManager'
import CompetitionEdit from '../views/administers/CompetitionEdit'
import ProjectManager from '../views/administers/ProjectManager'
import ProjectDetail from '../views/administers/ProjectDetail'
import AdministerManager from '../views/administers/AdministerManager';
import DepartmentManager from '../views/administers/DepartmentManager';
import TeacherManager from '../views/administers/TeacherManager';
import StudentManager from '../views/administers/StudentManager';

export const studentRoutes = [{
  path: '/student/',
  component: NoticeList,
  exact: true,
  isShow: true,
  title: '首页',
  icon: <HomeOutlined />
}, {
  path: '/student/competitions',
  component: CompititionList,
  exact: true,
  isShow: true,
  title: '竞赛信息',
  icon: <ProfileOutlined />
},
{
  path: '/student/projects',
  component: ProjectList,
  isShow: true,
  title: '我的竞赛',
  icon: <SmileOutlined />
}, {
  path: '/student/notice/:id',
  component: Notice,
  exact: true,
  isShow: false,
  title: '',
  icon: <ProfileOutlined />
}]

export const administerRoutes = [{
  path: '/administer/',
  component: CompetitionManager,
  exact: true
}, {
  path: '/administer/competitions',
  component: CompetitionManager,
  exact: true
}, {
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
}]

