import React from 'react'

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
 
class HabitCalander extends React.Component{
    constructor(props){
        super(props);
        this.state={
            daysDone: [],
            habitStart: ''
        }
    }

    addDate(e){
        
        let today = new Date();
        let daysArray = this.state.daysDone;
        
        let dayExists = false;
        daysArray.forEach((day,i,arr)=>{
            if(day.getDate() == today.getDate() && day.getMonth() == today.getMonth() && day.getFullYear() == today.getFullYear()){
                console.log('Remove date'+ i);
                arr.splice(i, 1)
                dayExists = true;
            }
        })
        if(!dayExists){
            daysArray.push(today)
        }
        this.setState({
            daysDone: daysArray
        })
        console.log(this.state.daysDone);
    }

    render(){
        function daysInMonth (month, year){ 
            return new Date(year, month, 0).getDate(); 
        } 
        let startDate = new Date(this.props.habit.habitStart)
        let date = new Date()
        let numDays = daysInMonth(date.getMonth(), date.getFullYear());
        let dayCards = []
        for(let i = 1; i < numDays + 1; i++){
            let dayCard;
            if(i == date.getDate()){
                dayCard =  <div key={i} className='dayCard currentDay'> <h4>{i}</h4> </div>
            }else if(i == startDate.getDate()){
                dayCard =  <div key={i} className='dayCard startDay'> <h4>{i}</h4> </div>
            }else{
                dayCard =  <div key={i} className='dayCard'> <h4>{i}</h4> </div>
            }
           // dayCard.setAttribute('date', new Date(`${date.getFullYear}-${date.getMonth}-${i}`))
            dayCards.push(dayCard)
        }

        return(
            <div>
                <h2 className='calanderHeader'>{date.getFullYear()}/ {date.getMonth() + 1}</h2>
                <button onClick={this.addDate.bind(this)}>Completed Today</button>
                <div className='dayCards'>{dayCards}</div>
            </div>
        )
    }
}

export default HabitCalander;