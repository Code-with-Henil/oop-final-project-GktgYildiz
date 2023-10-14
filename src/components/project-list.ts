class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  private element: HTMLFormElement;
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

    this.attach();
    this.renderContent();
  }

  private attach() {
    this.hostElement.append(this.element);
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
