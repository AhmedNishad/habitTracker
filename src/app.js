import React from 'react'

import {Route, Link, BrowserRouter as Router} from 'react-router-dom'

import AddHabit from './addhabit'
import HabitList from './habitlist'
import Habit from './habit'

class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            habitList: []
        }
        
    }
    
    habitAdded(newHabits){
        console.log("updating State")
        this.setState({
            habitList: newHabits
        })
    }

    deleteHabit(e){
        let habitList = JSON.parse(localStorage.getItem('habitList'))
        habitList.forEach((habit, key, arr)=>{
            console.log(e.target.parentElement)
            if(habit.id == e.target.parentElement.getAttribute('data-id')){
                arr.splice(key, 1)
            }
        })
        console.log(habitList)
        localStorage.setItem('habitList', JSON.stringify(habitList))
        this.setState({
            habitList: habitList
        })
    }

    componentDidMount(){
        let habits
        if(localStorage.getItem('habitList') == null){
            habits = []
        }else{
             habits = JSON.parse(localStorage.getItem('habitList'))
        }
        

        this.setState({
            habitList: habits
        })
    }

    render(){
        let habits
        if(localStorage.getItem('habitList') == null){
            habits = []
        }else{
             habits = JSON.parse(localStorage.getItem('habitList'))
        }
        
        return (
            <Router>
                <div>
                    <Route exact path='/' render={()=> <h2>Track your Habits and Grow!</h2>} /> 
                    {/* <AddHabit path='/' habitList={this.state.habitList} onHabitAdded={this.habitAdded.bind(this)}/> */}
                    <Route exact path='/' render={(props)=> <AddHabit {...props} path='/' habitList={this.state.habitList} onHabitAdded={this.habitAdded.bind(this)}/> } />

                    <Route exact path='/' render={(props)=> <HabitList {...props} deleteHabit={this.deleteHabit.bind(this)} habitList={this.state.habitList} />} />

                    <Route path='/habit/:id' render={(props)=> <Habit {...props} habitList={this.state.habitList}/>} />
                    {/*< HabitList path='' habitList={this.state.habitList} /> */}
                </div>
            
            </Router>
            
        )
    }
}

export default App;