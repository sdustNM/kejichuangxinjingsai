
import CompetitionEdit from '../views/Competition/CompetitionEdit'
import ProjectManager from '../views/SysManage/ProjectManager'
import ProjectDetail from '../views/SysManage/ProjectDetail'
import DepartmentManager from '../views/SysManage/Department/DepartmentManager';
import StudentList from '../views/SysManage/StudentList';
import CompetitionManagerXiao from '../views/Competition/CompetitionManagerXiao'
import CompetitionManagerYuan from '../views/Competition/CompetitionManagerYuan';
import ExpertManagerList from '../views/SysManage/Expert/ExpertManagerList';
import ExpertManagerEdit from '../views/SysManage/Expert/ExpertManagerEdit';
import DepartmentAdministerList from '../views/SysManage/DepartmentAdminister/DepartmentAdministerList'



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

