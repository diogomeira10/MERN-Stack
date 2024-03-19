import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutContext'
import useAuthContext from '../hooks/useAuthContext'

export function WorkoutForm() {

    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])


    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    const handleLoadChange = (e) => {
        setLoad(e.target.value)
    }
    const handleRepsChange = (e) => {
        setReps(e.target.value)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        if(!user) {
            setError('You must be loged in')
            return 
        }

        const workout = {
            title,
            load,
            reps
        }

        const response = await fetch('/api/workouts/', {
            method: 'POST',
            body: JSON.stringify(workout), //We cant just send the workout as an object, we have to turn it into json.
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        console.log(response)

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if (response.ok) {
            dispatch({ type: 'CREATE_WORKOUT', payload: json })
            setTitle('')
            setLoad('')
            setReps('')
            setEmptyFields([])
            console.log('new Workout added')

        }

    }

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <h3>Add a New Workout</h3>
                <label>Exercise Title</label>
                <input type='text' onChange={handleTitleChange} value={title} className={emptyFields.includes('title') ? 'error' : ''}/>
                <label>Load (in kg):</label>
                <input type='number' onChange={handleLoadChange} value={load} className={emptyFields.includes('load') ? 'error' : ''}/>
                <label>Reps:</label>
                <input type='number' onChange={handleRepsChange} value={reps} className={emptyFields.includes('reps') ? 'error' : ''}/>
                <button>Add Workout</button>
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
    )
}

