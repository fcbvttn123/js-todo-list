// Add todo 




// Click Event: marked as completed





// Click Event (x icon): marked as completed





// Saved in browser



// HTML Element

let inputTodoContent = document.querySelector("input[type='text']")
let addBtn = document.querySelector("button")

// My variables

let todoList = []




// Click Event: add button

addBtn.addEventListener("click", e => {
    e.preventDefault()
    let todoContent = inputTodoContent.value
    // Create unique id
    const currentDate = new Date();
    const uniqueId = currentDate.getTime().toString();
    // Get Template
    let temp = document.getElementsByTagName("template")[0];
    let clon = temp.content.cloneNode(true);
    // Place text
    clon.querySelector("li input").id = uniqueId
    clon.querySelector("li label").setAttribute("for", uniqueId)
    clon.querySelector("li label").innerText = todoContent
    // Move Template
    document.querySelector(".todo-list").appendChild(clon);
    // Update Array
    todoList.push({
        todoId: uniqueId, 
        content: todoContent,
        completed: false
    })
    console.log(todoList)
})

