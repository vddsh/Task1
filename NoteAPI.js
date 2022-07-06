class NoteAPI {
  static getAllNotes() {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');

    return notes.sort((a, b) => {
      return new Date(a.dates) < new Date(b.dates) ? -1 : 1;
    });
  }

  static getNotes(isActive) {
    return this.getAllNotes().filter((el) => el.archived == !isActive);
  }

  static addNote(note) {
    note.id = Date.now().toString();
    note.archived = false;

    let notes = this.getAllNotes();
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  static updateNote(id, note) {
    console.log('update Note IN', note);
    let updatedNotes = this.getAllNotes().map((n) => (n.id == id ? note : n));
    console.log('update Note OUT', updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  }

  static getNoteById(id) {
    return this.getAllNotes().find((n) => n.id == id);
  }

  static deleteById(id) {
    let notes = this.getAllNotes();
    let updatedNotes = notes.filter((n) => n.id != id);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  }

  static changeArchiveById(id) {
    let note = this.getNoteById(id);
    note.archived = !note.archived;
    this.updateNote(id, note);
  }
}

async function loadData() {
  const response = await fetch('./Data.json');
  const data = await response.json();
  localStorage.setItem('notes', JSON.stringify(data));

  renderNotes();
  renderAmount();
}
