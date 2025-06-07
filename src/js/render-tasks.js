import { refs } from './refs.js';

export function renderTask(task) {
  const li = document.createElement('li');
  li.classList.add('task-list-item');
  li.dataset.id = task.id;
  li.innerHTML = `
    <button class="task-list-item-btn">Delete</button>
    <h3>${task.title}</h3>
    <p>${task.body}</p>
  `;
  refs.taskList.appendChild(li);
}

export function renderAllTasks(tasks) {
  refs.taskList.innerHTML = '';
  tasks.forEach(renderTask);
}
