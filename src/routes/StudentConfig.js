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

export const studentConfig = [{
    path: '/student/',
    component: NoticeList,
    exact: true,
  }, {
    path: '/student/competitions',
    component: CompititionList,
    exact: true,
  },
  {
    path: '/student/projects',
    component: ProjectList,
  }, {
    path: '/student/notice/:id',
    component: Notice,
    exact: true,
  }]


  //to do wc

  /// to do wc2