const inputDOM = document.querySelector("#input")
const listDOM = document.querySelector("#list")
const alertDOM = document.querySelector("#alert")

document.querySelector("button[type='submit']").addEventListener("click", (event) => {
    event.preventDefault()
})

if (localStorage.getItem("todos") === null) {
    localStorage.setItem("todos", "[]")
}

listLocalStorage()

function add() {
    // CONDITIONS
    if (inputDOM.value == "" || inputDOM.value == null) {
        alertDOM.innerHTML = `<div class="alert alert-danger d-flex justify-content-between" role="alert">
            You cannot add an empty task.<a href="#" onclick="closeAlert()"><i class="fa fa-remove text-danger"></i></a>
        </div>`
        setTimeout(() => {
            alertDOM.innerHTML = ""
        }, 3000);
    } else {
        let isAvailable = false
        for (let i = 0; i < listDOM.childElementCount; i++) {
            if (listDOM.children[i].children[0].textContent == inputDOM.value) {
                alertDOM.innerHTML = `<div class="alert alert-primary d-flex justify-content-between" role="alert">
                    There is already a task like this.<a href="#" onclick="closeAlert()"><i class="fa fa-remove text-primary"></i></a>
                </div>`
                setTimeout(() => {
                    alertDOM.innerHTML = ""
                }, 3000);
                isAvailable = true
                inputDOM.value = ""
            }
        }
        if (!isAvailable) {
            // add item into ui
            const newItem = document.createElement("li")
            newItem.className = "list-group-item d-flex justify-content-between"
            newItem.innerHTML = `<span>${inputDOM.value}</span><a href="#" onclick="removeTask(event)"><i class="fa fa-remove text-primary"></i></a>`
            listDOM.appendChild(newItem)

            // add item into localStorage
            addTodoToStorage(inputDOM.value)

            // clear areas
            alertDOM.innerHTML = ""
            inputDOM.value = ""
        }
    }
}

function getTodosFromStorage() {
    let todos

    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    return todos
}

function addTodoToStorage(newValue) {
    let todos = getTodosFromStorage()
    todos.push(newValue)

    localStorage.setItem("todos", JSON.stringify(todos))
}

function closeAlert() {
    alertDOM.innerHTML = ""
}

function clearAll() {
    localStorage.setItem("todos","[]")
    listDOM.innerHTML = ""
}

function removeTask(e) {
    let itemContent = e.target.parentElement.previousElementSibling.innerHTML
    let todos = JSON.parse(localStorage.getItem("todos"))
    
    var index = todos.indexOf(itemContent);
    if (index !== -1) {
        todos.splice(index, 1);
    }
    
    e.target.parentElement.parentElement.remove()
    localStorage.setItem("todos", JSON.stringify(todos))
}

function listLocalStorage() {
    let todos = JSON.parse(localStorage.getItem("todos"))
    todos.forEach((e) => {
        const itemFromStorage = document.createElement("li")
        itemFromStorage.classList = "list-group-item d-flex justify-content-between"
        itemFromStorage.innerHTML = `<span>${e}</span><a href="#" onclick="removeTask(event)"><i class="fa fa-remove"></i></a>`
        listDOM.appendChild(itemFromStorage)
    })
}
