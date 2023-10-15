class ProjectState {
  private projects: any[] = [];
  private listeners: any[] = [];
  private static instance: ProjectState | null = null;

  private constructor() {}

  static getInstance(): ProjectState {
    if (!this.instance) {
      this.instance = new ProjectState();
    }
    return this.instance;
  }
  addProject(title: string, description: string, people: number) {
    const addProject = {
      id: Math.random().toString(),
      title,
      description,
      people,
    };
    this.projects.push(addProject);

    this.listeners.forEach((listener) => {
      listener([...this.projects]);
    });
  }
  addListener(listenerFn: (projects: any[]) => void) {
    this.listeners.push(listenerFn);
  }
}
export const projectState = ProjectState.getInstance();
