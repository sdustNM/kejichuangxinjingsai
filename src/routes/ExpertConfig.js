import CompetitionList from "../views/Experts/CompetitionList";
import ProjectList from "../views/Experts/ProjectList";
import ProjectScore from "../views/Experts/ProjectScore";

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
    component: ProjectScore,
    exact: true,
  }]


  //to do wcgit