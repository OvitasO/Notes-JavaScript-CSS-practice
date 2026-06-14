//Getting notes from localStorage
let ToDo = JSON.parse(localStorage.getItem('ToDoList'));

if (ToDo === null) {
  ToDo = [];
}

function checkInputEmpty() {
  if (inputElem.value != '') {
    inputElem.classList.add('notEmpty');
  }
  else {
    inputElem.classList.remove('notEmpty');
  }
}

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

const AddBtnElem = document.getElementById('AddElem');
const inputElem = document.getElementById('InputElem');
const notesElem = document.getElementById('notesDisplay');
let timeAddId;

checkInputEmpty();
renderNotes();
//Catching events
AddBtnElem.addEventListener('click', AddToDo);
inputElem.addEventListener('input', checkInputEmpty);
inputElem.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {AddToDo();}
})
//Adding a note to an array
function AddToDo() {
  if (inputElem.value !== '') {
    ToDo.push(inputElem.value);
    localStorage.setItem('ToDoList', JSON.stringify(ToDo));
    console.log(ToDo);
    AddBtnElem.innerHTML = 'Added!';
    clearTimeout(timeAddId);
    timeAddId = setTimeout(function() {
      AddBtnElem.innerHTML = 'Add';
    }, 1500);
  }
  else {
    console.log('Nothing to add');
  }
  renderNotes();
  inputElem.value = '';
  checkInputEmpty();
}

function renderNotes() {
  notesElem.innerHTML = '';
  for (let i = 0; i < ToDo.length; i++) {
    notesElem.innerHTML += `
    <div class="noteContainer">
      <p class="note">
        ${ToDo[i]}
      </p>
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
  checkIfEmpty();
  localStorage.setItem('ToDoList', JSON.stringify(ToDo));
}