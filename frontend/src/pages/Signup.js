import { useState } from 'react'
import useSignup from '../hooks/useSignUp'

export default function SignUp() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, isLoading, error} = useSignup()

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }


    const handleFormSubmit = async (e) => {
        e.preventDefault()
        // console.log(email, password)
        // setEmail('')
        // setPassword('')
        await signup(email, password)
    }


    return (
        <form onSubmit={handleFormSubmit} className='signup'>
            <h3>Signup</h3>
            <label>Email</label>
            <input type='email'
                onChange={handleEmailChange}
                value={email}
            />

            <label>Password</label>
            <input type='password'
                onChange={handlePasswordChange}
                value={password}
            />
            <button disabled={isLoading}>Sign up</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}