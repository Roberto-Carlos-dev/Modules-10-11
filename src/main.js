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

// 1. Імпортую потрібні функції та змінні
import { renderTask, renderAllTasks } from './js/render-tasks.js';// функції для відображення завдань
import { saveTasks, loadTasksFromStorage } from './js/local-storage-api.js';// для збереження і завантаження з localStorage
import { createTask, addTask, deleteTask, tasks } from './js/tasks.js';// логіка для створення/додавання/видалення задач
import { refs } from './js/refs.js';// збережені посилання на DOM-елементи
import { initThemeToggle } from './js/theme-switcher.js';// перемикач теми (світла/темна)

// 2. Асинхронна функція для завантаження HTML-частин (partials) з папки partials
async function loadPartials() {
  try {
    const headerRes = await fetch('./partials/header.html'); // завантажуємо header.html
    const headerHtml = await headerRes.text(); // читаємо як текст
    document.getElementById('header-placeholder').innerHTML = headerHtml; // вставляємо у DOM

    const tasksRes = await fetch('./partials/tasks-list.html'); // завантажуємо tasks-list.html
    const tasksHtml = await tasksRes.text(); // читаємо як текст
    document.getElementById('tasks-placeholder').innerHTML = tasksHtml; // вставляємо у DOM
  } catch (err) {
    console.error('Помилка завантаження partials:', err); // обробка помилки завантаження
  }
}

// 3. Обробник події submit форми для додавання завдання
function onFormSubmit(e) {
  e.preventDefault(); // скасування стандартної поведінки
  const title = refs.titleInput.value.trim(); // отримуюю заголовок
  const description = refs.bodyInput.value.trim(); // отримую опис

  if (!title || !description) return; // якщо пусто — нічого не роблю

  const task = createTask(title, description); // створюю об'єкт завдання
  addTask(task); // додаю до масиву tasks
  renderTask(task); // відображаю завдання в DOM
  saveTasks(tasks); // зберігаю tasks у localStorage

  refs.form.reset(); // очищаю форму після додавання
}

// 4. Обробник кліків для видалення завдання
function onTaskListClick(e) {
  if (!e.target.classList.contains('task-list-item-btn')) return; // перевіряємо чи клік був по кнопці Delete
  const item = e.target.closest('li'); // знаходимо батьківський <li>
  const id = item.dataset.id; // зчитуємо id із data-атрибута
  deleteTask(id); // видаляємо завдання з масиву
  saveTasks(tasks); // оновлюємо localStorage
  item.remove(); // видаляємо з DOM
}

// 5. Ініціалізація застосунку після вставлення HTML-розмітки
loadPartials().then(() => {
  refs.form = document.querySelector('#task-form');
  refs.titleInput = document.querySelector('input[name="taskName"]');
  refs.bodyInput = document.querySelector('input[name="taskDescription"]');
  refs.taskList = document.querySelector('#task-list');; // ініціалізую перемикач теми
});