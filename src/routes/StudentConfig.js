import Project from "../views/Project/Project"
import NoticeList from "../views/Common/NoticeList"
import Notice from '../views/Common/Notice'
import CompetitionListXiao from '../views/Competition/Students/CompetitionListXiao'
import CompetitionListYuan from '../views/Competition/Students/CompetitionListYuan'
import Competition from "../views/Competition/Students/Competition"


export const studentConfig = [{
  path: '/student/',
  component: NoticeList,
  exact: true,
}, {
  path: '/student/noticeList',
  component: NoticeList,
  exact: true,
}, {
  path: '/student/competitionListXiao',
  component: CompetitionListXiao,
  exact: true
}, {
  path: '/student/competitionListYuan',
  component: CompetitionListYuan,
},
{
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