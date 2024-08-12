import { useState } from "react"
import CreateNewTask from "./CreateNewTask.jsx"

const BoardOverview = () => {
    const [taskList, setTaskList] = useState([])

    const newTask = () => {
            const num = Math.floor(Math.random() * 10)
            setTaskList((old) => [...old, num])  
    }

    return (
        <section>
        <h1>Board OverView</h1>
        <button onClick={newTask } className="border-2 border-white px-4 py-2">Add New Task</button>
        <div>
            <h1>All Task List</h1>
            {               
                taskList.map((_, index) =>{console.log('map run ', index); return <CreateNewTask key={index}/> })
            }
        </div>
        </section>
    )
}

export default BoardOverview;