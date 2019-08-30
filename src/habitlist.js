import React from 'react'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

class HabitList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            habits: []
        }
    }

    render(){
        let habitDOM;

        if(this.props.habitList !=[]){
            habitDOM = this.props.habitList.map(habit=>
            <li key={habit.id} data-id={habit.id}>
                <Link to={`/habit/${habit.id}`} >{habit.habitName}</Link>
                <span onClick={this.props.deleteHabit} className='deleteHabit'>   X</span>
            </li>
            
        )
        } else{
            habitDOM = "No Habits Added Yet"
        }

        return(
            <div>
                <h4>List all habits</h4>
                <ul>
                    {habitDOM}
                </ul>
            </div>
        )
    }
}

export default HabitList;