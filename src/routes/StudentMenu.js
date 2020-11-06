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
    title: '我的作品',
    icon: <SmileOutlined />
  },
  // {
  //   path: '/student/rewardList',
  //   isShow: true,
  //   title: '我的奖励',
  //   icon: <SmileOutlined />
  // }
]