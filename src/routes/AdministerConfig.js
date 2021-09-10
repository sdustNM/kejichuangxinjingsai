
import CompetitionEdit from '../views/Competition/CompetitionEdit'
import ProjectDetail from '../views/SysManage/ProjectDetail'
import DepartmentManager from '../views/SysManage/Department/DepartmentManager';
import StudentList from '../views/SysManage/StudentList';
import CompetitionManagerXiao from '../views/Competition/CompetitionManagerXiao'
import ExpertManagerList from '../views/SysManage/Expert/ExpertManagerList';
import ExpertManagerEdit from '../views/SysManage/Expert/ExpertManagerEdit';
import DepartmentAdministerList from '../views/SysManage/DepartmentAdminister/DepartmentAdministerList'
import ProjectList from '../views/Project/Administer/ProjectList';
import ProjectInfoWithComInfo from "../views/Project/ProjectInfo_withComInfo"
import AchievementList from '../views/Achievements/AchievementList/AchievementList_admin';
import AchievementInfo from '../views/Achievements/AchievementInfo';
import ConfirmAchieveList from "../views/Achievements/ConfirmAchieveFrame"
import DDCompetitionList from '../views/SysManage/DDCompetitionList/DDCompetitionList';
import Chart from '../views/Charts/Chart';
import ThesisForm from "../views/Achievements/Thesis/ThesisForm"
import PatentForm from "../views/Achievements/Patent/PatentForm"
import CompetitionForm from "../views/Achievements/Competition/CompetitionForm"
import FiledAchieveList from "../views/Achievements/FiledAchieveFrame"
import ReviewRealCompetitionNameList from '../views/Achievements/Competition/RealName/ReviewRealCompetitionNameList';
//import BatchManager from '../views/BatchManage';

export const administerConfig = [

  {
    path: '/administer/competitions/xiao',
    component: CompetitionManagerXiao,
    isShow: true,
    title: '校级竞赛',
    exact: true
  }, {
    path: '/administer/competitionEdit',
    component: CompetitionEdit
  }, {
    path: '/administer/recommendedProjects',
    component: ProjectList,
    exact: true
  }, {
    path: '/administer/projects',
    component: ProjectList,
    exact: true
  }, {
    path: '/administer/projectInfoWithCompetitonInfo',
    component: ProjectInfoWithComInfo,
    exact: true
  }, {
    path: '/administer/projectDetail',
    component: ProjectDetail
  }, {
    path: '/administer/administers',
    component: DepartmentAdministerList,
    exact: true
  }, {
    path: '/administer/departments',
    component: DepartmentManager,
    exact: true
  },
  // {
  //   path: '/administer/teachers',
  //   component: TeacherManager,
  //   exact: true
  // },
  {
    path: '/administer/studentList',
    component: StudentList,
    exact: true
  }, {
    path: '/administer/Experts',
    component: ExpertManagerList,
    exact: true
  },
  {
    path: '/administer/ExpertsEdit',
    component: ExpertManagerEdit,
    exact: true
  },
  {
    path: '/administer/reviewCompetitionName',
    component: ReviewRealCompetitionNameList,
    //exact: true,
  },
  {
    path: '/administer/reviewList',
    component: AchievementList,
    //exact: true
  },
  {
    path: '/administer/achievementsInfo',
    component: AchievementInfo,
    //exact: true,
  },
  {
    path: '/administer/archievementList',
    component: ConfirmAchieveList,
    //exact: true,
  },
  {
    path: '/administer/DDBaseCompetitionList',
    component: DDCompetitionList,
    //exact: true
  },
  {
    path: '/administer/DDRealCompetitionList',
    component: DDCompetitionList,
    //exact: true
  },
  {
    path: '/administer/charts',
    component: Chart,
    exact: true
  },
  {
    path: '/administer/thesisForm',
    component: ThesisForm,
    exact: true,
  },
  {
    path: '/administer/patentForm',
    component: PatentForm,
    exact: true,
  },
  {
    path: '/administer/competitionForm',
    component: CompetitionForm,
    exact: true,
  },
  {
    path: '/administer/filedAchievements',
    component: FiledAchieveList,
    exact: true,
  },
  
  // {
  //   path: '/administer/batch',
  //   component: BatchManager,
  //   exact: true
  // }

  // {
  //   path: '/administer/AnnouncementList',
  //   component: AnnouncementList,
  //   exact: true
  // },
  // {
  //   path: '/administer/AnnouncementEdit',
  //   component: AnnouncementEdit,
  //   exact: true
  // }
]

