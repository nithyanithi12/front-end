
"use strict";
init();

/**
 * Method to initialize all event listeners when the javascript code loaded in browser
 */
function init() {
    addEventListeners(getElementById("main-menu"),"click",openMenu);
    addEventListeners(getElementById("main-menu-plus"),"click",openNavigation);
    addEventListeners(getElementById("new-subtask"),"keyup",addSubTask);
    addEventListeners(getElementById("newtask"),"keyup",createTask);
    addEventListeners(getElementById("add-step"),"click",addStep);
    //addEventListeners(getElementById("circle-change"),"click",deleteSubTask);
}


//Global list declaration
var list = [];

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
        let task = {
            name: taskName.value,
            id: Date.now(),
            subTask: []
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

    getElementById("subtasks").textContent = "";
    for(let i = 0; i < list.length; i++){
        if(list[i].id == id){
            getElementById("listName").value = list[i];
            getElementById("listName").innerHTML = list[i].name;
            getElementById("listName").classList.add("tasks", "task-name");
            displaySubTasks(list[i].subTask );
            break;
        }
    }
}

/**
 * Method to display subtasks from particular task
 * @param {*} subtasks list of subtasks
 */
function displaySubTasks( subTasks ){
    if( subTasks.length > 0){
        getElementById("subtasks").textContent = "";
        for(let subTask in subTasks){
            displaySubTask(subTasks[subTask]);
        }
    }
}

/**
 * Method used to display subtask after one subtask added
 * @param {*} subtask subtask object contains one subtask detail
 */
function displaySubTask(subTask){
        let id = subTask.id;
        let subTaskText = `<div class = "sub-task" id="add-step" value="${subTask}>
                            <button class = "left">
                                <span><img src = "images/circle.svg"/></span>
                            </button>
                            <span class="middle">${subTask.name}</span>
                            <span class="right"><i class="icon fontIcon ms-Icon ms-Icon--FavoriteStar iconSize-24" aria-hidden="true"></i></span>
                          </div>`;
        getElementById("subtasks").insertAdjacentHTML("beforeend", subTaskText, id);
        getElementById("subtasks").appendChild(document.createElement("hr"));
}

/**
 * Method used to add subtask into task
 */
function addSubTask(){
    var subTaskName = getElementById("new-subtask");
    if((event.keyCode == 13)&&(subTaskName.value.trim() !== "")) {
        var task = getElementById("listName").value;
        var subTask = {
            name : subTaskName.value,
            id : generateId(),
            step : [],
            done : false
        };
        var subTasks = task.subTask;
        subTasks.push(subTask);
        subTaskName.value = "";
        displaySubTask(subTask);
    }
}

function addStep(){

}

function deleteSubTask(){
    let subTaskId = Number(getElementById("circle-change").value);
    let task = getElementById("task-object").value;
    for(let subTask in task.subTask){
        if(subTaskId == subTask.id){
            subtask.done = true;
            let text =  `<button class = "left" id = "circle-change">
                            <input type="hidden" id = "tast-object" value="${task}"/>
                            <span><img src = "images/chevron-circle-down.svg"/></span>
                        </button>`;
            getElementById("cicle-change").innerHTML = text;
        }
    }

}