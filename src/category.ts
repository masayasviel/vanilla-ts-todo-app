import { TodoItem, BoxIdLiteral } from './todo-item';

/** カテゴリ */
export class Category {
  /** 所属するタスク一覧 */
  children: TodoItem[] = [];
  /** Node */
  private categoryBox: HTMLDivElement;

  /**
   * @param boxId カテゴリ種別
   */
  constructor(private readonly boxId: BoxIdLiteral) {
    this.categoryBox = document.querySelector(`#${boxId}`)!;
  }

  /**
   * タスクの追加
   * @param item タスク
   */
  appendTodo(item: TodoItem): void {
    if (item.elm) {
      item.currentGroup = this.boxId;
      this.children.push(item);
      this.refreshCategoryBox();
    } else {
      throw Error('[Category.appendTodo] item.elm = null');
    }
  }

  /**
   * タスクをカテゴリから削除
   * @param itemUuid タスクのUUID
   */
  deleteTodo(itemUuid: string): void {
    this.children = this.children.filter((child) => child.uuid !== itemUuid);
    this.refreshCategoryBox();
  }

  /** 画面表示のリフレッシュ */
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
