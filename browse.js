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

// Load notes from JSON
let notes = [];

async function loadNotes() {
  try {
    const res = await fetch('notes.json'); // fetch from JSON file
    notes = await res.json();
    displayNotes(notes);
  } catch (err) {
    console.error('Failed to load notes:', err);
    document.getElementById('notesList').innerHTML = '<p>Failed to load notes.</p>';
  }
}

// Display notes
function displayNotes(list) {
  const notesList = document.getElementById('notesList');
  notesList.innerHTML = '';
  if(list.length === 0){
    notesList.innerHTML = '<p>No notes found.</p>';
    return;
  }

  list.forEach(note => {
    const div = document.createElement('div');
    div.className = 'note';
    div.innerHTML = `<h3>${note.title}</h3><p>${note.content}</p>`;
    notesList.appendChild(div);
  });
}

// Search functionality
document.getElementById('searchInput').addEventListener('input', (e) => {
  const term = e.target.value.toLowerCase();
  const filtered = notes.filter(n => n.title.toLowerCase().includes(term) || n.content.toLowerCase().includes(term));
  displayNotes(filtered);
});

// Initial load
loadNotes();
