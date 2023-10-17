import { Component } from "../components/BaseComponent.js";
import { Validatable, validate } from "../helpers/validation.js";
import { projectState } from "./ProjectState.js";
import { Autobind } from "../decorator/autobind.js";

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", "user-input");
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
  }
  configure() {
    this.element.addEventListener("submit", this.submitHandler.bind(this));
  }
  renderContent() {}

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
