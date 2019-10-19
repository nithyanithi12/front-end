
"use strict";
init();

/**
 * Method to initialize all event listeners when the javascript code loaded in browser
 */
function init() {
    //addEventListeners(getElementById("main-menu"), "click", openMenu);
    //addEventListeners(getElementById("main-menu-plus"), "click", openNavigation);
    addEventListeners(getElementById("new-subtask"), "keyup", addSubTask);
    //addEventListeners(getElementById("new-task"), "keyup", createTask);
    addEventListeners(getElementById("new-step"), "keyup", addStep);
    addEventListeners(getElementById("list-update"), "keyup", updateTaskName);
    addEventListeners(getElementById("subtask-update"), "keyup", updateSubTaskName);
    addEventListeners(getElementById("strike-subtask"), "click", strikeSubTask);
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
$("#main-menu").click(function(e){openMenu()});
$("#new-task").keyup(function(e){createTask()});
$("#display-task").keyup(function(e){deleteTask()});
function openMenu(){
    let menuStatus = $("#menu-status").val();
    if(menuStatus == "closed"){
        $("#menu-status").val("opened");
        $(".side-bar").addClass("side-bar-open");
        $(".left-side-menu").addClass("left-side-menu-open");
    } else{
        $("#menu-status").val("closed");
        $(".side-bar").removeClass("side-bar-open");
        $(".left-side-menu").removeClass("left-side-menu-open");
    }
}

/**
 * Method used to open navigation bar,when user press the plus(+) icon
 */
$("#main-menu-plus").click(function(){
    $("#menu-status").val("opened");
    $(".side-bar").addClass("side-bar-open");
    $(".left-side-menu").addClass("left-side-menu-open");
});

/**
 * Method used to change my day attribute style
 */
$("#myday").click(function(){
    $("#myday-text").toggleClass("myday-text");
});

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
 * Method used to create task when user gives some text input and press enter keycode
 * 
 */
function createTask() {
    let taskName = $("#new-task").val();
    if((13 == event.keyCode)&&("" !== taskName.trim())) {
        let task = {
            name: taskName,
            id: Date.now(),
            subTasks: []
        };
        list.push( task );
        $("#new-task").val("");
        displayTask(task);
        getTaskDetails(task.id);
    }
}

/**
 * Method get invoked when user presses one task,it will show task name on center page
 * @param {number} taskId id for task identification 
 */
function getTaskDetails( id ) {
    $("#sub-tasks").text("");
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
        displayTask( task );
    }
}

/**
 * Method used to display particular task using taskname and task id
 * @param {object} task task object for show
 */
function displayTask( task ) {

    $("#list").append(`<div id="display-task" onclick="getTaskDetails(${task.id})" class="sidebar-attribute tasks">
                    <div class="ms-Icon ms-Icon--BulletedList2 iconSize-24" 
                        aria-hidden="true">
                    </div>
                    <div class="left-side-menu left-side-menu-open tasks-display">${task.name}</div>
                  </div>`);
    
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
        for(let subTask of subTasks){
            displaySubTask(subTask, subTask.done);
        }
    }
}

/**
 * Method used to display subtask after one subtask added
 * @param {*} subtask subtask object contains one subtask detail
 */
function displaySubTask(subTask, status){
    let id = subTask.id;
    let createdList = getComponentById("sub-tasks");
    let newCreatedDiv = build("div");
    newCreatedDiv.setAttribute("class", "sub-task");
    let buttonForOnclick = build("button");
    buttonForOnclick.setAttribute("class", "center-left");
    let spanForImage = build("span");
    let cirleIcon = build("img");            
    newCreatedDiv.appendChild(buttonForOnclick);
    let spanForStepName = build("span");
    spanForImage.appendChild(cirleIcon);
    buttonForOnclick.appendChild(spanForImage);
    spanForStepName.setAttribute("class", "middle");
    newCreatedDiv.appendChild(spanForStepName);
    spanForStepName.onclick=function(e){showStepDetails(subTask.id)};
    spanForStepName.innerHTML = subTask.name;
    let spanForClose = build("span");
    let iTag = build("i");
    iTag.setAttribute("class", "icon fontIcon ms-Icon ms-Icon--FavoriteStar iconSize-24");
    spanForClose.appendChild(iTag);
    newCreatedDiv.appendChild(spanForClose);
    createdList.appendChild(newCreatedDiv);
    if(!status){
        cirleIcon.setAttribute("src","images/circle.svg");
        spanForStepName.setAttribute("class", "middle line-through-none");
        buttonForOnclick.onclick = function(e){strikeSubTask(subTask)};
    }
    if(status){
        cirleIcon.setAttribute("src","images/chevron-circle-down.svg");
        spanForStepName.setAttribute("class", "middle line-through");
        buttonForOnclick.onclick = function(e){strikeSubTask(subTask)};
    }
    showStepDetails(subTask.id);
}

