import { Project, ProjectStatus } from "../models/Project.js";
type Listener = (project: Project[]) => void;
class ProjectState {
  private projects: Project[] = [];
  private listeners: Listener[] = [];
  private static instance: ProjectState | null = null;

  private constructor() {}

  static getInstance(): ProjectState {
    if (!this.instance) {
      this.instance = new ProjectState();
    }
    return this.instance;
  }
  addProject(title: string, description: string, people: number) {
    const addProject = new Project(
      Math.random().toString(),
      title,
      description,
      people,
      ProjectStatus.Active
    );
    this.projects.push(addProject);
    this.updateListeners();
  }
  updateListeners() {
    this.listeners.forEach((listener) => {
      listener([...this.projects]);
    });
  }
  addListener(listenerFn: Listener) {
    this.listeners.push(listenerFn);
  }
  moveProject(projectId: string, newStatus: ProjectStatus) {
    const foundProject = this.projects.find((p) => p.id === projectId);
    if (foundProject !== undefined && newStatus !== foundProject.status) {
      foundProject.status = newStatus;
      this.updateListeners();
    }
  }
}
export const projectState = ProjectState.getInstance();
