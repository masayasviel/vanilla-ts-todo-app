import { TodoItem, BoxIdLiteral } from './todo-item';

export class Category {
  children: TodoItem[] = [];
  private categoryBox: HTMLDivElement;
  private readonly boxId: BoxIdLiteral;

  constructor(boxId: BoxIdLiteral) {
    this.categoryBox = document.querySelector(`#${boxId}`)!;
    this.boxId = boxId;
  }

  appendTodo(item: TodoItem): void {
    if (item.elm) {
      item.currentGroup = this.boxId;
      this.children.push(item);
      this.refreshCategoryBox();
    } else {
      throw Error('[Category.appendTodo] item.elm = null');
    }
  }

  deleteTodo(itemUuid: string): void {
    this.children = this.children.filter((child) => child.uuid !== itemUuid);
    this.refreshCategoryBox();
  }

  private refreshCategoryBox(): void {
    while (this.categoryBox.firstChild) {
      this.categoryBox.removeChild(this.categoryBox.firstChild);
    }
    this.children.forEach((child) => {
      if (child.elm) {
        this.categoryBox.appendChild(child.elm);
      }
    })
  }
}
