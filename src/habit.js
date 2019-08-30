import React from 'react'

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import HabitCalander from './habitCalander'
 
function daysInMonth (month, year){ 
    return new Date(year, month, 0).getDate(); 
} 

function isNextDay(date1, date2){ // Is date 2 the day after date 1
    let isNext = false;
    // Is it the same or next year
    if(date1.getFullYear() == date2.getFullYear()){
        // Is it the same month or next month
        if(date1.getMonth() == date2.getMonth()){
            if(date1.getDate()+1 == date2.getDate()){
                isNext = true;
            }

        }else if(date1.getMonth()+1 == date2.getMonth() ){
            // Is the next month january or not
            if(date2.getMonth() < 11){
                if(date2.getDate() == 1 && date1.getDate()==daysInMonth(date1.getMonth(), date1.getFullYear())){
                    isNext = true
                }
            }
        }

    }else if(date1.getFullYear()+1 == date2.getFullYear()){
        // Is it the cur date is last day of the year if so, is the next date the first day of the year
        if(date1.getMonth() == 11 && date1.getDate()==daysInMonth(date1.getMonth()+1, date1.getFullYear())
        && date2.getMonth()==0 && date2.getDate()==1){
            isNext = true;
        }
    }

    return isNext;
}

class Habit extends React.Component{
    constructor(props){
        super(props);
        this.state={
            habitName: '',
            daysDone: []
        }
    }

    updateDays(daysArr){
        this.setState({
            daysDone: daysArr
        })
    }

    calculateLongestStreak(){
        let days = this.state.daysDone;
        let lStreak = 0
        let streak = 0;
        days.forEach((day, key, arr)=>{
            //let daysIn = daysInMonth(day.getMonth(), day.getFullYear())
            if(key < arr.length-1){
                //console.log(arr[key+1] + ' ' + day)
                if(isNextDay(day, arr[key+1])){
                   // console.log('Is next day')
                    streak += 1;
                    if(streak > lStreak){
                        lStreak = streak
                    }
                }else{
                    streak = 1;
                }
            }else if(key == arr.length){
                if(isNextDay(day, arr[key])){
                    // console.log('Is next day')
                     streak += 1;
                     if(streak > lStreak){
                         lStreak = streak
                     }
                 }else{
                     streak = 1;
                 }
            }
            
        })
        if(days.length == 0){
            lStreak = 0
        }
        if(days.length == 1){
            lStreak =1;
        }
        return lStreak;
    }

    render(){
        let longestStreak = this.calculateLongestStreak()
        console.log(this.props)
        let habitItem = this.props.habitList.find(item=> item.id == this.props.match.params.id)
        
        return(
            <div className='habitContainer'>
                <Link to='/'>Back</Link>
                <h2 id='habitTitle'>{habitItem.habitName}</h2>
                <h3>Longest Streak {longestStreak}</h3>
                <HabitCalander id='habitCalander' updateDays={this.updateDays.bind(this)} habit={habitItem}/>
            </div>
        )
    }
}

export default Habit;