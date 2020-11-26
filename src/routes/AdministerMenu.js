
import React from 'react'

import {
  HomeOutlined,
  SmileOutlined
} from '@ant-design/icons';


import ProjectManager from '../views/SysManage/ProjectManager';



export const administerMenus = [
  {
    component: null,
    path: 'competitionsXiao',
    isShow: true,
    title: '校级竞赛',
    icon: <HomeOutlined />,
    yuanManager: true,
    sub: [{
      isShow: true,
      title: '比赛列表',
      path: '/administer/competitions/xiao',
      icon: <SmileOutlined />,
      yuanManager: true,
    }, {
      path: '/administer/recommendedProjects',
      isShow: true,
      title: '推荐作品',
      icon: <SmileOutlined />
    }, {
      path: '/administer/projects',
      isShow: true,
      title: '全部作品',
      icon: <SmileOutlined />,
      yuanManager: true,
    },]
  },
  {   //科技成果
    component: null,
    path: '/administer/archievements/',
    isShow: true,
    title: '科技成果',
    icon: <HomeOutlined />,
    yuanManager: true,
    sub: [{
      isShow: true,
      title: '待审成果',
      path: '/administer/reviewList',
      icon: <SmileOutlined />,
      yuanManager: true,
    }, {
      path: '/administer/archievementList',
      isShow: true,
      title: '学生成果',
      icon: <SmileOutlined />,
      yuanManager: true,
    }]
  },
  // {
  //   component: null,
  //   path: 'competitionsYuan',
  //   isShow: true,
  //   title: '学院竞赛',
  //   icon: <HomeOutlined />,
  //   yuanManager: true,
  //   sub: [{
  //     isShow: true,
  //     title: '比赛列表',
  //     path: '/administer/competitions/yuan',
  //     icon: <SmileOutlined />,
  //     yuanManager: true,
  //   }, {
  //     path: '/administer/projects',
  //     isShow: true,
  //     title: '参赛作品',
  //     icon: <SmileOutlined />,
  //     yuanManager: true,
  //   }]
  // },
  // {
  //   component: null,
  //   path: 'Announcemnet',
  //   isShow: true,
  //   title: '公告发布',
  //   icon: <HomeOutlined />,
  //   sub: [{
  //     isShow: true,
  //     title: '比赛通知',
  //     path: '/administer/AnnouncementList',
  //     icon: <SmileOutlined />
  //   },
  //     //{
  //     //   path: '/administer/AnnouncementList1',
  //     //   isShow: true,
  //     //   title: '系统公告',
  //     //   icon: <SmileOutlined />
  //     //}
  //   ]
  // },
  {
    component: null,
    path: 'systemManage',
    isShow: true,
    title: '系统管理',
    icon: <HomeOutlined />,
    sub: [{
      isShow: true,
      title: '学院信息',
      path: '/administer/departments',
      icon: <SmileOutlined />,
    }, {
      path: '/administer/administers',
      isShow: true,
      title: '学院管理员信息',
      icon: <SmileOutlined />,
    }, {
      isShow: true,
      title: '专家信息',
      path: '/administer/Experts',
      icon: <SmileOutlined />,
    },
    //  {
    //   isShow: true,
    //   title: '教师信息',
    //   path: '/administer/teachers',
    //   icon: <SmileOutlined />,
    // }, 
    {
      isShow: true,
      title: '学生信息',
      path: '/administer/studentList',
      icon: <SmileOutlined />,
    },
    {
      isShow: true,
      title: '比赛名称列表',
      path: '/administer/DDCompetitionList',
      icon: <SmileOutlined />,
    }]
  }
]

