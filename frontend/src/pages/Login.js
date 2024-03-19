import { useState } from 'react'
import useLogin from '../hooks/useLogin'

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, isLoading, error } = useLogin()


    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }


    const handleFormSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)

    }


    return (
        <form onSubmit={handleFormSubmit} className='login'>
            <h3>Login</h3>

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
            <button disabled={isLoading}>Log in</button>
            { error && <div className='error'>{error}</div>}
        </form>
    )
}