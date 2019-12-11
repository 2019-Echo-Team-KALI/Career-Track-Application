function getTask() {
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

