import ProjectEdit from "../views/Project/Student/ProjectEdit"
import ProjectInfoStudent from "../views/Project/Student/ProjectInfo_student"
import ProjectInfoWithComInfo from "../views/Project/ProjectInfo_withComInfo"
// import NoticeList from "../views/Common/NoticeList"
// import Notice from '../views/Common/Notice'
import CompetitionListXiao from '../views/Competition/Students/CompetitionListXiao'
//import CompetitionListYuan from '../views/Competition/Students/CompetitionListYuan'
import Competition from "../views/Competition/Students/Competition"
import ProjectList from "../views/Project/Student/ProjectList"
import CompetitionManagerXiao from '../views/Competition/CompetitionManagerXiao'



export const studentConfig = [
  {
    path: '/student/',
    component: CompetitionListXiao,
    exact: true,
  },
  {
    path: '/student/competitionListXiao',
    component: CompetitionListXiao,
    exact: true
  },
  {
    path: '/student/projectEdit',
    component: ProjectEdit
  }, 
  {
    path: '/student/projectInfo',
    component: ProjectInfoStudent
  }, 
  {
    path: '/student/projectInfoWithCompetitonInfo',
    component: ProjectInfoWithComInfo
  },
  {
    path: '/student/projectList',
    component: ProjectList
  }, 
  {
    path: '/student/competition',
    component: Competition,
    exact: true,
  }, 
  {
    path: '/student/rewardList',
    component: CompetitionManagerXiao,
    exact: true,
  }]

  
  //to do wcgit