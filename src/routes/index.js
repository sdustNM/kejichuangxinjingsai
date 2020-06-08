
// export const mainRoutes = [{
//   key: 'home',
//   path: '/',
//   component: Home,
//   exact: true
// }, {
//   key: 'studentLogin',
//   path: '/student/login',
//   component: StudentLogin
// }, {
//   key: 'administerLogin',
//   path: '/administer/login',
//   component: AdministerLogin
// }, {
//   key: 'expertLogin',
//   path: '/expert/login',
//   component: ExpertLogin
// }, {
//   key: 'pageNotFound',
//   path: '/error',
//   component: PageNotFound
// }]
import React from 'react'
import {
  HomeOutlined,
  ProfileOutlined,
  SmileOutlined
} from '@ant-design/icons';
import JoinedList from "../views/students/JoinedList";
import CompititionList from "../views/students/CompetitionList";
import NoticeList from "../views/students/NoticeList";
import Notice from '../views/students/Notice';

export const studentRoutes = [{
  path: '/student/',
  component: NoticeList,
  exact: true,
  isShow: true,
  title: '首页',
  icon: <HomeOutlined />
},{
  path: '/student/competitions',
  component: CompititionList,
  exact: true,
  isShow: true,
  title: '竞赛信息',
  icon: <ProfileOutlined />
},
{
  path: '/student/joined',
  component: JoinedList,
  isShow: true,
  title: '我的竞赛',
  icon: <SmileOutlined />
},{
  path: '/student/notice/:id',
  component: Notice,
  exact: true,
  isShow: false,
  title: '',
  icon: <ProfileOutlined />
}]
