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

// Load hierarchical notes
let notes = [];

async function loadNotes() {
  try {
    const res = await fetch('data.json');
    notes = await res.json();
    displayTopics(notes);
  } catch (err) {
    console.error('Failed to load notes:', err);
    document.getElementById('notesList').innerHTML = '<p>Failed to load notes.</p>';
  }
}

// Display topics and nested tickets
function displayTopics(list) {
  const notesList = document.getElementById('notesList');
  notesList.innerHTML = '';

  if (list.length === 0) {
    notesList.innerHTML = '<p>No topics found.</p>';
    return;
  }

  list.forEach(topic => {
    const topicDiv = document.createElement('div');
    topicDiv.className = 'topic';

    const title = document.createElement('h3');
    title.textContent = topic.title;
    topicDiv.appendChild(title);

    const ticketsDiv = document.createElement('div');
    ticketsDiv.className = 'tickets';

    topic.tickets.forEach(ticket => {
      const ticketDiv = document.createElement('div');
      ticketDiv.className = 'ticket';
      ticketDiv.textContent = ticket.content;
      ticketsDiv.appendChild(ticketDiv);
    });

    topicDiv.appendChild(ticketsDiv);

    // Expand/collapse on topic click
    title.addEventListener('click', () => {
      ticketsDiv.style.display = ticketsDiv.style.display === 'none' ? 'block' : 'none';
    });

    notesList.appendChild(topicDiv);
  });
}

// Search topics & tickets
document.getElementById('searchInput').addEventListener('input', (e) => {
  const term = e.target.value.toLowerCase();

  const filtered = notes.filter(topic => 
    topic.title.toLowerCase().includes(term) ||
    topic.tickets.some(ticket => ticket.content.toLowerCase().includes(term))
  );

  displayTopics(filtered);
});

// Initial load
loadNotes();
