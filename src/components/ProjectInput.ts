const Autobind = (
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor
) => {
  // console.log("descriptor", descriptor);
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjustedDescriptor;
};

class ProjectInput {
  //step 1
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  private element: HTMLFormElement;
  //step 2
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
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
    this.element.id = "user-input";
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;
    // Attach the form to the host element
    this.attach();
    this.configure();
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler.bind(this));
  }
  private attach() {
    this.hostElement.append(this.element);
  }
  private gatherUserInput(): [string, string, number] | void {
    const userTitleInput = this.titleInputElement.value;
    const userDescriptionInput = this.descriptionInputElement.value;
    const userPeopleInputString = this.peopleInputElement.value;
    const userPeopleInput = Number(userPeopleInputString);
    if (
      userTitleInput.trim().length === 0 ||
      userDescriptionInput.trim().length === 0 ||
      isNaN(userPeopleInput) ||
      userPeopleInput <= 0
    ) {
      alert("Invalid Input!");
      return;
    }
    return [userTitleInput, userDescriptionInput, userPeopleInput];
  }
  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      console.log(title, description, people);
      this.clearInputs();
    }
  }
}

// const prjInput = new ProjectInput();
export default ProjectInput;
