import { useState } from 'react'

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }


    const handleFormSubmit = (e) => {
        e.preventDefault()

        console.log(email, password)

        setEmail('')
        setPassword('')
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
        </form>
    )
}