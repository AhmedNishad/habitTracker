import React from 'react'

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

function sameDay(date1, date2){
    return date1.getDate() == date2.getDate() && date1.getMonth() == date2.getMonth() && date1.getFullYear() == date2.getFullYear()
}
function sameMonth(date1, date2){
    return date1.getMonth() == date2.getMonth() && date1.getFullYear() == date2.getFullYear()
}

function daysInMonth (month, year){ 
    return new Date(year, month, 0).getDate(); 
} 
 
class HabitCalander extends React.Component{
    constructor(props){
        super(props);
        this.state={
            daysDone: [],
            habitStart: '',
            activeDate: new Date()
        }
    }

    componentDidMount(){
        // Sort date array
        let dateArr = this.state.daysDone;

        dateArr.sort((a, b)=>{
            return a - b
        })

        this.setState({
            activeDate: new Date(),
            daysDone: dateArr
        })
        this.props.updateDays(this.state.daysDone)
    }

    addDate(e){
        
        let today = new Date();
        let daysArray = this.state.daysDone;
        
        let dayExists = false;
        daysArray.forEach((day,i,arr)=>{
            if(sameDay(today, day)){
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
        this.props.updateDays(daysArray)
    }

    changeActiveDate(direction , currentDate){
       // console.log('Changing active date')
        let newDate;
        let newDay = 15;
        let newMonth;
        let newYear;

        if(direction == 0){
            // Go back
            if(currentDate.getMonth() == 0){
                newYear = currentDate.getFullYear() - 1
                newMonth = 11
            }else{
                newMonth = currentDate.getMonth() - 1;
                newYear = currentDate.getFullYear();
            }
        }else{
            // Go forward
            if(currentDate.getMonth() == 11){
                newYear = currentDate.getFullYear() + 1
                newMonth = 0
            }else{
                newMonth = currentDate.getMonth() + 1;
                newYear = currentDate.getFullYear();
            }
        }

        newDate = new Date(newYear, newMonth, newDay)
        this.setState({
            activeDate: newDate
        })
    }

    render(){
        let activeDate = this.state.activeDate;
        let startDate = new Date(this.props.habit.habitStart)
        let todayDate = new Date()
        let numDays = daysInMonth(activeDate.getMonth() + 1, activeDate.getFullYear());
        let dayCards = []
        for(let i = 1; i < numDays + 1; i++){

            let doneDays = this.state.daysDone;
            let dayHasBeenDone = false;

            doneDays.forEach(day=>{
                if(day.getDate() == i && sameMonth(activeDate, day)){
                    dayHasBeenDone = true;
                }
            })

           // console.log(dayHasBeenDone)

            let dayCard;
            if(sameMonth(todayDate, activeDate) && i==todayDate.getDate()){ // Is the current date being rendered
                dayCard =  <div key={i} className='dayCard currentDay'> <h4>{i}</h4> </div>
            }else if(i == startDate.getDate() && sameMonth(activeDate, startDate)){ // Is the start date being rendered
                dayCard =  <div key={i} className='dayCard startDay'> <h4>{i}</h4> </div>
            }else if(dayHasBeenDone){ // Has the rendering day been done
                dayCard =  <div key={i} className='dayCard doneDay'> <h4>{i}</h4> </div>
            }else{
                dayCard =  <div key={i} className='dayCard' onClick={()=> console.log(new Date(activeDate.getFullYear(), activeDate.getMonth(), i) + ' ' + numDays)}> <h4>{i}</h4> </div>
            }
           // dayCard.setAttribute('date', new Date(`${date.getFullYear}-${date.getMonth}-${i}`))
            dayCards.push(dayCard)
        }

        return(
            <div>
                <div className='dateControls'>
                    <button className='button-cool button-change' onClick={()=>this.changeActiveDate(0, activeDate)}>Back</button>
                    <h2 className='calanderHeader'>{activeDate.getFullYear()}/ {activeDate.getMonth()+1}</h2>
                    <button className='button-cool button-change' onClick={()=>this.changeActiveDate(1, activeDate)}>Forward</button>
                </div>
                
                <button className='button-cool button-complete' onClick={this.addDate.bind(this)}>Completed Today</button> <br />
                <div className='dayCards'>{dayCards}</div>
            </div>
        )
    }
}

export default HabitCalander;