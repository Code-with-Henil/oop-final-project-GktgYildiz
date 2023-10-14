import ProjectInput from "./components/ProjectInput.js";
import ProjectList from "./components/project-list.js";

document.addEventListener("DOMContentLoaded", () => {
  const projectInput = new ProjectInput();
  console.log(projectInput);
  const ProjectListActive = new ProjectList("active");
  console.log(ProjectListActive);
  const ProjectListFinished = new ProjectList("finished");
  console.log(ProjectListFinished);
});
