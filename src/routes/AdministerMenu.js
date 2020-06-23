
import React from 'react'

import {
  HomeOutlined,
  ProfileOutlined,
  SmileOutlined
} from '@ant-design/icons';


import CompetitionManager from '../views/administers/CompetitionManager'
import AdministerManager from '../views/administers/AdministerManager';
import DepartmentManager from '../views/administers/DepartmentManager';
import TeacherManager from '../views/administers/TeacherManager';
import StudentManager from '../views/administers/StudentManager';



export const administerMenus = [
{
  component: CompetitionManager,
  path: '/administer/competitions',
  isShow:true,
  title:'学生竞赛',
  icon: <HomeOutlined />
},

{
    component: null,
    isShow:true,
    title:'系统管理',
    icon: <HomeOutlined />,
    sub:[{
        component: AdministerManager,
        path: '/administer/administers',
        isShow:true,
        title:'学院管理员',
        icon: <SmileOutlined />,
      },{
        isShow:true,
        title:'学院管理',
        path: '/administer/departments',
        component: DepartmentManager,
        icon: <SmileOutlined />,
      },{
        isShow:true,
        title:'教师管理',
        component: TeacherManager,
        path: '/administer/teachers',
        icon: <SmileOutlined />,
      },{
        isShow:true,
        title:'学生管理',
        component: StudentManager,
        path: '/administer/students',
        icon: <SmileOutlined />,
      }]
  }
]

