import Project from "../views/students/project/Project"
import ProjectList from "../views/students/project/ProjectList"
import NoticeList from "../views/students/NoticeList"
import Notice from '../views/students/Notice'
import CompetitionListXiao from '../views/students/competition/CompetitionListXiao'
import CompetitionListYuan from '../views/students/competition/CompetitionListYuan'
import Competition from "../views/students/competition/Competition"


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
  },{
    path: '/student/project',
    component: Project
  }, {
    path: '/student/notice',
    component: Notice,
    exact: true,
  },
  {
    path: '/student/competition',
    component: Competition,
    exact: true,
  }]


  //to do wcgit