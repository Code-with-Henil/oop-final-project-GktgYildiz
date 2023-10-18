import { Component } from "../components/BaseComponent.js";
import { Project, ProjectStatus } from "../models/Project.js";
import { projectState } from "./ProjectState.js";
import { ProjectItem } from "./ProjectItem.js";
import { DragTarget } from "../helpers/DragDrop.js";
import { Autobind } from "../decorator/autobind.js";

class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: Project[] = [];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", `${type}-projects`);
    this.assignedProjects = [];
    this.configure();
    this.renderContent();
  }
  @Autobind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
    }
    const listEl = this.element.querySelector("ul");
    listEl?.classList.add("droppable");
  }
  @Autobind
  dropHandler(event: DragEvent) {
    const projectId = event.dataTransfer!.getData("text/plain");
    console.log(projectId);
  }
  @Autobind
  dragLeaveHandler() {
    console.log("drag leave");
    const listEl = this.element.querySelector("ul");
    listEl?.classList.remove("droppable");
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
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("drop", this.dropHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
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
