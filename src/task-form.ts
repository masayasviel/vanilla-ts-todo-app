type RegisterAddTaskButtonClickEventCallbackType = (inputValue: string) => void;

export class TaskForm {
  private taskInput: HTMLInputElement;
  private addTaskButton: HTMLButtonElement;

  constructor() {
    this.taskInput = document.querySelector('#task-input')!
    this.addTaskButton = document.querySelector('#add-button')!
  }

  registerAddTaskButtonClickEventFunc(f: RegisterAddTaskButtonClickEventCallbackType): void {
    this.addTaskButton.addEventListener('click', () => {
      f(this.taskInput.value);
    })
  }
}
