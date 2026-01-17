// Theme switching
const girlMode = document.getElementById('girlMode');
const boyMode = document.getElementById('boyMode');

girlMode.addEventListener('click', () => {
  document.body.classList.remove('default-mode', 'boy-mode');
  document.body.classList.add('girl-mode');
});

boyMode.addEventListener('click', () => {
  document.body.classList.remove('default-mode', 'girl-mode');
  document.body.classList.add('boy-mode');
});

// Navigation buttons
document.getElementById('enrichBtn').addEventListener('click', () => {
  window.location.href = 'enrich.html';
});

document.getElementById('browseBtn').addEventListener('click', () => {
  window.location.href = 'browse.html';
});
