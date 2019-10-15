
"use strict";
init();

/**
 * Method to initialize all event listeners when the javascript code loaded in browser
 */
function init() {
    addEventListeners(getElementById("main-menu"),"click",openMenu);
    addEventListeners(getElementById("main-menu-plus"),"click",openNavigation);
    addEventListeners(getElementById("new-subtask"),"keyup",addSubtask);
    addEventListeners(getElementById("newtask"),"keyup",createTask);
}

/**
 * Method to get element from html using id
 * @param {*} id id of the element to be fetched
 */
function getElementById(id) {
    return document.getElementById(id);
}

/**
 * Method to get elements from html using class
 * @param {*} id id of the elements collection to be fetched
 */
function getElementsByClassName(id) {
    return document.getElementsByClassName(id);
}

/**
 * Method to get events fom html and invokes a particular function
 * @param {*} element id used for fetch element from html
 * @param {*} action event type
 * @param {*} resultOperation function name 
 */
function addEventListeners(element,action,resultOperation) {
    element.addEventListener(action,resultOperation);
}

/**
 * Method used to open and close navigation bar
 */
function openMenu() {
    var leftMenu = getElementById("bar");
    var menuDiv = getElementById("menu-bar");
    var elements = getElementsByClassName("left-side-menu");
    if (leftMenu.value === "closed") {
        menuDiv.setAttribute("class","sidebar menu-bar-open");
        leftMenu.value = "opened";
        for(let i in elements){
            elements[i].setAttribute("class","left-side-menu left-side-menu-open");
        }
    } else {
        menuDiv.setAttribute("class","sidebar menu-bar-close");
        leftMenu.value = "closed";
        for(let i in elements){
            elements[i].setAttribute("class","left-side-menu left-side-menu-close");
        }
    }
}

/**
 * Method used to change my day attribute style
 */
function myDay(){
    if(document.getElementById("myday").style.fontSize="14px"){
        document.getElementById("myday").style.fontWeight="600";
    } else {
        document.getElementById("myday").style.fontWeight="400";
    }
}

/**
 * Method used to change important attribute style
 */
function important(){
    document.getElementById("important").style.fontWeight="600";
    document.getElementById("important").style.color="#3e69e9";
}

/**
 * Method used to change planned attribute style
 */
function planned(){
    document.getElementById("planned").style.fontWeight="600";
    document.getElementById("planned").style.color="#3e69e9";
}

/**
 * Method used to change Assigned attribute style
 */
function assigned(){
    document.getElementById("assigned").style.fontWeight="600";
    document.getElementById("assigned").style.color="#3b7a28";
}

/**
 * Method used to change Assigned attribute style
 */
function task(){
    document.getElementById("task").style.fontWeight="600";
    document.getElementById("task").style.color="#3e69e9";
}

/**
 * Method used to open navigation bar,when user press the plus(+) icon
 */
function openNavigation() {
    var leftMenu = getElementById("bar");
    var menuDiv = getElementById("menu-bar");
    var elements = getElementsByClassName("left-side-menu");
    if (leftMenu.value === "closed") {
        menuDiv.setAttribute("class","sidebar menu-bar-open");
        leftMenu.value = "opened";
        for(let i in elements){
            elements[i].setAttribute("class","left-side-menu left-side-menu-open");
        }
    }
}

//Global list declaration
var list = [];

/**
 * Method used to create subtask id
 */
function generateId() {
    if(generateId.count == undefined){
        return generateId.count = 1;
    } else {
        return ++generateId.count;

    }
}

/**
 * Method used to create task when user gives some text input and press enter keycode
 * 
 */
function createTask() {
    let taskName = getElementById("newtask");
    if((event.keyCode === 13)&&(taskName.value.trim() !== "")) {
        var task = {
            name: taskName.value,
            id: Date.now(),
            subtask: []
        };
        list.push( task );
        taskName.value = "";
        displayTask(task.name, task.id);
        getTaskDetails(task.id);
    }
}

/**
 * Method used to display particular task using taskname and task id
 * @param {*} taskName name of the task to be displayed
 * @param {*} id id for task identification
 */
function displayTask(taskName, id) {
    const text = `<div id=${id} onclick="getTaskDetails(id)" class="tasks">
                    <span class="ms-Icon ms-Icon--BulletedList2 iconSize-24" 
                        aria-hidden="true">
                    </span>
                    <span class="left-side-menu left-side-menu-open tasks-display">${taskName}</div>
                  </div>`;
    const position = "beforeend";
    getElementById("list").insertAdjacentHTML(position, text, id);
    
}

/**
 * Method get invoked when user presses one task,it will show task name on center page
 * @param {*} id id for task identification 
 */
function getTaskDetails(id) {
    getElementById("display-subtasks").textContent = "";
    for(let i = 0; i < list.length; i++){
        if(list[i].id == id){
            getElementById("listName").value = list[i];
            getElementById("listName").innerHTML = list[i].name;
            getElementById("listName").classList.add("tasks", "task-name");
            console.log(list[i].subtasks);
            displaySubtasks(list[i].subtask);
            break;
        }
    }
}

/**
 * Method to display subtasks from particular task
 * @param {*} subtasks list of subtasks
 */
function displaySubtasks(subtasks){
    getElementById("display-subtasks").textContent="";
    for(let subtask in subtasks){
        let id = subtasks[subtask].id;
        let subtaskText = `<div  class="display-subtasks"> ${subtasks[subtask].name} </div>`;
        getElementById("display-subtasks").insertAdjacentHTML("afterend", subtaskText, id);
    }
}

/**
 * Method used to display subtask after one subtask added
 * @param {*} subtask subtask object contains one subtask detail
 */
function displaySubtask(subtask){
        let id = subtask.id;
        let subtaskText = `<div>${subtask.name}</div>`;
        getElementById("display-subtasks").insertAdjacentHTML("beforeend", subtaskText, id);
        getElementById("display-subtasks").appendChild(document.createElement("hr"));
}

/**
 * Method used to add subtask into task
 */
function addSubtask(){
    var subTaskName = getElementById("new-subtask");
    if((event.keyCode == 13)&&(subTaskName.value.trim() !== "")) {
        var task = getElementById("listName").value;
        var subtask = {
            name : subTaskName.value,
            id : generateId(),
            step : [],
            done : false
        };
        var subtasks = task.subtask;
        subtasks.push(subtask);
        subTaskName.value="";
        displaySubtask(subtask);
    }
}