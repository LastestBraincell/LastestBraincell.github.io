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

// Save note
document.getElementById('saveNoteBtn').addEventListener('click', () => {
  const title = document.getElementById('noteTitle').value.trim();
  const content = document.getElementById('noteContent').value.trim();

  if (!title || !content) {
    alert('Please enter both a title and content!');
    return;
  }

  const newNote = {
    id: Date.now().toString(),
    title,
    content
  };

  // For now, just log the note (we'll connect GitHub API later)
  console.log('New note to save:', newNote);

  alert('Note added! (simulated save)');

  // Clear inputs
  document.getElementById('noteTitle').value = '';
  document.getElementById('noteContent').value = '';
});
