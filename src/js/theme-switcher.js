export function initThemeToggle(buttonSelector) {
  const toggleBtn = document.querySelector(buttonSelector);
  const body = document.body;
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    body.classList.add('theme-dark');
  } else {
    body.classList.remove('theme-dark');
  }

  toggleBtn?.addEventListener('click', () => {
    body.classList.toggle('theme-dark');
    const theme = body.classList.contains('theme-dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
  });
}
