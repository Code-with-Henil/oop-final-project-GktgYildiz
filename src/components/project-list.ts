import { Project, ProjectStatus } from "../models/Project.js";
import { projectState } from "./ProjectState.js";

class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  private element: HTMLFormElement;
  assignedProjects: Project[] = [];

  constructor(private type: "active" | "finished") {
    this.templateElement = document.getElementById(
      "project-list"
    ) as HTMLTemplateElement;
    this.hostElement = document.getElementById("app") as HTMLDivElement;

    // Get the content of the template
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    // Get the form element from the template
    this.element = importedNode.firstElementChild as HTMLFormElement;
    // Add a new id to the form
    this.element.id = `${this.type}-projects`;

    projectState.addListener((projects: Project[]) => {
      this.assignedProjects = projects.filter((project: Project) => {
        if (this.type === "active") {
          return project.status === ProjectStatus.Active;
        } else {
          return project.status === ProjectStatus.Finished;
        }
      });
      this.renderProjects();
    });
    this.attach();
    this.renderContent();
  }

  private attach() {
    this.hostElement.append(this.element);
  }
  private renderProjects() {
    const listElements = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    listElements.innerHTML = "";
    for (const Item of this.assignedProjects) {
      const listItem = document.createElement("li");
      listItem.textContent = Item.title;
      listElements.appendChild(listItem);
    }
  }
  private renderContent() {
    const listId = `${this.type}-projects-list`;
    const ulElement = this.element.querySelector("ul")!; // non-null assertion operator (!) https://stackoverflow.com/a/40350534
    ulElement.id = listId;
    const h2element = this.element.querySelector("h2")!; // non-null assertion operator (!) https://stackoverflow.com/a/40350534
    h2element.textContent = this.type.toUpperCase() + "  PROJECTS";
  }
}
export default ProjectList;
