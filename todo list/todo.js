
"use strict";

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
    return $("#"+id);
}

function getElementByClass(id) {
    return $("."+id);
}

function build(element) {
    return $(document.createElement(element));
}


/**
 * Method to get events fom html and invokes a particular function
 * @param {string} element id used for fetch element from html
 * @param {event} action event type
 * @param {*} resultOperation function name 
 */
function addEventListeners(element,action,resultOperation) {
    element.addEventListener(action,resultOperation);
}

/**
 * Method contains all events handlings using id
 */
getElementById("main-menu").click(function(e){openMenu()});
getElementById("new-task").keyup(function(e){addTask()});
getElementById("main-menu-plus").click(function(e){openNavigation()});
//getElementById("display-task").keyup(function(e){deleteTask()});
getElementById("new-subtask").keyup(function(e){addSubTask()});
getElementById("new-step").keyup(function(e){addStep()});
getElementById("list-update").keyup(function(e){updateTaskName()});
getElementById("subtask-update").keyup(function(e){updateSubTaskName()});

/**
 * Method used to open and close navigation bar
 */
function openMenu(){
    let menuStatus = getElementById("menu-status").val();
    if(menuStatus == "closed"){
        getElementById("menu-status").val("opened");
        getElementByClass("side-bar").addClass("side-bar-open");
        getElementByClass("left-side-menu").addClass("left-side-menu-open");
    } else{
        getElementById("menu-status").val("closed");
        getElementByClass("side-bar").removeClass("side-bar-open");
        getElementByClass("left-side-menu").removeClass("left-side-menu-open");
    }
}

/**
 * Method used to open navigation bar,when user press the plus(+) icon
 */
function openNavigation(){
    getElementById("menu-status").val("opened");
    getElementByClass("side-bar").addClass("side-bar-open");
    getElementByClass("left-side-menu").addClass("left-side-menu-open");
};

/**
 * Method used to change my day attribute style
 */
getElementById("myday").click(function(e){
    getElementById("myday-text").toggleClass("myday-text");
});

/**
 * Method used to change important attribute style
 */
function important(){
    getElementById("important").style.fontWeight="600";
    getElementById("important").style.color="#3e69e9";
}

/**
 * Method used to change planned style
 */
function planned(){
    getElementById("planned").style.fontWeight="600";
    getElementById("planned").style.color="#3e69e9";
}

/**
 * Method used to change Assigned attribute style
 */
function assigned(){
    getElementById("assigned").style.fontWeight="600";
    getElementById("assigned").style.color="#3b7a28";
}

/**
 * Method used to change Assigned attribute style
 */
function tasks(){
    getElementById("tasks").style.fontWeight="600";
    getElementById("tasks").style.color="#3e69e9";
}

/**
 * Method used to create task when user gives some text input and press enter keycode
 * 
 */
function addTask() {
    let taskName = getElementById("new-task").val();
    if((13 == event.keyCode)&&("" !== taskName.trim())) {
        let task = {
            name: taskName,
            id: Date.now(),
            subTasks: []
        };
        list.push( task );
        getElementById("new-task").val("");
        displayTask(task);
        getTaskDetails(task);
    }
}

/**
 * Method get invoked when user presses one task,it will show task name on center page
 * @param {object} task task identification 
 */
function getTaskDetails( task ) {
    getElementById("sub-tasks").empty();
    hideSteps();
    taskObject = task;
        getElementById("list-update").val(taskObject);
        getElementById("list-name").val(taskObject.name);
        getElementById("list-name").addClass("tasks");
        getElementById("list-name").addClass("task-name");
        displaySubTasks(taskObject.subTasks );
        //let text = `<i id="click-task" class="icon fontIcon ms-Icon ms-Icon--More iconSize-24" aria-hidden="true"></i>`; 
}

/**
 * Method used to update task name when user gives task nameand press enter keycode
 */
