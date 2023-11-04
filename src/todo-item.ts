type ClickEvent = (event: MouseEvent, todoItem: TodoItem) => void;
export type BoxIdLiteral = 'not-started-yet' | 'wip' | 'finish';

export class TodoItem {
  uuid: string;
  currentGroup: BoxIdLiteral = 'not-started-yet';
  elm: HTMLDivElement | null = null;
  constructor(
    taskName: string,
    clickEvent: ClickEvent
  ) {
    this.uuid = crypto.randomUUID();
    const div = document.createElement('div');
    div.textContent = taskName;
    div.addEventListener(
      'click',
      (event) => clickEvent(event, this)
    );
    this.elm = div;
  }

  remove(): void {
    if (this.elm) {
      this.elm.remove();
      this.elm = null;
    } else {
      throw Error('[TodoItem.remove] this.elm = null');
    }
  }
}
