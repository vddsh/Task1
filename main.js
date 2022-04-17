const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');
const addBtn = document.getElementById('input__fileds-btn');
const nameInout = document.getElementById('input__fileds-name');
const categoryInput = document.getElementById('input__fileds-category');
const contentInput = document.getElementById('input__fileds-content');
const CATEGORY = {
  TASK: 'Task',
  RANDOM_THOUGHT: 'Random Thought',
  IDEA: 'Idea',
};
var isActive = true;

addBtn.addEventListener('click', () => {
  let noteId = addBtn.getAttribute('noteId');
  saveOrUpdateNote({
    id: noteId,
    name: nameInout.value,
    dates: getDates(contentInput.value),
    category: categoryInput.value,
    content: contentInput.value,
    updated: new Date(),
    archived: noteId ? isArchived(noteId) : false,
  });
  removeModal();
});

function activeBtn() {
  isActive = true;
  renderNotes();
}

function archiveBtn() {
  isActive = false;
  renderNotes();
}

function saveOrUpdateNote(note) {
  if (note.id) {
    console.log('saveOrUpdateNote update IN', note);
    NoteAPI.updateNote(note.id, note);
    console.log('saveOrUpdateNote update OUT', note);
  } else {
    console.log('saveOrUpdateNote ADD IN', note);
    NoteAPI.addNote(note);
    console.log('saveOrUpdateNote ADD OUT', note);
  }
  clearInputs();
  renderNotes();
  renderAmount();
}

function editNote(id) {
  let note = NoteAPI.getNoteById(id);

  addModal();
  renderEdit(note);
  renderNotes();
}

function clearInputs() {
  nameInout.value = '';
  categoryInput.value = '';
  contentInput.value = '';

  addBtn.removeAttribute('noteId');
}

function renderEdit(note) {
  nameInout.value = note.name;
  categoryInput.value = note.category;
  contentInput.value = note.content;

  addBtn.setAttribute('noteId', note.id);
}

function deleteNote(id) {
  NoteAPI.deleteById(id);

  renderNotes();
  renderAmount();
}

function changeArchive(id) {
  NoteAPI.changeArchiveById(id);

  renderNotes();
  renderAmount();
}

function convertDate(date) {
  return new Date(date).toLocaleDateString([], { dateStyle: 'short' });
}

function getDates(string) {
  if (!string) return '';
  const res = string.match(/\d{1,2}\D\d{1,2}\D(\d{4}|\d{4})/g);
  if (!res) return '';
  return res;
}

function isArchived(id) {
  const note = NoteAPI.getNoteById(id);
  return note.archived;
}

/* Modal window logic */
overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active__overlay');
  modals.forEach((modal) => closeModal(modal));
  clearInputs();
});
openModalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});
closeModalButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('.modal');
    closeModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;
  addModal();
}
function closeModal(modal) {
  if (modal == null) return;
  removeModal();
}
function removeModal() {
  modal.classList.remove('active__overlay');
  overlay.classList.remove('active__overlay');
}
function addModal() {
  modal.classList.add('active__overlay');
  overlay.classList.add('active__overlay');
}
renderAmount();
// loadData();
