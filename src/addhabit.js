import React from 'react'

class AddHabit extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            newHabit: "",
            habitStart: new Date(),
            habitType: "Daily"
        }

    }


    addHabit(){
        console.log("adding habit")
        let existingHabbits = this.props.habitList
        existingHabbits.push({
            id: Math.floor(Math.random() * 10000),
            habitName: this.state.newHabit,
            streaks: [],
            habitStart: this.state.habitStart,
            habitType: this.state.habitType
        })

        localStorage.setItem('habitList', JSON.stringify(existingHabbits))
        
        this.props.onHabitAdded(existingHabbits)
    }

    updateHabit(e){
        this.setState({
            newHabit: e.target.value
        })
        
    }

    render(){
        return(
            <div>
                <h4>Add A Habit</h4>
                <input type="text" onInput={this.updateHabit.bind(this)}/>
                <select name="habit_frequency" id="habit_f">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                </select>
                <button onClick={this.addHabit.bind(this)}>Add</button>
            </div>
        )
    }
}

export default AddHabit;