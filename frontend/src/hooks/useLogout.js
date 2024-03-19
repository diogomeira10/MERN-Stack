import useAuthContext from "./useAuthContext"
import { useWorkoutsContext } from "../hooks/useWorkoutContext";



export default function useLogout ()  {

    const { dispatch: authDispatch } = useAuthContext()
    const { dispatch: workoutsDispatch } = useWorkoutsContext()

    


    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user')
        authDispatch({ type: 'LOGOUT' })
        workoutsDispatch({type: 'SET_WORKOUTS', payload: null})
    }
    
    return {logout}
}