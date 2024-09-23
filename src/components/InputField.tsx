import React, { useRef } from 'react'
import './styles.css';

interface Props {
    task: string;
    setTask: React.Dispatch<React.SetStateAction<string>>;
    handleAddTask: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({task, setTask, handleAddTask}) => {
    
    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <form 
            className='input' 
            onSubmit={(e) => {
                handleAddTask(e)
                inputRef.current?.blur()
            }}
        >
            <input
                ref={inputRef} 
                type="input"
                value={task}
                onChange={
                    (e) => setTask(e.target.value)
                } 
                placeholder="Enter a task" 
                className="input_box" 
            />
            <button type="submit" className="input_button">+</button>
        </form>
    )
}

export default InputField
