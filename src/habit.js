import React from 'react'

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import HabitCalander from './habitCalander'
 
class Habit extends React.Component{
    constructor(props){
        super(props);
        this.state={
            habitName: ''
        }
    }

    render(){
        
        let habitItem = this.props.habitList[this.props.match.params.id - 1]
        
        return(
            <div>
                <Link to='/'>Back</Link>
                <h2>{habitItem.habitName}</h2>
                <HabitCalander habit={habitItem}/>
            </div>
        )
    }
}

export default Habit;