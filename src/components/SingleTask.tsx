import React, { useEffect, useRef, useState } from 'react'
import { Task } from '../model';
import {FiEdit} from 'react-icons/fi'
import './styles.css'
import { Draggable } from 'react-beautiful-dnd';

interface Props {
    index: number;
    task: Task,
    tasks: Array<Task>,
    setTasks: React.Dispatch<React.SetStateAction<Array<Task>>>;
}

const SingleTask:React.FC<Props> = ({index, task, tasks, setTasks}) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [editTask, setEditTask] = useState<string>(task.task);

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();

        setTasks(
            tasks.map((task) => (
                task.id === id ? {...task, task: editTask } : task
            ))
        );
        setEdit(false)
    };

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();    
    }, [edit]);


  return (
    <Draggable draggableId={task.id.toString()} index={index}>
        {(provided) => (
            <form 
                className='tasks_single' 
                onSubmit={(e) => handleEdit(e, task.id)}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref = {provided.innerRef}
            >
                { edit ? (
                    <input 
                        ref={inputRef}
                        value={editTask}
                        onChange={(e) => setEditTask(e.target.value)} 
                        className="tasks_single_text_edit"
                    />
                ) : ( 
                    <span className='tasks_single_text'>{task.task}</span>
                )}
                <div>
                    <span 
                    className="icon" 
                    onClick={(e) => {
                        if (edit) {
                            handleEdit(e, task.id);
                        } else {
                            setEdit(!edit);
                        }
                    }}
                    >
                        <FiEdit/>
                    </span>
                </div>
            </form>
        )}
    </Draggable>
  )
}

export default SingleTask