/**
 * Method to change subtask status
 * @param {object} subTask 
 */
function strikeSubTask(subTask){
    if( !subTask.done ){
        subTask.done = true;
    } else{
        subTask.done = false;
    }
    displaySubTasks(taskObject.subTasks);
}
/**
 * Method used to add step into subtask
 */
function addStep(){
    let stepName = getElementById("new-step").value;
    if((event.keyCode == 13)&&(stepName.trim() !=="")){ //enter keycode is 13
        let subTask = subTaskObject;
        let step = {
            id:Date.now(),
            name:stepName,
            completed:false
        };
        let steps = subTask.steps;
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
    loop1:for( let task of list ){
        loop2:for( let subTask of task.subTasks ){
            if( subTask.id === Number(id) ){
                subTaskObject = subTask;
                showSteps();
                getElementById("steps").textContent = "";
                getElementById("subtask-name").value = subTask.name;
                getElementById("subtask-name").classList.add("tasks", "task-name");
                displaySteps(subTaskObject);
                if(subTask.done){
                    getElementById("subtask-name").setAttribute("class","line-through middle");
                    getElementById("image").setAttribute("src","images/chevron-circle-down.svg");

                } else{
                    getElementById("subtask-name").setAttribute("class","line-through-none middle");
                    getElementById("image").setAttribute("src","images/circle.svg");
                }
                break loop1;
            }
        }
    }
    
}

function displaySteps( subTaskObject ){
    getElementById("steps").textContent = "";
    for(let step of subTaskObject.steps){
        displayStep(step, step.completed);           
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
 * Method used to display step using html code
 * @param {*} step - step object contains id,name,status
 */
function displayStep( step,flag ){
    let createdList = getComponentById("steps");
    let newCreatedDiv = build("div");
    newCreatedDiv.setAttribute("class", "sub-task");
    let buttonForOnclick = build("button");
    buttonForOnclick.setAttribute("class", "center-left");
    let spanForImage = build("span");
    let cirleIcon = build("img");            
    newCreatedDiv.appendChild(buttonForOnclick);
    let spanForStepName = build("span");
    spanForImage.appendChild(cirleIcon);
    buttonForOnclick.appendChild(spanForImage);
    spanForStepName.setAttribute("class", "middle");
    newCreatedDiv.appendChild(spanForStepName);
    spanForStepName.innerHTML = step.name;
    let spanForClose = build("span");
    let iTag = build("i");
    iTag.setAttribute("class","icon fontIcon ms-Icon ms-Icon--Cancel iconSize-16");
    spanForClose.appendChild(iTag);
    newCreatedDiv.appendChild(spanForClose);
    createdList.appendChild(newCreatedDiv);
    if(!flag){
        cirleIcon.setAttribute("src","images/circle.svg");
        stepObject=step;
        buttonForOnclick.onclick = function(e){setStepComplete(step)};
    } else {
        cirleIcon.setAttribute("src","images/chevron-circle-down.svg");
        stepObject = step;
        buttonForOnclick.onclick = function(e){setStepInComplete(step)};
        spanForStepName.setAttribute("class", "middle line-through");
    }
}

function setStepComplete(step){
    step.completed = true;
    displaySteps( subTaskObject );
}

function setStepInComplete(step){
    alert("remove");
    step.completed = false;
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