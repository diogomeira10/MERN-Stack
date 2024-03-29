import { useWorkoutsContext } from "../hooks/useWorkoutContext"
import { FaRegTrashCan } from "react-icons/fa6";
import { formatDistanceToNow } from 'date-fns'
import useAuthContext from "../hooks/useAuthContext";


export function WorkoutDetails({ workout }) {

    const { dispatch } = useWorkoutsContext()

    const { user } = useAuthContext()

    const handleClick = async () => {

        if(!user) {
            return 
        }

        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()
        console.log(json)

        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: json })
        }
    }

    return <div className='workout-details'>
        <h4>{workout.title}</h4>
        <p><strong>Load (kg):</strong> {workout.load}</p>
        <p><strong>Reps:</strong> {workout.reps}</p>
        <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
        <span onClick={handleClick}><FaRegTrashCan />
        </span>
    </div>

}