import { createNote } from './components/pinnedNote';
import { initialPinnedNote } from './components/initialPinnedNote';

const notesContainer = document.getElementById('app');
const addButton = document.getElementById('add-note');

getNotes().forEach(note => {
  const noteElement = createNote(note.id, note.date, note.title, note.content);
  notesContainer.insertBefore(noteElement, addButton);
});

addButton.addEventListener('click', () => addNote());

function getNotes() {
  return JSON.parse(localStorage.getItem('pinned-notes') ?? initialPinnedNote);
}

function setNotes(notes) {
  localStorage.setItem('pinned-notes', JSON.stringify(notes));
}

function addNote() {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    date: new Date().toLocaleDateString(),
    title: '',
    content: '',
  };

  const noteElement = createNote(noteObject.id, noteObject.date, noteObject.title, noteObject.content);
  notesContainer.insertBefore(noteElement, addButton);

  notes.push(noteObject);
  setNotes(notes);
}

export function updateNote(id, isTitle, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter(note => note.id == id)[0];

  isTitle ? (targetNote.title = newContent) : (targetNote.content = newContent);

  setNotes(notes);
}

export function deleteNote(id, element) {
  const notes = getNotes().filter(note => note.id != id);

  setNotes(notes);
  notesContainer.removeChild(element);
}
