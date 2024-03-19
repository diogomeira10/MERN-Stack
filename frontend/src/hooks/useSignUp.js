import { useState } from "react";
import useAuthContext from "./useAuthContext";


export default function useSignup() {

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()
 
    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/signup',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email, password})
            })

        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok){
            //save the user to local storage
            //We do this is because, if the user crosses off our website and returns later, our global state for that user will have reset to null, however we can still detect that a user is loged in with the presence of that json web token in local storage
            localStorage.setItem('user', JSON.stringify(json))

            //update the auth context
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)

        }

    }

    return {signup, isLoading, error }

}