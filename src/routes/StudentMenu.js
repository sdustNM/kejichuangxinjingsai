import React from 'react'

import {
  HomeOutlined,
  ProfileOutlined,
  SmileOutlined
} from '@ant-design/icons';

// import ProjectList from "../views/students/ProjectList";
// import CompititionListXiao from "../views/students/CompetitionListXiao";
// import CompititionListYuan from "../views/students/CompetitionListYuan";
// import NoticeList from "../views/students/NoticeList";

export const studentMenus = [{
  path: '/student/noticeList',
  //component: NoticeList,
  exact: true,
  isShow: true,
  title: '通知公告',
  icon: <HomeOutlined />
}, {
  path: '/student/competitionList',
  //component: null,
  exact: true,
  isShow: true,
  title: '竞赛信息',
  icon: <ProfileOutlined />,
  sub: [{
    isShow: true,
    title: '校级竞赛',
    path: '/student/competitionListXiao',
    icon: <SmileOutlined />,
  }, {
    path: '/student/competitionListYuan',
    isShow: true,
    title: '院级竞赛',
    icon: <SmileOutlined />,
  }]
},
{
  path: '/student/projectList',
  //component: ProjectList,
  isShow: true,
  title: '我的竞赛',
  icon: <SmileOutlined />
}]