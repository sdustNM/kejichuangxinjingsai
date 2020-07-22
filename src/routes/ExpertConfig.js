import CompetitionList from "../views/Experts/CompetitionList";
import ProjectList from "../views/Experts/ProjectList";

export const expertConfig = [{
    path: '/expert/',
    component: CompetitionList,
    exact: true,
  },
  {
    path: '/expert/projectList',
    component: ProjectList,
    exact: true,
  },
  {
    path: '/expert/project',
    component: CompetitionList,
    exact: true,
  }]


  //to do wcgit