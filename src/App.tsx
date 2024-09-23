import React, {useState} from 'react';
import './App.css';
import InputField from './components/InputField';
import { Task } from './model';
import TaskList from './components/TaskList';
import { DragDropContext, DropResult} from 'react-beautiful-dnd';

const App: React.FC = () => {

  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [progress, setProgress] = useState<number>(0);
  
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if(task) {
      setTasks([...tasks, {id: Date.now(), task: task, isCompleted: false}]);
      setTask("");
      setProgress((completedTasks.length/(tasks.length + 1 + completedTasks.length)) * 100);
    }
  }

  const onDragEnd = (result:DropResult) => {
    const { source, destination } = result;

    if(!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    let add, 
      active = tasks,
      complete = completedTasks

    if (source.droppableId === "TasksLists") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }


    if (destination.droppableId === "TasksLists") {
      active.splice(destination.index, 0, add);
    } else if (destination.droppableId === "TasksList_Completed") {
      complete.splice(destination.index, 0, add);
    } else if (destination.droppableId === "TasksList_Deleted") {}

    setCompletedTasks(complete);
    setTasks(active);
    setProgress((complete.length / (active.length + complete.length)) * 100);
  }


  return (
  <DragDropContext onDragEnd={onDragEnd}>
    <div className="App">
      <span className="App-header">
          <InputField task={task} setTask={setTask} handleAddTask={handleAddTask}/>
          <div className='progress-bar'>
            <div className='progress' style={{ width: `${progress}%` }}></div>
          </div>
      </span>
      <TaskList 
        tasks={tasks} 
        setTasks={setTasks}
        completedTasks={completedTasks} 
        setCompletedTasks={setCompletedTasks}
        progress={progress}
        setProgress={setProgress}
      />
    </div>
  </DragDropContext>
  );
};

export default App;
