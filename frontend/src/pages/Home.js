import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import useAuthContext from "../hooks/useAuthContext";

//components
import { WorkoutDetails } from "../components/WorkoutDetails";
import { WorkoutForm } from "../components/WorkoutForm";


export function Home () {

    const { workouts , dispatch } = useWorkoutsContext() //destructure what I need from the Workouts context
    const { user } = useAuthContext()


    useEffect(() => {
        const fetchWorkouts = async () => {
           const response = await fetch('/api/workouts', {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
           });
           const json = await response.json();

           if (response.ok) {
               dispatch({type:'SET_WORKOUTS', payload: json}) // When we fetch the list of workouts we want to update the workouts state with that
           }
        };
        if(user) {
            fetchWorkouts();
        }

    }, [dispatch, user])



    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                   <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>
            <WorkoutForm />
        </div>
    );
}







//BEFORE THE USE_REDUCER AND CONTEXT IMPLEMENTATION


/* import { useEffect, useState } from "react";
import { WorkoutDetails } from "../components/WorkoutDetails";
import { WorkoutForm } from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";

export function Home () {

    const [workouts, setWorkouts] = useState([]);

    const { state, dispatch } = useWorkoutsContext()


    useEffect(() => {
        const fetchWorkouts = async () => {
           const response = await fetch('/api/workouts');
           console.log(response)
           const json = await response.json();
           console.log(json)

           if (response.ok) {
               setWorkouts(json);
           }
        };
        fetchWorkouts();
    }, [])



    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                   <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>
            <WorkoutForm />
        </div>
    );
}
 */