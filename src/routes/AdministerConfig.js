
import CompetitionManager from '../views/administers/CompetitionManager'
import CompetitionEdit from '../views/administers/CompetitionEdit'
import ProjectManager from '../views/administers/ProjectManager'
import ProjectDetail from '../views/administers/ProjectDetail'
import AdministerManager from '../views/administers/AdministerManager';
import DepartmentManager from '../views/administers/DepartmentManager';
import TeacherManager from '../views/administers/TeacherManager';
import StudentManager from '../views/administers/StudentManager';



export const administerConfig = [
  {
  path: '/administer/',
  component: CompetitionManager,
  isShow:true,
  title:'学生竞赛',
  exact: true
}, 
{
  path: '/administer/competitions',
  component: CompetitionManager,
  isShow:true,
  title:'学生竞赛',
  exact: true
}, {
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
  component: AdministerManager,
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
}]

