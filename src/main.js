/*
  Створи список справ.
  На сторінці є два інпути які має вводиться назва і текст задачі.
  Після натискання на кнопку "Add" завдання додається до списку #task-list.

  У кожної картки має бути кнопка "Delete", щоб можна було
  прибрати завдання зі списку.
  Список із завданнями має бути доступним після перезавантаження сторінки.

  Розмітка картки задачі
  <li class="task-list-item">
      <button class="task-list-item-btn">Delete</button>
      <h3>Заголовок</h3>
      <p>Текст</p>
  </li>
*/


// Функція завантаження і вставлення HTML частин (partials)
async function loadPartials() {
  try {
    // Завантаження header.html
    const headerRes = await fetch('./partials/header.html');
    const headerHtml = await headerRes.text();
    document.getElementById('header-placeholder').innerHTML = headerHtml;

    // Завантаження tasks-list.html
    const tasksRes = await fetch('./partials/tasks-list.html');
    const tasksHtml = await tasksRes.text();
    document.getElementById('tasks-placeholder').innerHTML = tasksHtml;
  } catch (error) {
    console.error('Помилка завантаження partials:', error);
  }
}

// Запускаємо завантаження одразу при старті
loadPartials();
let tasks = []; // масив для збереження завдань

// функція створення розмітки завдання
function createTaskMarkup(title, description) {
  return `
    <li class="task-list-item">
      <button class="task-list-item-btn">Delete</button>
      <h3>${title}</h3>
      <p>${description}</p>
    </li>
  `;
}

// додавання завдання
function handleAddTask(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const title = form.elements.taskName.value.trim();
  const description = form.elements.taskDescription.value.trim();

  if (!title || !description) return;

  const markup = createTaskMarkup(title, description);

  const list = document.querySelector('#task-list');
  list.insertAdjacentHTML('beforeend', markup);

  tasks.push({ title, description });
  localStorage.setItem('tasks', JSON.stringify(tasks));

  form.reset(); // очищення форми
}

// видалення завдання
import { renderTask, renderAllTasks } from './js/renderTasks.js';
import { saveTasks, loadTasksFromStorage } from './js/localStorageApi.js';
import { createTask, addTask, deleteTask, tasks } from './js/tasks.js';
import { refs } from './js/refs.js';
import { initThemeToggle } from './js/theme-switcher.js';


// Додаємо HTML-партіали
async function loadPartials() {
  try {
    const headerRes = await fetch('./partials/header.html');
    const headerHtml = await headerRes.text();
    document.getElementById('header-placeholder').innerHTML = headerHtml;

    const tasksRes = await fetch('./partials/tasks-list.html');
    const tasksHtml = await tasksRes.text();
    document.getElementById('tasks-placeholder').innerHTML = tasksHtml;
  } catch (err) {
    console.error('Помилка завантаження partials:', err);
  }
}

function onFormSubmit(e) {
  e.preventDefault();
  const title = refs.titleInput.value.trim();
  const description = refs.bodyInput.value.trim();

  if (!title || !description) return;

  const task = createTask(title, description);
  addTask(task);
  renderTask(task);
  saveTasks(tasks);

  refs.form.reset();
}

function onTaskListClick(e) {
  if (!e.target.classList.contains('task-list-item-btn')) return;
  const item = e.target.closest('li');
  const id = item.dataset.id;
  deleteTask(id);
  saveTasks(tasks);
  item.remove();
}

loadPartials().then(() => {
  const loadedTasks = loadTasksFromStorage();
  loadedTasks.forEach(addTask);
  renderAllTasks(tasks);
  refs.form.addEventListener('submit', onFormSubmit);
  refs.taskList.addEventListener('click', onTaskListClick);
  initThemeToggle('#themeToggle');
});