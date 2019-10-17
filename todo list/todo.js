
"use strict";
init();

/**
 * Method to initialize all event listeners when the javascript code loaded in browser
 */
function init() {
    addEventListeners(getElementById("main-menu"), "click", openMenu);
    addEventListeners(getElementById("main-menu-plus"), "click", openNavigation);
    addEventListeners(getElementById("new-subtask"), "keyup", addSubTask);
    addEventListeners(getElementById("new-task"), "keyup", createTask);
    addEventListeners(getElementById("new-step"), "keyup", addStep);
    addEventListeners(getElementById("list-update"), "keyup", updateTaskName);
    addEventListeners(getElementById("subtask-update"), "keyup", updateSubTaskName);
   // addEventListeners(getElementById("steps"), "keyup", updateStepName);
    //addEventListeners(getElementById("circle-change"),"click",deleteSubTask);
}

function getComponentById(id) {
    return document.getElementById(id);
}
function build(element) {
    return document.createElement(element);
}

//Global list declaration
let list = [];
let taskObject;
let subTaskObject;
let stepObject;

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
    var leftMenu = getElementById("menu");
    var menuDiv = getElementById("menu-bar");
    var elements = getElementsByClassName("left-side-menu");
    if (leftMenu.value === "closed") {
        menuDiv.setAttribute("class","side-bar menu-bar-open");
        leftMenu.value = "opened";
        for(let i in elements){
            elements[i].setAttribute("class","left-side-menu left-side-menu-open");
        }
    } else {
        menuDiv.setAttribute("class","side-bar menu-bar-close");
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
 * Method used to cshowStepDetailsyle
 */
function planned(){showStepDetails
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
function tasks(){
    document.getElementById("tasks").style.fontWeight="600";
    document.getElementById("tasks").style.color="#3e69e9";
}

/**
 * Method used to open navigation bar,when user press the plus(+) icon
 */
function openNavigation() {
    let leftMenu = getElementById("menu");
    let menuDiv = getElementById("menu-bar");
    let elements = getElementsByClassName("left-side-menu");
    if (leftMenu.value === "closed") {
        menuDiv.setAttribute("class","side-bar menu-bar-open");
        leftMenu.value = "opened";
        for(let i in elements){
            elements[i].setAttribute("class","left-side-menu left-side-menu-open");
        }
    }
}

/**
 * Method used to create task when user gives some text input and press enter keycode
 * 
 */
function createTask() {
    let taskName = getElementById("new-task");
    if((event.keyCode === 13)&&(taskName.value.trim() !== "")) {
        let task = {
            name: taskName.value,
            id: Date.now(),
            subTasks: []
        };
        list.push( task );
        taskName.value = "";
        displayTask(task.name, task.id);
        getTaskDetails(task.id);
    }
}

/**
 * Method get invoked when user presses one task,it will show task name on center page
 * @param {*} id id for task identification 
 */
function getTaskDetails(id) {
    getElementById("sub-tasks").textContent = "";
    hideSteps();
    taskObject = getTask( id );
            getElementById("list-update").value = taskObject;
            getElementById("list-name").value = taskObject.name;
            getElementById("list-name").classList.add("tasks", "task-name");
            displaySubTasks(taskObject.subTasks );
        //let text = `<i id="click-task" class="icon fontIcon ms-Icon ms-Icon--More iconSize-24" aria-hidden="true"></i>`; 
}

/**
 * Method to get bject for a particular id
 */
function getTask( id ){
    for( let task of list ){
        if( task.id == id ){
            return task;
        }
    }
}
/**
 * Method used to update task name when user gives task nameand press enter keycode
 */
function updateTaskName() {
    let taskName = getElementById("list-name").value;
    if((event.keyCode === 13)&&("" !== taskName.trim())) {
        taskObject.name = taskName;
        displayTasks();
    }
}

/**
 * Method used to display all tasks in list
 */
function displayTasks(){
    getElementById( "list" ).textContent ="";
    for( let task of list ){
        displayTask( task.name, task.id );
    }
}

/**
 * Method used to display particular task using taskname and task id
 * @param {string} taskName name of the task to be displayed
 * @param {string} id id for task identification
 */
function displayTask( taskName, id ) {
    const text = `<div onclick="getTaskDetails(${id})" class="tasks">
                    <span class="ms-Icon ms-Icon--BulletedList2 iconSize-24" 
                        aria-hidden="true">
                    </span>
                    <span class="left-side-menu left-side-menu-open tasks-display">${taskName}</div>
                  </div>`;
    const position = "beforeend";
    getElementById("list").insertAdjacentHTML(position, text, id);
    
}

/**
 * Method to delete particular task using id
 */
function deleteTask(){
    let index = list.indexOf(this);
    list.splice(0,this);
}

/**
 * Method used to add subtask into task
 */
function addSubTask(){
    var subTaskName = getElementById("new-subtask");
    if((event.keyCode == 13)&&(subTaskName.value.trim() !== "")) {
        var subTask = {
            name : subTaskName.value,
            id : Date.now(),
            steps : [],
            favorite:false,
            done : false
        };
        var subTasks = taskObject.subTasks;
        subTasks.push(subTask);
        subTaskName.value = "";
        displaySubTask(subTask);
    }
}

/**
 * Method used to update sub task name in list
 */
function updateSubTaskName(){
    let subTaskName = getElementById("subtask-name").value;
    if((event.keyCode === 13)&&( "" !== subTaskName.trim() )){
        subTaskObject.name = subTaskName;
        displaySubTasks( taskObject.subTasks );
    }
}

/**
 * Method to display subtasks from particular task
 * @param {*} subtasks list of subtasks
 */
function displaySubTasks( subTasks ){
    if( subTasks ){
        getElementById("sub-tasks").textContent = "";
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
        let subTaskText = `<div class = "sub-task">
                            <button class = "center-left">
                                <span><img src = "images/circle.svg"/></span>
                            </button>
                            <span class="middle" id="display-steps" onclick="showStepDetails(${subTask.id})">${subTask.name}</span>
                            <span class="center-right"><i class="icon fontIcon ms-Icon ms-Icon--FavoriteStar iconSize-24" aria-hidden="true"></i></span>
                          </div>`;
        getElementById("sub-tasks").insertAdjacentHTML("beforeend", subTaskText, id);
}


/**
 * Method used to add step into subtask
 */
function addStep(){
    var step = getElementById("new-step");
    if((event.keyCode == 13)&&(step.value.trim() !=="")){ //enter keycode is 13
        var subTask = subTaskObject;
        var step = {
            id:Date.now(),
            name:step.value,
            completed:false
        };
        var steps = subTask.steps;
        steps.push( step );
        displayStep( step );
        getElementById("new-step").value="";
    }
}

/**
 * Method to display subtask name,and existing steps in subtasks
 * @param {*} id used for subtask identification
 */
function showStepDetails( id ){
    showSteps();
    for( let task of list ){
        for( let subTask of task.subTasks ){
            if( subTask.id === Number(id) ){
                subTaskObject = subTask;
                getElementById("steps").textContent = "";
                //getElementById("subtask-name").value = subTask;
                getElementById("subtask-name").value = subTask.name;
                getElementById("subtask-name").classList.add("tasks", "task-name");
                displaySteps( subTask );
                break;
            }
        }
    }
    
}

/**
 * Method to show steps using css class
 */
function showSteps(){
    getElementById("right").setAttribute("class","right-side right-side-open");
}

/**
 * Method to hide steps using css class
 */
function hideSteps(){
    getElementById("right").setAttribute("class","right-side right-close");
}

/**
 * Method to pass subTask object one by one to displayStep method 
 * @param {*} subTask - subtask steps are iterated
 */
function displaySteps( subTask ){
    if((subTask.steps).length > 0){
        getElementById("steps").textContent = "";
        var steps = subTask.steps;
        for(let step of steps){
            if(step.completed){
                displayStepWithStrick(step);
            }
            else{
                displayStep(step);
            }
            
        }
    }
}

/**
 * Method used to display step using html code
 * @param {*} step - step object contains id,name,status
 */
function displayStepWithStrick( step ){
    let id = step.id;
    stepObject = step;
    let stepText = `<div class = "sub-task">
                            <button id="step-completed" onclick="setStepInComplete()" class = "center-left">
                                <span><img src = "images/chevron-circle-down.svg"/></span>
                            </button>
                            <span class="line-through middle">${step.name}</span>
                            <span class="close-button">
                                <i class="icon fontIcon ms-Icon ms-Icon--Cancel iconSize-16" aria-hidden="true"></i>
                            </span>
                          </div>`;
        getElementById("steps").insertAdjacentHTML("beforeend", stepText, id);
}

/**
 * Method used to display step using html code
 * @param {*} step - step object contains id,name,status
 */
function displayStep( step ){
    let id = step.id;
    stepObject = step;
    let stepText = `<div class = "sub-task">
                            <button id="step-completed" onclick="setStepComplete.bind(stepObject);" class = "center-left">
                                <span><img src = "images/circle.svg"/></span>
                            </button>
                            <span class="middle">${step.name}</span>
                            <span class="close-button">
                                <i class="icon fontIcon ms-Icon ms-Icon--Cancel iconSize-16" aria-hidden="true"></i>
                            </span>
                          </div>`;
        getElementById("steps").insertAdjacentHTML("beforeend", stepText, id);
            var createdList = getComponentById("steps");
            var newCreatedDiv = build("div");
            createdList.setAttribute("class", "sub-task");
            let buttonForOnclick = build("button");
            buttonForOnclick.getComponentById("step-completed");
            buttonForOnclick.setAttribute("class", "center-left");
            var spanForImage = build("span");
            var cirleIcon = buildComponent("img");
            var spanForStepName = build("span");
            var spanForClose = build("span");
            var iTag = build("i");
            iTag.setAttribute("class","icon fontIcon ms-Icon ms-Icon--Cancel iconSize-16");
            
            cirleIcon.setAttribute("src","images/circle.svg");
            spanForImage.appendChild(cirleIcon);
            spanForClose.appendChild(iTag);
            stepObject = step;
            spanListName.innerHTML = newTask.name;
            addEventListeners(spanListName,"click",currentTask.bind(newTask));
            newCreatedDiv.appendChild(spanForImage);
            newCreatedDiv.appendChild(spanListName);
            createdList.appendChild(newCreatedDiv);
        }
}

function setStepComplete(){
    alert(this.name);
    stepObject.completed = true;
    displaySteps( subTaskObject );
}

function setStepInComplete(){
    alert("not strike");
    stepObject.completed = false;
    displaySteps( subTaskObject );
}

/**
 * Method to update step name 
 */
function updateStepName(){
    let stepName = getElementById("step-update").value;
    if((event.keyCode == 13)&&(stepName.trim() !=="")){ //enter keycode is 13
        stepObject.name = stepName;
        displaySteps( subTaskObject );
    }
}

/*function deleteSubTask(){
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

}*/