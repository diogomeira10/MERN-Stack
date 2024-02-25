import { createContext, useReducer } from "react"; //This function lets us make a new context we can then provide to our application

//The purpose of this context is not to interact with the database but to keep the local state in SYNC with the database

export const WorkoutsContext = createContext()

export const WorkoutsReducer = (state, action) => { //This function has two arguments, the previous state(before we change it),and the action object that has a type and payload properties
    //What typically is done is checking the action type. So what do we want to do with the data.

    switch (action.type) { //What we do in this cases is return the new value we want the state to be
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload //This is because if we want to set all of the workouts then the payload property on the action that we pass into the dispatch function would be an array with all of the workouts
            }
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts] //we want to add the new workout to the previous state list of workouts
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((workout) => workout._id !== action.payload._id)
            };


        default:
            return state
    }

}



export const WorkoutsContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(WorkoutsReducer, { workouts: null }) //This is similar to useState

    //if we want to update the state object, we first call the dispatch function.
    /* dispatch({type: 'SET_WORKOUTS', payload: [{},{}]}) the payload represents any data we need to make this change  */
    //When we call the dispatch function we invoque the reducer function, and it passes the action into the reducer function, so it can do its thing and update the state using that information and data

    return (
        <WorkoutsContext.Provider value={{ ...state, dispatch }}> {/* We need to provide the state and dispatch object so they are avaiable in other components. The data passed in as the value is the WorkoutsContext value */}
            {children}
        </WorkoutsContext.Provider>
    )
}

