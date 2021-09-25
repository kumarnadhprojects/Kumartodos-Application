let todoItemsContainerElement = document.getElementById("todoItemsContainer");
let addTotoButtonElement = document.getElementById("addTotoButton");
let savetodobuttonElement = document.getElementById("savetodobutton");

function gettodoList() {
    let getStorage = localStorage.getItem("todoList");
    let storageParse = JSON.parse(getStorage);
    if (storageParse === null) {
        return [];
    } else {
        return storageParse;
    }
}

savetodobuttonElement.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};
let todoList = gettodoList();
let todocount = todoList.length;

function ontoStatus(checkId, todoId, deletedElement) {
    let checkboxElement = document.getElementById(checkId);
    let todoIdElement = document.getElementById(todoId);
    todoIdElement.classList.toggle("checked");

    let checkedElement = todoList.findIndex(function(eachItem) {
        let checked = "checkbox" + eachItem.uniqueNo;
        if (checked === checkId) {
            return true;
        } else {
            return false;
        }
    });
    let checkObject = todoList[checkedElement];
    if (checkObject.isChecked === true) {
        checkObject.isChecked = false;
    } else {
        checkObject.isChecked = true;
    }
}

function ondelete(deletedElement) {
    let deletedElementlist = document.getElementById(deletedElement);
    todoItemsContainerElement.removeChild(deletedElementlist);

    let deleteIndex = todoList.findIndex(function(eachItem) {
        let deleteElement = "item" + eachItem.uniqueNo;
        if (deletedElement === deleteElement) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deleteIndex, 1);
}

function checkingTodolist(todo) {
    let checkId = "checkbox" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;
    let deletedElement = "delete" + todo.uniqueNo;

    let listitemElement = document.createElement("li");
    listitemElement.classList.add("todo-item-container", "d-flex", "flex-row");
    listitemElement.id = deletedElement;
    todoItemsContainerElement.appendChild(listitemElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkId;
    inputElement.checked = todo.isChecked;
    inputElement.classList.add("checkbox-input");
    inputElement.onclick = function() {
        ontoStatus(checkId, todoId, deletedElement);
    };
    listitemElement.appendChild(inputElement);

    let labelContainerElement = document.createElement("div");
    labelContainerElement.classList.add("d-flex", "flex-row", "label-container");
    listitemElement.appendChild(labelContainerElement);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkId);
    labelElement.id = todoId;
    labelElement.textContent = todo.text;
    labelElement.classList.add("checkbox-label");
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainerElement.appendChild(labelElement);

    let deleteElement = document.createElement("div");
    deleteElement.classList.add("delete-icon-container");
    labelContainerElement.appendChild(deleteElement);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        ondelete(deletedElement);
    };
    deleteElement.appendChild(deleteIcon);
}
for (let i of todoList) {
    checkingTodolist(i);
}

addTotoButtonElement.onclick = function() {
    let addButtonElement = document.getElementById("todoUserInput");
    let addButtonValue = addButtonElement.value;
    if (addButtonValue === "") {
        alert("Please enter valid input");
    } else {
        todocount = todocount + 1;
        let newElement = {
            text: addButtonValue,
            uniqueNo: todocount,
            isChecked: false
        };
        todoList.push(newElement);
        checkingTodolist(newElement);
        addButtonElement.value = "";
    }
}