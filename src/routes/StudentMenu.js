import React from 'react'

import {
  HomeOutlined,
  ProfileOutlined,
  SmileOutlined
} from '@ant-design/icons';

import ProjectList from "../views/students/ProjectList";
import CompititionList from "../views/students/CompetitionList";
import NoticeList from "../views/students/NoticeList";
import Notice from '../views/students/Notice';

export const studentMenus = [{
    component: NoticeList,
    exact: true,
    isShow: true,
    title: '首页',
    icon: <HomeOutlined />
  }, {
    component: CompititionList,
    exact: true,
    isShow: true,
    title: '竞赛信息',
    icon: <ProfileOutlined />
  },
  {
    component: ProjectList,
    isShow: true,
    title: '我的竞赛',
    icon: <SmileOutlined />
  }]