import { createContext, useReducer } from "react";

const Context = createContext(null);
export default Context;

const UserContext = (props) => {
    const [isLogedIn, setIsLogedIn] = useReducer( (old) => !old , true);
    
    // cookie se update....

    return <Context.Provider value={{isLogedIn, setIsLogedIn}}>
        { props.children }
    </Context.Provider>
}


export { UserContext }