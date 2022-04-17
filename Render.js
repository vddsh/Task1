function renderNotes() {
  const notes = NoteAPI.getNotes(isActive);
  const elemActive = document.querySelector('.active__wrapper');
  const elemArchive = document.querySelector('.archive__wrapper');
  let html = '';

  if (notes) {
    notes.forEach((element, index) => {
      const { name, updated, category, content, dates, id } = element;
      html += `    
      <table class="table__info" id="${index}">
          <tr>
            <td class="input__info">${name}</td>
            <td class="input__info">${convertDate(updated)}</td>
            <td class="input__info">${CATEGORY[category]}</td>
            <td class="input__info">${content}</td>
            <td class="input__info">${dates}</td>
            <td class="fa-solid fa-pen icon" onclick="editNote(${id})"></td>
            <td class="fa-solid fa-box-open icon arch" onclick="changeArchive(${id})"></td>
            <td class="fa-solid fa-trash-can icon" onclick="deleteNote(${id})"></td>
          </tr>
        </table>
           `;
    });
    if (isActive) {
      elemActive.innerHTML = html;
    } else {
      elemArchive.innerHTML = html;
    }
  }
}

function renderAmount() {
  const notes = NoteAPI.getAllNotes();

  let noteMap = {
    TASK: { active: 0, archive: 0 },
    IDEA: { active: 0, archive: 0 },
    RANDOM_THOUGHT: { active: 0, archive: 0 },
  };

  for (let [key, value] of Object.entries(noteMap)) {
    notes
      .filter((el) => el.category == key)
      .forEach((el) => {
        if (el.archived) {
          noteMap[key].archive = value.archive += 1;
        } else {
          noteMap[key].active = value.active += 1;
        }
      });
  }

  const countElements = document.querySelectorAll('.count');
  countElements.forEach((el) => {
    el.innerHTML =
      noteMap[el.getAttribute('category')][el.getAttribute('status')];
  });
}
