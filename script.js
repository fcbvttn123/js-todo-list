// HTML Element

let inputTodoContent = document.querySelector("input[type='text']")
let addBtn = document.querySelector("button")

// My variables

let todoList = []

// App Flow
getAndPrintTodoItems()




// Click Event: add button

addBtn.addEventListener("click", e => {
    e.preventDefault()
    let todoContent = inputTodoContent.value
    if(todoContent.length == 0) {
        return
    }
    // Create unique id
    const currentDate = new Date();
    const uniqueId = currentDate.getTime().toString();
    // Create and Move Template
    createTemplate(uniqueId, todoContent, false)
    // Update Array
    todoList.push({
        todoId: uniqueId, 
        content: todoContent,
        completed: false
    })
    // Saved to local browser
    let todoListString = JSON.stringify(todoList)
    localStorage.setItem("todo-list-app", todoListString)
})




// Function: get and print todo items

function getAndPrintTodoItems() {
    let connectArray = JSON.parse(localStorage.getItem("todo-list-app"))
    if(connectArray == null) {
        return
    }
    todoList = connectArray
    todoList.forEach(element => {
        createTemplate(element.todoId, element.content, element.completed)
    });
}




// Function: create "todo item" template and print

function createTemplate(id, content, completedStatus) {
    // Get Template
    let temp = document.getElementsByTagName("template")[0];
    let clon = temp.content.cloneNode(true);
    // Place text
    clon.querySelector("li input").id = id
    clon.querySelector("li label").setAttribute("for", id)
    clon.querySelector("li label").innerText = content
    clon.querySelector("li :is(label, input)").addEventListener("click", changeCompleteStatus)
    clon.querySelector("li .material-symbols-outlined").addEventListener("click", removeTodo)
    clon.querySelector("li").dataset.todoId = id

    // Check status
    clon.querySelector("li input").checked = completedStatus
    // Move Template
    document.querySelector(".todo-list").appendChild(clon);
}




// Function: complete status

function changeCompleteStatus(e) {
    // Get id of item clicked
    let targetId = e.target.id
    // Edit
    todoList.forEach(e => {
        if(e.todoId == targetId) {
            e.completed = !e.completed
        }
    })
    // Saved to local browser
    let todoListString = JSON.stringify(todoList)
    localStorage.setItem("todo-list-app", todoListString)
}




// Function: remove 

function removeTodo(e) {
    document.querySelector(".todo-list").innerHTML = ""
    let removeIcon = e.target
    let removedId = removeIcon.closest("li").dataset.todoId
    let updatedArray = todoList.filter(e => e.todoId !== removedId);
    updatedArray = JSON.stringify(updatedArray)
    localStorage.setItem("todo-list-app", updatedArray)
    getAndPrintTodoItems()
}

