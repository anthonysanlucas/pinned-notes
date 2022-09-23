const notesContainer = document.getElementById('app');
const addButton = document.getElementById('add-note');

getNotes().forEach(note => {
  const noteElement = createNote(note.id, note.content);
  notesContainer.insertBefore(noteElement, addButton);
});

addButton.addEventListener('click', () => addNote());

function getNotes() {
  return JSON.parse(localStorage.getItem('pinned-notes') ?? '[]');
}

function setNotes(notes) {
  localStorage.setItem('pinned-notes', JSON.stringify(notes));
}

function createNote(id, content) {
  const element = document.createElement('textarea');

  element.classList.add('pinned-note');
  element.setAttribute('spellcheck', false);
  element.value = content;
  element.placeholder = '📌 Write here!';

  element.addEventListener('change', () => {
    updateNote(id, element.value);
  });

  element.addEventListener('dblclick', () => {
    const deletionWarning = confirm('Delete note?');

    if (deletionWarning) {
      deleteNote(id, element);
    }
  });

  return element;
}

function addNote() {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    content: '',
  };

  const noteElement = createNote(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addButton);

  notes.push(noteObject);
  setNotes(notes);
}

function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter(note => note.id == id)[0];

  targetNote.content = newContent;
  setNotes(notes);
}

function deleteNote(id, element) {
  const notes = getNotes().filter(note => note.id != id);

  setNotes(notes);
  notesContainer.removeChild(element);
}
