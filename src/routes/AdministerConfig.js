
import CompetitionEdit from '../views/administers/Competition/CompetitionEdit'
import ProjectManager from '../views/administers/ProjectManager'
import ProjectDetail from '../views/administers/ProjectDetail'
import DepartmentManager from '../views/administers/Department/DepartmentManager';
import TeacherManager from '../views/administers/TeacherManager';
import StudentManager from '../views/administers/StudentManager';
import CompetitionManagerXiao from '../views/administers/Competition/CompetitionManagerXiao'
import CompetitionManagerYuan from '../views/administers/Competition/CompetitionManagerYuan';
import ExpertManagerList from '../views/administers/Expert/ExpertManagerList';
import ExpertManagerEdit from '../views/administers/Expert/ExpertManagerEdit';
import DepartmentAdministerList from '../views/administers/DepartmentAdminister/DepartmentAdministerList'



export const administerConfig = [
  
{
  path: '/administer/competitions/xiao',
  component: CompetitionManagerXiao,
  isShow:true,
  title:'校级竞赛',
  exact: true
},{
  path: '/administer/competitions/yuan',
  component: CompetitionManagerYuan,
  isShow:true,
  title:'院级竞赛',
  exact: true
},  {
  path: '/administer/competitionEdit',
  component: CompetitionEdit
}, {
  path: '/administer/projects',
  component: ProjectManager,
  exact: true
}, {
  path: '/administer/projectDetail',
  component: ProjectDetail
},{
  path: '/administer/administers',
  component: DepartmentAdministerList,
  exact: true
},{
  path: '/administer/departments',
  component: DepartmentManager,
  exact: true
},{
  path: '/administer/teachers',
  component: TeacherManager,
  exact: true
},{
  path: '/administer/students',
  component: StudentManager,
  exact: true
},{
  path: '/administer/Experts',
  component: ExpertManagerList,
  exact: true
},{
  path: '/administer/ExpertsEdit',
  component: ExpertManagerEdit,
  exact: true
}
]

