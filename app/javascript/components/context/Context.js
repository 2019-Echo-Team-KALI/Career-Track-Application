import React, { useState } from 'react'

const Context = React.createContext()

function ContextProvider({children}) {
    const [ test, setTest] = useState("HOLY CRAP THIS WORKS")

    return (
        <Context.Provider value={{test: test}}> {/** here we pass in an object which is the array of photos using the value of this context provider to be accessed within the child component, in this case it ill be sent to our app*/}
        {children} {/** Since this is a custom component we need to render a child prop */}
        </Context.Provider>
    )
}

export {ContextProvider, Context} // we are exporting a named export and we need to export the Context so we can use useContext later on