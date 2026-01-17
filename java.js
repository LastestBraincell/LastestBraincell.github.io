let data = null;
let selectedTopic = null;

async function loadData() {
  const res = await fetch('./data/topics.json');
  data = await res.json();
}

loadData().then(() => renderBrowse());

function showAdd() {
  document.getElementById('addSection').classList.remove('hidden');
  document.getElementById('browseSection').classList.add('hidden');
}

function showBrowse() {
  document.getElementById('browseSection').classList.remove('hidden');
  document.getElementById('addSection').classList.add('hidden');
  renderBrowse();
}

function searchTopic() {
  const q = document.getElementById('topicSearch').value.toLowerCase();
  const results = data.topics.filter(t => t.title.toLowerCase().includes(q));
  
  let html = results.map(t => 
    `<div class="topicCard" onclick="selectTopic('${t.id}')">${t.title}</div>`
  ).join('');

  if (!results.length && q.length > 1) {
    html += `<button onclick="createTopic('${q}')">Create new topic "${q}"</button>`;
  }

  document.getElementById('searchResults').innerHTML = html;
}

function selectTopic(id) {
  selectedTopic = data.topics.find(t => t.id === id);
  document.getElementById('editorSection').classList.remove('hidden');
  document.getElementById('editorTitle').innerText = selectedTopic.title;
}

function createTopic(title) {
  const id = title.toLowerCase().replace(/\s+/g, '_');
  selectedTopic = { id, title, entries: [] };
  data.topics.push(selectedTopic);
  document.getElementById('editorSection').classList.remove('hidden');
  document.getElementById('editorTitle').innerText = title;
}

function cmd(command) {
  document.execCommand(command, false, null);
}

function addEntry() {
  const html = document.getElementById('editor').innerHTML;
  selectedTopic.entries.push({
    timestamp: Date.now(),
    author: "User",
    html
  });

  alert('Entry added (locally). Next step: commit to GitHub!');
}

function renderBrowse() {
  const container = document.getElementById('topicsContainer');
  if (!data) return;
  container.innerHTML = data.topics.map(t =>
    `<div class="topicCard" onclick="alert('${t.title}')">${t.title}</div>`
  ).join('');
}
