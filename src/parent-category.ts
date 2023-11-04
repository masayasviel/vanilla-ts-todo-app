import { Category } from './category';
import { BoxIdLiteral, TodoItem } from './todo-item';

/** カテゴリ全体を統括 */
export class ParentCategory {
  /** ダイアログ */
  private dialog: HTMLDialogElement;
  /** [ダイアログ]セレクトボックス */
  private selectInput: HTMLSelectElement;
  /** [ダイアログ]変更ボタン */
  private changeButton: HTMLButtonElement;
  /** [ダイアログ]削除ボタン */
  private removeButton: HTMLButtonElement;
  /** 未着手カテゴリ */
  private notStartedYetCategory: Category;
  /** 進行中カテゴリ */
  private wipCategory: Category;
  /** 完了カテゴリ */
  private finishCategory: Category;

  /** 現在選択中タスク */
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
        case 'wip':
        case 'finish':
          this.moveItem(this.dialog.returnValue);
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

  /**
   * 新アイテム追加
   * @param taskName タスク名
   * @note 新アイテムの追加は仕様上未着手にしか入らない
   */
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

  /**
   * アイテムの移動
   * @param category 移動先カテゴリ
   */
  private moveItem(category: BoxIdLiteral): void {
    if (this.currentSelectItem === null) {
      throw Error('[ParentCategory.moveItem] this.currentSelectItem = null');
    }

    this.removeItemInCategory();

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

  /** タスクの削除 */
  private deleteItem(): void {
    if (this.currentSelectItem === null) {
      throw Error('[ParentCategory.deleteItem] this.currentSelectItem = null');
    }

    this.currentSelectItem.remove();
    this.removeItemInCategory();
    this.currentSelectItem = null;
  }

  /** カテゴリからタスクを取り除く */
  private removeItemInCategory(): void {
    if (this.currentSelectItem === null) {
      throw Error('[ParentCategory.removeItemInCategory] this.currentSelectItem = null');
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
