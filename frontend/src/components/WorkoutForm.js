import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutContext'
 
export function WorkoutForm () {

    const { dispatch } = useWorkoutsContext()

    const [title,setTitle] = useState('')
    const [load,setLoad] = useState('')
    const [reps,setReps] = useState('')
    const [error,setError] = useState(null)


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

        const workout = {
            title,
            load,
            reps
        }

        const response = await fetch('/api/workouts/', {
            method: 'POST',
            body: JSON.stringify(workout), //We cant just send the workout as an object, we have to turn it into json.
            headers: {
                'Content-Type': 'application/json'
            }
        } )

        const json = await response.json()

        console.log(response)

        if(!response.ok) {
            setError(json.error)
        }

        if(response.ok) {
            dispatch({type:'CREATE_WORKOUT', payload: json})
            setTitle('')
            setLoad('')
            setReps('')
            console.log('new Workout added')

        }
        
    }

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <h3>Add a New Workout</h3>
                <label>Exercise Title</label>
                <input type='text' onChange={handleTitleChange} value={title} />
                <label>Load (in kg):</label>
                <input type='number' onChange={handleLoadChange} value={load} />
                <label>Reps:</label>
                <input type='number' onChange={handleRepsChange} value={reps} />
                <button>Add Workout</button>
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
    )
}

