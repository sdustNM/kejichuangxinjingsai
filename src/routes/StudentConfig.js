import ProjectEdit from "../views/Project/Student/ProjectEdit"
import ProjectInfoStudent from "../views/Project/Student/ProjectInfo_student"
import ProjectInfoWithComInfo from "../views/Project/ProjectInfo_withComInfo"
import NoticeList from "../views/Common/NoticeList"
import Notice from '../views/Common/Notice'
import CompetitionListXiao from '../views/Competition/Students/CompetitionListXiao'
import CompetitionListYuan from '../views/Competition/Students/CompetitionListYuan'
import Competition from "../views/Competition/Students/Competition"
import ProjectList from "../views/Project/Student/ProjectList"


import AchievementList from "../views/Achievements/AchievementList/AchievementList"
import ConfirmAchieveFrame from "../views/Achievements/ConfirmAchieveFrame"
import AchievementInfo from "../views/Achievements/AchievementInfo"
import ThesisForm from "../views/Achievements/Thesis/ThesisForm"
import PatentForm from "../views/Achievements/Patent/PatentForm"
import CompetitionForm from "../views/Achievements/Competition/CompetitionForm"
import FiledAchieveFrame from "../views/Achievements/FiledAchieveFrame"
import OthersForm from "../views/Achievements/Other/OthersForm"



export const studentConfig = [
  {
    path: '/student/',
    component: AchievementList,
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
    path: '/student/archievementList',
    component: ConfirmAchieveFrame,
    exact: true,
  },
  {
    path: '/student/reviewList',
    component: AchievementList,
    exact: true,
  },
  {
    path: '/student/achievementsInfo',
    component: AchievementInfo,
    exact: true,
  },
  {
    path: '/student/thesisForm',
    component: ThesisForm,
    //exact: true,
  },
  {
    path: '/student/patentForm',
    component: PatentForm,
    //exact: true,
  },
  {
    path: '/student/competitionForm',
    component: CompetitionForm,
    //exact: true,
  },
  {
    path: '/student/othersForm',
    component: OthersForm,
    //exact: true,
  },
  {
    path: '/student/filedAchievements',
    component: FiledAchieveFrame,
    //exact: true,
  }
]


  //to do wcgit