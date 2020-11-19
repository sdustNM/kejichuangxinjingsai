import ProjectEdit from "../views/Project/Student/ProjectEdit"
import ProjectInfoStudent from "../views/Project/Student/ProjectInfo_student"
import ProjectInfoWithComInfo from "../views/Project/ProjectInfo_withComInfo"
// import NoticeList from "../views/Common/NoticeList"
// import Notice from '../views/Common/Notice'
import CompetitionListXiao from '../views/Competition/Students/CompetitionListXiao'
//import CompetitionListYuan from '../views/Competition/Students/CompetitionListYuan'
import Competition from "../views/Competition/Students/Competition"
import ProjectList from "../views/Project/Student/ProjectList"
import AchievementList from "../views/Achievements/AchievementList"
import AchievementInfo from "../views/Achievements/AchievementInfo"
import ThesisForm from "../views/Achievements/Thesis/ThesisForm"



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
    path: '/student/thesisForm',
    component: ThesisForm,
    exact: true,
  },
  {
    path: '/student/myNeedReview',
    component: AchievementList,
    exact: true,
  },
  {
    path: '/student/achievementsInfo',
    component: AchievementInfo,
    exact: true,
  },
]


  //to do wcgit