function updateTaskName() {
    
    let taskName = getElementById("list-name").val();
    if((event.keyCode === 13)&&("" !== taskName.trim())) {
        taskObject.name = taskName;
        displayTasks();
    }
}

/**
 * Method used to display all tasks in list
 */
function displayTasks(){
    getElementById("list").empty();
    for( let task of list ){
        displayTask( task );
    }
}

/**
 * Method used to display particular task using taskname and task id
 * @param {object} task task object for show
 */
function displayTask( task ) {
    let taskDisplay = getElementById("list");
    let mainDiv = build("div");
    mainDiv.attr("id","display-task");
    mainDiv.attr("class", "sidebar-attribute tasks");
    mainDiv.click(function(e){getTaskDetails(task)});
    let divForImage = build("div");
    divForImage.attr("class","ms-Icon ms-Icon--BulletedList2 iconSize-24");
    let divForTaskName = build("div");
    divForTaskName.attr("class", "left-side-menu left-side-menu-open tasks-display");
    divForTaskName.text(task.name);
    divForImage.appendTo(mainDiv);
    divForTaskName.appendTo(mainDiv);
    mainDiv.appendTo(taskDisplay);
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
    let subTaskName = getElementById("new-subtask").val();
    if((event.keyCode == 13)&&(subTaskName.trim() !== "")) {
        var subTask = {
            name : subTaskName,
            id : Date.now(),
            steps : [],
            favorite:false,
            done : false
        };
        var subTasks = taskObject.subTasks;
        subTasks.push(subTask);
        getElementById("new-subtask").val("");
        displaySubTask(subTask);
    }
}

/**
 * Method used to update sub task name in list
 */
function updateSubTaskName(){
    let subTaskName = getElementById("subtask-name").val();
    if((event.keyCode === 13)&&( "" !== subTaskName.trim())){
        subTaskObject.name = subTaskName;
        displaySubTasks( taskObject.subTasks );
    }
}

/**
 * Method to display subtasks from particular task
 * @param {object} subtasks list of subtasks
 */
function displaySubTasks( subTasks ){
    if( subTasks ){
        getElementById("sub-tasks").empty();
        for(let subTask of subTasks){
            displaySubTask(subTask, subTask.done);
        }
    }
}

/**
 * Method used to display subtask after one subtask added
 * @param {object} subtask object contains one subtask detail
 */
function displaySubTask(subTask, status){
    let createdList = getElementById("sub-tasks");
    let newCreatedDiv = build("div");
    newCreatedDiv.attr("class", "sub-task");
    let buttonForOnclick = build("button");
    buttonForOnclick.attr("class", "center-left");
    let spanForImage = build("span");
    let cirleIcon = build("img");            
    buttonForOnclick.appendTo(newCreatedDiv);
    let spanForStepName = build("span");
    cirleIcon.appendTo(spanForImage);
    spanForImage.appendTo(buttonForOnclick);
    spanForStepName.attr("class", "middle");
    spanForStepName.appendTo(newCreatedDiv);
    spanForStepName.click(function(e){showStepDetails(subTask)});
    spanForStepName.text( subTask.name );
    let spanForClose = build("span");
    let iTag = build("i");
    iTag.attr("class", "icon fontIcon ms-Icon ms-Icon--FavoriteStar iconSize-24");
    iTag.appendTo(spanForClose);
    spanForClose.appendTo(newCreatedDiv);
    newCreatedDiv.appendTo(createdList);
    if(!status){
        cirleIcon.attr("src","images/circle.svg");
        spanForStepName.attr("class", "middle line-through-none");
        buttonForOnclick.click(function(e){strikeSubTask(subTask)});
    }
    if(status){
        cirleIcon.attr("src","images/chevron-circle-down.svg");
        spanForStepName.attr("class", "middle line-through");
        buttonForOnclick.click(function(e){strikeSubTask(subTask)});
    }
}

/**
 * Method to change subtask status
 * @param {object} subTask subtask detail
 */
