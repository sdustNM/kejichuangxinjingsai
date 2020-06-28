
import React from 'react'

import {
  HomeOutlined,
  SmileOutlined
} from '@ant-design/icons';


import ProjectManager from '../views/administers/ProjectManager';



export const administerMenus = [
  {
    component: null,
    path: 'competitions',
    isShow: true,
    title: '学生竞赛',
    icon: <HomeOutlined />,
    sub: [{
      isShow: true,
      title: '校级竞赛',
      path: '/administer/competitions/xiao',
      icon: <SmileOutlined />,
    }, {
      path: '/administer/competitions/yuan',
      isShow: true,
      title: '院级竞赛',
      icon: <SmileOutlined />,
    }]
  },
  {
    component: ProjectManager,
    path: '/administer/projects',
    isShow: true,
    title: '学生项目',
    icon: <HomeOutlined />
  },
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
    }, {
      isShow: true,
      title: '教师信息',
      path: '/administer/teachers',
      icon: <SmileOutlined />,
    }, {
      isShow: true,
      title: '学生信息',
      path: '/administer/students',
      icon: <SmileOutlined />,
    }]
  }
]

