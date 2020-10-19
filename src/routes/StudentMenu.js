import React from 'react'

import {
  ProfileOutlined,
  SmileOutlined
} from '@ant-design/icons';


export const studentMenus = [
  {
    path: '/student/competitionListXiao',
    isShow: true,
    title: '校级竞赛',
    icon: <ProfileOutlined />,
  },
  {
    path: '/student/projectList',
    isShow: true,
    title: '我的竞赛',
    icon: <SmileOutlined />
  }]