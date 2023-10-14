class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    private element: HTMLFormElement;
    private attach() {
      this.hostElement.append(this.element);
    }
  
    constructor() {
      this.templateElement = document.getElementById(
        "project-input"
      ) as HTMLTemplateElement;
      this.hostElement = document.getElementById("app") as HTMLDivElement;
  
      console.log(this.templateElement);
      console.log(this.hostElement);
      // Get the content of the template
      const importedNode = document.importNode(
        this.templateElement.content,
        true
      );
      // Get the form element from the template
      this.element = importedNode.firstElementChild as HTMLFormElement;
      // Add a new id to the form
      this.element.id = "user-input";
      // Attach the form to the host element
      this.attach();
    }
  }
  export default ProjectInput;
  