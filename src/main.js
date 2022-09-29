import { createNote } from './components/pinnedNote';

const notesContainer = document.getElementById('app');
const addButton = document.getElementById('add-note');

getNotes().forEach(note => {
  const noteElement = createNote(note.id, note.date, note.content);
  notesContainer.insertBefore(noteElement, addButton);
});

addButton.addEventListener('click', () => addNote());

function getNotes() {
  return JSON.parse(localStorage.getItem('pinned-notes') ?? '[]');
}

function setNotes(notes) {
  localStorage.setItem('pinned-notes', JSON.stringify(notes));
}

function addNote() {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    date: new Date().toLocaleDateString(),
    content: '',
  };

  const noteElement = createNote(noteObject.id, noteObject.date, noteObject.content);
  notesContainer.insertBefore(noteElement, addButton);

  notes.push(noteObject);
  setNotes(notes);
}

export function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter(note => note.id == id)[0];

  targetNote.content = newContent;
  setNotes(notes);
}

export function deleteNote(id, element) {
  const notes = getNotes().filter(note => note.id != id);

  setNotes(notes);
  notesContainer.removeChild(element);
}
