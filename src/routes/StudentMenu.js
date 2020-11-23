import React from 'react'

import {
  ProfileOutlined,
  SmileOutlined,
  TrophyOutlined,
  ExperimentOutlined,
  IdcardOutlined,
  FileTextOutlined,
  WalletOutlined
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
  {
    path: '/student/achievements',
    isShow: true,
    title: '科技成果',
    icon: <IdcardOutlined />,
    sub: [{
      path: '/student/thesisForm',
      isShow: true,
      title: '论文成果申报',
      icon: <FileTextOutlined />
    },
    {
      path: '/student/competitionAchievements',
      isShow: true,
      title: '竞赛成果申报',
      icon: <TrophyOutlined />
    },
    {
      path: '/student/patentForm',
      isShow: true,
      title: '专利成果申报',
      icon: <ExperimentOutlined />
    },
    {
      path: '/student/reviewList',
      isShow: true,
      title: '我的申请',
      icon: <WalletOutlined />
    },
    {
      path: '/student/archievementList',
      isShow: true,
      title: '我的成果',
      icon: <WalletOutlined />
    }]
  },

]