getElementById("strike-subtask").click(function(e){
    console.log(subTaskObject);
    if( !subTaskObject.done ){
        subTaskObject.done = true;
    } else{
        subTaskObject.done = false;
    }
    displaySubTasks( taskObject.subTasks );
    showStepDetails( subTaskObject );
});

/**
 * Method to change subtask status
 * @param {object} subTask 
 */
function strikeSubTask( subTask ){
    if( !subTask.done ){
        subTask.done = true;
    } else{
        subTask.done = false;
    }
    displaySubTasks( taskObject.subTasks );
    showStepDetails( subTask );
}
/**
 * Method used to add step into subtask
 */
function addStep(){
    let stepName = getElementById("new-step").val();
    if((event.keyCode == 13)&&(stepName.trim() !=="")){ //enter keycode is 13
        let subTask = subTaskObject;
        let step = {
            name:stepName,
            completed:false
        };
        let steps = subTask.steps;
        steps.push( step );
        displayStep( step );
        getElementById("new-step").val("");
    }
}

/**
 * Method to display subtask name,and existing steps in subtasks
 * @param {*} id used for subtask identification
 */
function showStepDetails( subTask ){
    subTaskObject = subTask;
    showSteps();
    getElementById("steps").empty();
    getElementById("subtask-name").val(subTask.name);
    getElementById("subtask-name").addClass("tasks");
    getElementById("subtask-name").addClass( "task-name");
    displaySteps(subTask);
    if(subTask.done){
        getElementById("subtask-name").removeClass("line-through-none");
        getElementById("subtask-name").addClass("line-through");
        getElementById("image").attr("src","images/chevron-circle-down.svg");
    } else{
        getElementById("subtask-name").removeClass("line-through");
        getElementById("subtask-name").addClass("line-through-none");
        getElementById("image").attr("src","images/circle.svg");
    }    
}

function displaySteps( subTaskObject ){
    getElementById("steps").empty();
    for(let step of subTaskObject.steps){
        displayStep(step, step.completed);           
    }
}

/**
 * Method to show steps using css class
 */
function showSteps(){
    getElementById("right").show(100);
}

/**
 * Method to hide steps using css class
 */
function hideSteps(){
    getElementById("right").hide(100);
}

/**
 * Method used to display step using html code
 * @param {*} step - step object contains id,name,status
 */
function displayStep( step,flag ){
    let createdList = getElementById("steps");
    let newCreatedDiv = build("div");
    newCreatedDiv.attr("class", "sub-task");
    let spanForImage = build("span");
    let buttonForOnclick = build("button");
    spanForImage.attr("class", "center-left");
    let cirleIcon = build("img");            
    spanForImage.appendTo(newCreatedDiv);
    let spanForStepName = build("span");
    cirleIcon.appendTo(buttonForOnclick);
    buttonForOnclick.appendTo(spanForImage);
    spanForStepName.attr("class", "middle");
    spanForStepName.appendTo(newCreatedDiv);
    spanForStepName.text( step.name );
    let spanForClose = build("span");
    let iTag = build("i");
    iTag.attr("class","icon fontIcon ms-Icon ms-Icon--Cancel iconSize-16");
    iTag.appendTo(spanForClose);
    spanForClose.appendTo(newCreatedDiv);
    newCreatedDiv.appendTo(createdList);
    if(!flag){
        cirleIcon.attr("src","images/circle.svg");
        stepObject=step;
        buttonForOnclick.click(function(e){setStepComplete(step)});
    } else {
        cirleIcon.attr("src","images/chevron-circle-down.svg");
        stepObject = step;
        buttonForOnclick.click(function(e){setStepInComplete(step)});
        spanForStepName.attr("class", "middle line-through");
    }
}

function setStepComplete(step){
    step.completed = true;
    displaySteps( subTaskObject );
}

function setStepInComplete(step){
    step.completed = false;
    displaySteps( subTaskObject );
}

/**
 * Method to update step name 
 */
function updateStepName(){
    let stepName = getElementById("step-update").val();
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