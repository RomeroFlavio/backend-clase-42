const fs = require('fs')

class Todos {
    constructor() {
        this.todos = []
    }

    list() {
        return this.todos
    }

    add(title) {
        let todo = {
            title: title,
            complete: false
        }
        this.todos.push(todo)
    }

    complete(title) {
        if(this.todos.length === 0) {
            throw new Error('no todo list')
        }

        let todoFound = false
        this.todos.forEach( todo => {
            if(todo.title === title) {
                todo.complete = true
                todoFound = true
                return
            }
        })

        if(!todoFound) {
            throw new Error('No todo found')
        }
    }

    saveToFileCb(cb) {
        let fileContents = ''
        this.todos.forEach( todo => {
            fileContents += `${todo.title}, ${todo.complete}`
        })
        fs.writeFile('todo.txt', fileContents, cb)
    }

    saveToFilePromise() {
        let fileContents = ''
        this.todos.forEach( todo => {
            fileContents += `${todo.title}, ${todo.complete}`
        })

        return fs.promises.writeFile('todos.txt', fileContents)
    }
}

module.exports = Todos