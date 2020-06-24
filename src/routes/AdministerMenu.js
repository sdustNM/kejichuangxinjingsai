
import React from 'react'

import {
  HomeOutlined,
  ProfileOutlined,
  SmileOutlined
} from '@ant-design/icons';


export const administerMenus = [
  {
    path: '/administer/competitions',
    isShow: true,
    title: '学生竞赛',
    icon: <HomeOutlined />,
    sub: [{
      path: '/administer/competitions/xiao',
      isShow: true,
      title: '校级竞赛',
      icon: <SmileOutlined />,
    }, {
      path: '/administer/competitions/yuan',
      isShow: true,
      title: '院级竞赛',
      icon: <SmileOutlined />,
    }]

  },

  {
    component: null,
    isShow: true,
    title: '系统管理',
    path: '/administer/manager',
    icon: <HomeOutlined />,
    sub: [ {
      isShow: true,
      title: '学院信息',
      path: '/administer/departments',
      icon: <SmileOutlined />,
    },{
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

