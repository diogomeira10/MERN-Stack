import useAuthContext from "./useAuthContext"


export default function useLogout ()  {

    const { dispatch, state } = useAuthContext()

    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user')
        dispatch({ type: 'LOGOUT' })
        
    }
    
    return {logout}
}