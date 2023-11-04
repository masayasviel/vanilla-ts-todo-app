/**
 * アイテムクリック時イベントで発火する関数の型
 * @param event クリック時イベント
 * @param todoItem this
 */
type ClickEvent = (event: MouseEvent, todoItem: TodoItem) => void;
/** カテゴリの種別、およびそれぞれのID */
export type BoxIdLiteral = 'not-started-yet' | 'wip' | 'finish';

/** タスク */
export class TodoItem {
  /** タスクを一意に示すID */
  uuid: string;
  /** 現在所属するグループ */
  currentGroup: BoxIdLiteral = 'not-started-yet';
  /** Node */
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

  /** 自身を削除 */
  remove(): void {
    if (this.elm) {
      this.elm.remove();
      this.elm = null;
    } else {
      throw Error('[TodoItem.remove] this.elm = null');
    }
  }
}
