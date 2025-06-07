const TASKS_KEY = 'tasks';

export function saveTasks(tasks) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

export function loadTasksFromStorage() {
  const saved = localStorage.getItem(TASKS_KEY);
  return saved ? JSON.parse(saved) : [];
}
