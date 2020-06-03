
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
  HomeTwoTone,
  ProfileTwoTone,
  SmileTwoTone
} from '@ant-design/icons';
import JoinedList from "../views/students/JoinedList";
import CompititionList from "../views/students/CompetitionList";
import NoticeList from "../views/students/NoticeList";

export const studentRoutes = [{
  path: '/',
  component: NoticeList,
  exact: true,
  isShow: true,
  title: '首页',
  icon: <HomeTwoTone />
},{
  path: '/competitions',
  component: CompititionList,
  exact: true,
  isShow: true,
  title: '竞赛信息',
  icon: <ProfileTwoTone />
},
{
  path: '/joined',
  component: JoinedList,
  isShow: true,
  title: '我的竞赛',
  icon: <SmileTwoTone />
},
]
