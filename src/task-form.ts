/**
 * タスク追加ボタン押下時に発火する関数の型
 * @param inputValue 入力値
 */
type RegisterAddTaskButtonClickEventCallbackType = (inputValue: string) => void;

/** タスク登録フォーム */
export class TaskForm {
  /** タスク名入力フォーム */
  private taskInput: HTMLInputElement;
  /** タスク追加ボタン */
  private addTaskButton: HTMLButtonElement;

  constructor() {
    this.taskInput = document.querySelector('#task-input')!
    this.addTaskButton = document.querySelector('#add-button')!
  }

  /** タスク追加ボタン押下イベントで発火する関数を登録 */
  registerAddTaskButtonClickEventFunc(f: RegisterAddTaskButtonClickEventCallbackType): void {
    this.addTaskButton.addEventListener('click', () => {
      f(this.taskInput.value);
    })
  }
}
