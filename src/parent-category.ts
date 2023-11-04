import { Category } from './category';
import { BoxIdLiteral, TodoItem } from './todo-item';

export class ParentCategory {
  private dialog: HTMLDialogElement;
  private selectInput: HTMLSelectElement;
  private changeButton: HTMLButtonElement;
  private removeButton: HTMLButtonElement;
  private notStartedYetCategory: Category;
  private wipCategory: Category;
  private finishCategory: Category;

  private currentSelectItem: TodoItem | null = null;

  constructor() {
    this.dialog = document.querySelector('#item-operate-dialog')!;
    this.selectInput = document.querySelector('#select-new-state')!;
    this.changeButton = document.querySelector('#change-button')!;
    this.removeButton = document.querySelector('#remove-button')!;
    this.notStartedYetCategory = new Category('not-started-yet');
    this.wipCategory = new Category('wip');
    this.finishCategory = new Category('finish');

    this.dialog.addEventListener('close', () => {
      if (this.currentSelectItem === null) {
        throw Error('[ParentCategory.constructor] this.currentSelectItem = null');
      }

      switch (this.dialog.returnValue) {
        case 'not-started-yet':
          this.moveItem('not-started-yet');
          break;
        case 'wip':
          this.moveItem('wip');
          break;
        case 'finish':
          this.moveItem('finish');
          break;
        case 'remove':
          this.deleteItem();
          break;
        default:
          return;
      }

      this.currentSelectItem = null;
    });

    this.changeButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.dialog.close(this.selectInput.value);
    });

    this.removeButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.dialog.close('remove');
    })
  }

  appendNewTask(taskName: string): void {
    const todoItem = new TodoItem(
      taskName,
      (_event, todoItem) => {
        this.currentSelectItem = todoItem;
        this.selectInput.value = todoItem.currentGroup;
        this.dialog.showModal();
      }
    );
    this.notStartedYetCategory.appendTodo(todoItem);
  }

  private moveItem(category: BoxIdLiteral): void {
    if (this.currentSelectItem === null) {
      throw Error('[ParentCategory.moveItem] this.currentSelectItem = null');
    }

    this.deleteItemInCategory();

    switch (category) {
      case 'not-started-yet':
        this.notStartedYetCategory.appendTodo(this.currentSelectItem);
        break;
      case 'wip':
        this.wipCategory.appendTodo(this.currentSelectItem);
        break;
      case 'finish':
        this.finishCategory.appendTodo(this.currentSelectItem);
        break;
    }

    this.currentSelectItem = null;
  }

  private deleteItem(): void {
    if (this.currentSelectItem === null) {
      throw Error('[ParentCategory.deleteItem] this.currentSelectItem = null');
    }

    this.currentSelectItem.remove();
    this.deleteItemInCategory();
    this.currentSelectItem = null;
  }

  private deleteItemInCategory(): void {
    if (this.currentSelectItem === null) {
      throw Error('[ParentCategory.deleteItemInCategory] this.currentSelectItem = null');
    }

    switch (this.currentSelectItem.currentGroup) {
      case 'not-started-yet':
        this.notStartedYetCategory.deleteTodo(this.currentSelectItem.uuid);
        break;
      case 'wip':
        this.wipCategory.deleteTodo(this.currentSelectItem.uuid);
        break;
      case 'finish':
        this.finishCategory.deleteTodo(this.currentSelectItem.uuid);
        break;
    }
  }
}
