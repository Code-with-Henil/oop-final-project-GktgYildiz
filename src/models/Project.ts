//to make sure that status are only active and finished.
enum ProjectStatus {
  Active,
  Finished,
}
class Project {
  id: string;
  title: string;
  description: string;
  people: number;
  status: ProjectStatus;
  constructor(
    id: string,
    title: string,
    description: string,
    people: number,
    status: ProjectStatus
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.people = people;
    this.status = status;
  }
}
export { Project, ProjectStatus };
