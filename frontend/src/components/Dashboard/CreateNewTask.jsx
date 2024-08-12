const CreateNewTask = () => {
    console.log('task render')
    return (
        <div className="rounded-md shadow-md p-3">
           <header>
                <div className="flex gap-1">

                <button>X</button>
                <p className="flex-1 basis-[100px] border-b-2 border-black text-gray-400 font-poppins">Add a new task</p>
                <span>⭐</span>
                <span className="p-2 rounded text-sm">:</span>
                </div>
           </header>
           <main></main>
           <footer>
            <button className="bg-blue-900 p-2 px-3 font-poppins text-md text-white rounded">Create Task</button>
           </footer>
        </div>
    )
}
export default CreateNewTask;