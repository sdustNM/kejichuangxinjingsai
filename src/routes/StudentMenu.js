import React from 'react'

import {
  ProfileOutlined,
  SmileOutlined,
  TrophyOutlined,
  ExperimentOutlined,
  IdcardOutlined,
  FileTextOutlined,
  WalletOutlined,
  FileUnknownOutlined
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
    title: '成果申报',
    icon: <IdcardOutlined />,
    sub: [{
      path: '/student/thesisForm',
      isShow: true,
      title: '论文成果申报',
      icon: <FileTextOutlined />
    },
    {
      path: '/student/competitionForm',
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
      path: '/student/OthersForm',
      isShow: true,
      title: '其他成果申报',
      icon: <FileUnknownOutlined />
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
  {
    path: '/student/history',
    isShow: true,
    title: '历史成果',
    icon: <IdcardOutlined />,
    sub: [{
      path: '/student/filedAchievements',
      isShow: true,
      title: '我的成果',
      icon: <WalletOutlined />
    }]
  }

]