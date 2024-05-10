export class Todo {
  public id: number;
  constructor(public text: string, public completed?: boolean) {
    this.id = Math.random();
    this.completed = false;
  }
}
