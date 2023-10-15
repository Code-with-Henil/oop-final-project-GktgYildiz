import { Component } from "../components/BaseComponent.js";
import { Project } from "../models/Project.js";

export class ProjectItem extends Component<HTMLDivElement, HTMLElement> {
  private project: Project;
  constructor(hostId: string, project: Project) {
    super("single-project", hostId, project.id);
    this.project = project;
    this.configure();
    this.renderContent();
  }
  configure(): void {}
  renderContent() {
    const thisEl = this.element;
    thisEl.querySelector("h2")!.textContent = this.project.title;
    thisEl.querySelector("h3")!.textContent = this.project.people.toString();
    thisEl.querySelector("p")!.textContent = this.project.description;
  }
}
