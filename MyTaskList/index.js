const deleteTaskButton = document.getElementById("deleteBtn");
const listView = document.getElementById("taskList");
const addTask = document.getElementById("addTask");
const addForm = document.getElementById("addForm");

//Array will set the task list
let tasks = [];
tasks = JSON.parse(localStorage.getItem("tasks")) || [];


//localStorage.clear();

//Setting the header Date
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

document.getElementById("date").innerHTML = day;
document.getElementById("month").innerHTML = months[month];
document.getElementById("year").innerHTML = year;

//DELETE TASKS

deleteTodo.addEventListener('click', function(){
    let updatedList = tasks.filter(element => {
        return !element.isComplete;
        
    });
    tasks = updatedList;
    listRefresh();
});
    


//If it's complete will turn incomplete once clicked
function complete(i) {
  tasks[i].isComplete = !tasks[i].isComplete;
  
  listRefresh();
}
//refreshing page after clicking and rendering
function listRefresh() {
  listView.innerHTML = "";
  rendertasks();
}

//RENDERING THE INPUT TASKS
const rendertasks = () => {
  for (i in tasks) {
    let td = tasks[i];

    
    let template = `
        <div class="listItem ${td.isComplete ? "complete" : null}">
                <p>
                    ${td.title}<br>
                    <small>${td.date}</small>
                </p>
                <span onClick="complete(${i})"></span>
                <hr>
            </div>
        `;
        

        /*
        let template = `
            <div class="listItem">
            <p>
            ${td.title}<br>
            <small>${td.date}</small>
            <button>Done</button>
            <button>Delete</button>
            </div>
        `
        */
    listView.insertAdjacentHTML("beforeend", template);
  }
};

//Event listener to add task button
//once clicked values are updated
//pushed to the array - list is refreshed and reseted
addTask.addEventListener("click", function (event) {
  event.preventDefault();

  let title = document.getElementById("newTask").value;
  let date = document.getElementById("newDate").value;
  let temp = { title: title, date: date, isComplete: false };
  tasks.push(temp);
  listRefresh();
  addForm.reset();

  localStorage.setItem("tasks", JSON.stringify(tasks));
});

//When the app starts this function runs
const initApp = () => {
  rendertasks();
};

initApp();



