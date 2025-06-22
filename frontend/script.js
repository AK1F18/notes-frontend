async function fetchNotes() {
  const res = await fetch(`${API_BASE}/notes`);
  const notes = await res.json();
  const list = document.getElementById('notesList');
  list.innerHTML = '';
  notes.forEach(note => {
    const li = document.createElement('li');
    li.className = 'note-item';
    li.innerHTML = `
      <span class="note-text">${note.note}</span>
      <button class="delete-button" onclick="deleteNote('${note.id}')">Delete</button>
    `;
    list.appendChild(li);
  });
}

async function addNote() {
  const text = document.getElementById('noteInput').value.trim();
  if (!text) return alert('Please write something!');
  await fetch(`${API_BASE}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ note: text })
  });
  document.getElementById('noteInput').value = '';
  fetchNotes();
}

async function deleteNote(id) {
  await fetch(`${API_BASE}/notes/${id}`, { method: 'DELETE' });
  fetchNotes();
}

window.onload = fetchNotes;
