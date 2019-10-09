/*function display(){
    let x = getElementById("small");
    let y = getElementById("large");
    alert(x);
    if( x.value === "closed"){
        alert(x.style.display);
        document.getElementById("smallSidebar").style.display = none;
        document.getElementById("largeSidebar").style.display = block;
    }
    if( y.value  === "opened"){
        alert(x.style.display);
        document.getElementById("smallSidebar").style.display = block;
        document.getElementById("largeSidebar").style.display = none;
    }
}*/
"use strict";
init();

function init() {
    addEventListeners(getElementById("main-menu"),"click",openMenu);
    addEventListeners(getElementById("new-list"),"keyup",createList);
}

function getElementById(id) {
    return document.getElementById(id);
}

function getElementsByClassName(id) {
    return document.getElementsByClassName(id);
}

function addEventListeners(element,action,resultOperation) {
    element.addEventListener(action,resultOperation)
}

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
function createList(){
    if( event.keyCode == 13 ){
        var todoList = document.getElementById("new-list").value;
        if( todoList ) {
            
        }
    }
}
    
