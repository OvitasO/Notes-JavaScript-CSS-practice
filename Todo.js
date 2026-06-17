//Getting notes from localStorage
let ToDo = JSON.parse(localStorage.getItem('ToDoList'));

if (ToDo === null) {
  ToDo = [];
}

const AddBtnElem = document.getElementById('AddElem');
const inputElem = document.getElementById('InputElem');
const notesElem = document.getElementById('notesDisplay');
let timeAddId;

checkInputEmpty();
renderNotes();

//Keeps input "active" if there is text inside
function checkInputEmpty() {
  if (inputElem.value != '') {
    inputElem.classList.add('notEmpty');
  }
  else {
    inputElem.classList.remove('notEmpty');
  }
}

//Checking if there are any notes, if not displaying a "Nothing here" text
function checkIfEmpty() {
  if (ToDo.length === 0) {
    document.getElementById('emptyElem')
      .innerHTML = 'Nothing here yet';
    document.getElementById('empty2Elem')
      .innerHTML = 'Add your first note';
    document.getElementById('notesDisplay')
      .classList.add('nothing');
  }
  else {
    document.getElementById('emptyElem')
      .innerHTML = '';
    document.getElementById('empty2Elem')
      .innerHTML = '';
    document.getElementById('notesDisplay')
      .classList.remove('nothing');
  }}
//Catching events
AddBtnElem.addEventListener('click', () => {
  if (inputElem.value.length > 150) {AddToDo(true)}
  else {AddToDo(false)}
});
inputElem.addEventListener('input', checkInputEmpty);
inputElem.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') 
    {if (inputElem.value.length > 150) {AddToDo(true)}
    else {AddToDo(false)}}
})
//Adding a note to an array
function AddToDo(size) {
  if (inputElem.value === '') {
    console.log('Nothing to add');
  }
  else {
    ToDo.push({
      text: inputElem.value,
      big: size
    });
    localStorage.setItem('ToDoList', JSON.stringify(ToDo));
    console.log(ToDo);
    AddBtnElem.innerHTML = 'Added!';
    clearTimeout(timeAddId);
    timeAddId = setTimeout(function() {
      AddBtnElem.innerHTML = 'Add';
    }, 1500);
  }

  renderNotes();
  inputElem.value = '';
  checkInputEmpty();
}

//Displaying notes on the screen
function renderNotes() {
  let html = '';
  notesElem.innerHTML = '';
  for (let i = 0; i < ToDo.length; i++) {
//Checks if the note is big, and if it is, allows you to open it on click
    let extendBtn = '';
    if (ToDo[i].big === true) {
      extendBtn = `<div class="showMoreContainer">
                    <button class="openCard" onclick="openNote(${i}, this)">
                      Show more
                    </button>
                   </div>`
    }
    html += `
    <div class="noteContainer" id="note${i}">
      <p class="note">
        ${ToDo[i].text}
      </p>
      ${extendBtn}
      <div class="delContainer">
        <button class="deleteButton" title="Delete" onclick="
          ToDo.splice(${i}, 1);
          renderNotes();
          checkIfEmpty();
          ">
          <img src="images/cross-icon.svg" class="deleteIcon">
        </button>
      </div>
    </div>`;
}
notesElem.innerHTML = html;
checkIfEmpty();
localStorage.setItem('ToDoList', JSON.stringify(ToDo));
}
//Extends the note or closes it
function openNote(notei, button) {
  document.getElementById(`note${notei}`)
    .classList.toggle('extended');

  if (button.textContent.trim() === 'Show more') {
    button.textContent = 'Show less';
  }
  else {
    button.textContent = 'Show more';
  }
}