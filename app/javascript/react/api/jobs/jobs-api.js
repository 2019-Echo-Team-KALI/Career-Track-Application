function getJobs() {
    return fetch('/jobs')
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

function createJob(job) {
    return fetch('/jobs', {
        body: JSON.stringify(job),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    })
    .then( resp => {
        let json = resp.json()
        // this helped us understand more about what is being fetch
        console.log("resp", resp)
        console.log("json", json)
        console.log("id", json.id)
        return json
    })
    // this part is important for one of the functions that we did
    // .then(data => {
        // we're able to get the payload id once the job is created
        // here's a link to show the https://stackoverflow.com/questions/28916710/what-do-double-brackets-mean-in-javascript-and-how-to-access-them
    //     console.log("job's id", typeof data.id, data.id)
    //     setCurrentJobId(data.id)
    // })
}

function getJob(id) {
    return fetch(`/jobs/${id}`)
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

function editJob(job,id){
    return fetch(`/jobs/${id}`, {
        body: JSON.stringify(job),
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

function deleteJob(id) {

    return fetch(`/jobs/${id}`, {
        method: 'DELETE'
    })
    .then(resp => {
        if (resp.status === 200) {
            setGoBack(true)
        } else {
            resp.json()
            .then(payload => {
                setErrors(payload.error)
            })
        }
    })
}

export {
    getJobs,
    createJob,
    getJob,
    editJob,
    deleteJob
}
