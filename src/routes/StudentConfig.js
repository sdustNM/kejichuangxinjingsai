
import ProjectList from "../views/students/ProjectList"
import NoticeList from "../views/students/NoticeList"
import Notice from '../views/students/Notice'
import CompetitionListXiao from '../views/students/CompetitionListXiao'
import CompetitionListYuan from '../views/students/CompetitionListYuan'

export const studentConfig = [{
    path: '/student/',
    component: NoticeList,
    exact: true,
  },{
    path: '/student/noticeList',
    component: NoticeList,
    exact: true,
  }, {
    path: '/student/competitionListXiao',
    component: CompetitionListXiao,
    exact: true
  },{
    path: '/student/competitionListYuan',
    component: CompetitionListYuan,
  },
  {
    path: '/student/projectList',
    component: ProjectList,
  }, {
    path: '/student/notice',
    component: Notice,
    exact: true,
  }]


  //to do wcgit