import { Component } from "../components/BaseComponent.js";
import { Project, ProjectStatus } from "../models/Project.js";
import { projectState } from "./ProjectState.js";

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
    const listElements = this.element.querySelector(
      `#${this.type}-projects-list`
    ) as HTMLUListElement;

    if (!listElements) {
      return;
    }

    listElements.innerHTML = "";
    for (const project of this.assignedProjects) {
      const listItem = document.createElement("li");
      listItem.textContent = project.title;
      listElements.appendChild(listItem);
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
