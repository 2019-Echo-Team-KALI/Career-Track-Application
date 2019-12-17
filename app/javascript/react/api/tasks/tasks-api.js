function getTasks() {
    return fetch('/tasks')
        .then( resp => {
            if (resp.status === 200) {
                return resp.json()
            } else {
                return Promise.new(() => {
                    resolve({error: 'there was an error'})
                })
            }
        })
}

function createTask(task) { // this is the object
    return fetch('/tasks', {
        body: JSON.stringify(task),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    })
    .then( resp => {
        let json = resp.json()
        // this helped us understand more about what is being fetch
        return json
    })
    // this part is important for one of the functions that we did
    // .then(data => {
        // we're able to get the payload id once the job is created
        // here's a link to show the https://stackoverflow.com/questions/28916710/what-do-double-brackets-mean-in-javascript-and-how-to-access-them
    //     console.log("task's id", typeof data.id, data.id)
    //     setCurrentTaskId(data.id)
    // })
}

function getTask(id) {
    return fetch(`/tasks/${id}`)
        .then( resp => {
            if (resp.status === 200) {
                return resp.json()
            } else {
                resp.json()
                .then(payload => {
                    setErrors(payload.error)
                })
            }
        })
}

function editTask(task, id){ // this takes in a task object and an id
    return fetch(`/tasks/${id}`, {
        body: JSON.stringify(task),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PATCH',
    })
    .then(resp => {
        if (resp.status === 200) {
            let json = resp.json()
            return json
        } else {
            resp.json()
            .then(payload => {
                setErrors(payload.error)
            })
        }
    })
}

function deleteTask(id) {

    return fetch(`/tasks/${id}`, {
        method: 'DELETE'
    })
    .then(resp => {
        if (resp.status === 200) {
            // setGoBack(true)
        } else {
            resp.json()
            .then(payload => {
                setErrors(payload.error)
            })
        }
    })
}

export {
    getTasks,
    createTask,
    getTask,
    editTask,
    deleteTask
}
