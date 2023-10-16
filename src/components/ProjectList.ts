import { Component } from "../components/BaseComponent.js";
import { Project, ProjectStatus } from "../models/Project.js";
import { projectState } from "./ProjectState.js";
import { ProjectItem } from "./ProjectItem.js";

class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  assignedProjects: Project[] = [];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", `${type}-projects`);
    this.assignedProjects = [];
    this.configure();
    this.renderContent();
  }
  configure() {
    projectState.addListener((projects: Project[]) => {
      const filterProjects = projects.filter((project: Project) => {
        if (this.type === "active") {
          return project.status === ProjectStatus.Active;
        } else {
          return project.status === ProjectStatus.Finished;
        }
      });
      this.assignedProjects = filterProjects;
      this.renderProjects();
    });
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    listEl.innerHTML = "";
    for (const prjItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
    }
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    const ulElement = this.element.querySelector("ul");

    if (ulElement) {
      ulElement.id = listId;
    }

    const h2element = this.element.querySelector("h2");

    if (h2element) {
      h2element.textContent = this.type.toUpperCase() + " PROJECTS";
    }
  }
}

export default ProjectList;
