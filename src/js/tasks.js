export let tasks = [];

export function createTask(title, body) {
  return {
    id: Date.now().toString(),
    title,
    body,
  };
}

export function addTask(task) {
  tasks.push(task);
}

export function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
}
