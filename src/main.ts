import { TaskForm } from './task-form';
import { ParentCategory } from './parent-category';

function main(): void {
  const taskForm = new TaskForm();
  const parentCategory = new ParentCategory();
  taskForm.registerAddTaskButtonClickEventFunc((inputValue) => {
    parentCategory.appendNewTask(inputValue);
  });
}

window.addEventListener('load', main);
