import ProjectEdit from "../views/Project/Student/ProjectEdit"
import ProjectInfo_student from "../views/Project/Student/ProjectInfo_student"
import ProjectInfo_withComInfo from "../views/Project/ProjectInfo_withComInfo"
// import NoticeList from "../views/Common/NoticeList"
// import Notice from '../views/Common/Notice'
import CompetitionListXiao from '../views/Competition/Students/CompetitionListXiao'
//import CompetitionListYuan from '../views/Competition/Students/CompetitionListYuan'
import Competition from "../views/Competition/Students/Competition"
import ProjectList from "../views/Project/Student/ProjectList"



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
    component: ProjectInfo_student
  }, 
  {
    path: '/student/projectInfoWithCompetitonInfo',
    component: ProjectInfo_withComInfo
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
    component: Competition,
    exact: true,
  }]

  
  //to do wcgit