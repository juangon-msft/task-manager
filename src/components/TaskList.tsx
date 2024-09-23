import React, {useState, useEffect} from 'react';
import "./styles.css"
import { Task } from '../model';
import SingleTask from './SingleTask';
import { Droppable } from 'react-beautiful-dnd';

interface Props {
    tasks: Array<Task>;
    setTasks: React.Dispatch<React.SetStateAction<Array<Task>>>;
    completedTasks: Array<Task>;
    setCompletedTasks: React.Dispatch<React.SetStateAction<Array<Task>>>;
    progress: number;
    setProgress: React.Dispatch<React.SetStateAction<number>>;
}

const TaskList:React.FC<Props> = ({tasks, setTasks, completedTasks, setCompletedTasks, progress, setProgress}) => {

    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const date = new Date();
      const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
      const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
      const formattedDate = date.toLocaleDateString('en-US', dateOptions);
      const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
      setCurrentDate(`${formattedDate}`);
      setCurrentTime(`${formattedTime}`);
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);
  
  const handleDeleted = () => 
    {
        setTasks([]);
        setCompletedTasks([]);
        setProgress(0);
    };

  return (
    <div className="container">
        <div>
            <span className="Time">
                <span className="Date-logo" >⏰</span>
                {currentTime}
            </span>

            <span className="Date"> 
                <span className="Date-logo" >🗓️</span>
                {currentDate}
            </span>

            <div className='notes_container'>
                <label>Notes</label> 
                <span>
                    <textarea className="input_notes"/>
                </span>
            </div>
        </div>

        <Droppable droppableId="TasksLists">
            {(provided, snapshot) => (
                <div 
                    className={`tasks ${snapshot.isDraggingOver ? "dragging" : ""}`} 
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    <span className="tasks_heading">Active</span>
                    {tasks?.map((task, index) => (
                        <SingleTask 
                            index={index}
                            key={task.id} 
                            task={task} 
                            tasks={tasks} 
                            setTasks={setTasks} 
                        />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>

        <Droppable droppableId="TasksList_Completed">
        {(provided, snapshot) => (
            <div 
                className={`tasks_completed ${snapshot.isDraggingOver ? "dragComplete" : ""}`}
                ref={provided.innerRef}
                {...provided.droppableProps}
            >
                <span className="tasks_heading">Completed</span>
                {completedTasks?.map((task, index) => (
                    <SingleTask 
                        index={index}
                        key={task.id} 
                        task={task} 
                        tasks={completedTasks} 
                        setTasks={setCompletedTasks} 
                    />
                ))}
                {provided.placeholder}
            </div>
         )}
        </Droppable>

        <Droppable droppableId="TasksList_Deleted">
        {(provided, snapshot) => (
            <div className={`Deleted_tasks_heading ${snapshot.isDraggingOver ? "dragDelete" : ""}`}
                ref={provided.innerRef}
                {...provided.droppableProps}
            >
                <span 
                    className="Deleted_tasks_heading"
                    onClick={() => handleDeleted()}>
                    🗑️
                </span>
            </div>
         )}
        </Droppable>
    </div>
  )
}

export default TaskList;
