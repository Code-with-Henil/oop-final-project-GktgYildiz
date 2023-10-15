import { Validatable, validate } from "../helpers/validation.js";
import { projectState } from "./ProjectState.js";
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
    const titleValidatable: Validatable = {
      value: this.titleInputElement.value,
      required: true,
      minLength: 1,
    };

    const descriptionValidatable: Validatable = {
      value: this.descriptionInputElement.value,
      required: true,
      minLength: 3,
    };

    const peopleInputValue = +this.peopleInputElement.value;
    const peopleValidatable: Validatable = {
      value: peopleInputValue,
      required: true,
      min: 1,
      max: 10,
    };
    if (isNaN(+peopleInputValue)) {
      alert("Invalid Number of People!");
      return;
    }

    if (!validate(titleValidatable)) {
      alert("Invalid Title!");
      return;
    }

    if (!validate(descriptionValidatable)) {
      alert("Invalid Description!");
      return;
    }

    if (!validate(peopleValidatable)) {
      alert("Invalid Number of People!");
      return;
    }

    return [
      this.titleInputElement.value,
      this.descriptionInputElement.value,
      +this.peopleInputElement.value,
    ];
  }
  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    projectState.addProject(
      this.titleInputElement.value,
      this.descriptionInputElement.value,
      +this.peopleInputElement.value
    );
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
