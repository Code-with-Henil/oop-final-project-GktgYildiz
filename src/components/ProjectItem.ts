import { Component } from "../components/BaseComponent.js";
import { Project } from "../models/Project.js";
import { Draggable } from "../helpers/DragDrop.js";
import { Autobind } from "../decorator/autobind.js";
export class ProjectItem
  extends Component<HTMLDivElement, HTMLElement>
  implements Draggable
{
  private project: Project;
  constructor(hostId: string, project: Project) {
    super("single-project", hostId, project.id);
    this.project = project;
    this.configure();
    this.renderContent();
  }
  get members(): string {
    if (this.project.people === 1) {
      return `1 member assigned`;
    } else {
      return `${this.project.people} members assigned`;
    }
  }
  @Autobind
  dragStartHandler() {
    console.log("drag start");
  }
  @Autobind
  dragEndHandler() {
    console.log("drag end");
  }

  configure(): void {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent() {
    const thisEl = this.element;
    thisEl.querySelector("h2")!.textContent = this.project.title;
    thisEl.querySelector("h3")!.textContent = this.members;
    thisEl.querySelector("p")!.textContent = this.project.description;
  }
}
