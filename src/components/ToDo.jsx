import React from 'react';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AddToDo = () => {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(false)
  const [ongoingTask, setOngoingTask] = useState(null);

  useEffect(() => {
    let todoString = localStorage.getItem('todos');
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem('todos'));
      setTodos(todos);
    }
  }, []);

  const savetoLocalStorage = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const handleAdd = () => {
    if (todo.trim() === '') return;
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo('');
    savetoLocalStorage();
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((item) => item.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    savetoLocalStorage();
  };

  const handleOngoing = (id) => {
    setOngoingTask(id);
    savetoLocalStorage();
  };


  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    savetoLocalStorage();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    savetoLocalStorage();
  };

  const handleCompletedTasks = (e) => {
    setshowFinished(!showFinished);
  };

  const handleReset = () => {
    setTodos([]);
    savetoLocalStorage();
  };

  const completedCount = todos.filter((item) => item.isCompleted).length;
  const progressPercentage =
    todos.length === 0 ? 0 : Math.round((completedCount / todos.length) * 100);

  return (
    <>
      <div className="border-solid border-2 rounded-md border-[#0f0e17] my-3 mx-6 shadow-lg text-[#fffffe] p-4">
        <h2 className="pb-2 pt-4 px-2 underline text-lg">Add your task</h2>
        <div className="add-task-container">
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAdd();
            }}
            className="task-input"
          />
          <button onClick={handleAdd} className="add-btn">
            Add
          </button>
        </div>
      </div>


      <div className="my-3 mx-6 p-4">
        <h2 className="text-lg text-[#fffffe] mb-2 font-bold">Progress</h2>
        <div className="w-full bg-[#d8dcdc] h-4 rounded-[0.25rem] overflow-hidden">
          <div
            className="bg-[#253a40] h-[0.8rem] border-[1px] border-solid border-[#253a40] m-[1px] rounded-[0.25rem] transition-[width] duration-[0.3s]"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="text-sm text-[#fffffe] mt-1">
          {progressPercentage}% completed
        </p>
      </div>

      <div className="border-solid border-2 rounded-md border-[#0f0e17] my-3 mx-6 shadow-lg">
        <h2 className="text-2xl text-[#fffffe] px-2 font-bold py-2">Tasks</h2>
        <div className="flex flex-col sm:flex-wrap">
          {todos.length === 0 && <div className="px-5 py-2">You have no tasks.</div>}

          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row px-4 my-2 items-start sm:items-end text-lg w-full sm:justify-between"
                >
                  <div className="flex items-center">
                    <input
                      name={item.id}
                      className="accent-[#253a40] w-5 h-5"
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                    />
                  </div>
                  <div
                    className={
                      item.isCompleted
                        ? "line-through border-b-[1.5px] border-[#0f0e17] w-full mx-2 text-[#fffffe] mt-2 sm:mt-0"
                        : "border-b-[1.5px] border-[#0f0e17] w-full mx-2 text-[#fffffe] mt-2 sm:mt-0"
                    }
                    style={{
                      color: ongoingTask === item.id ? '#f4a261' : '#fffffe',
                      fontWeight: ongoingTask === item.id ? 'bold' : 'normal'
                    }}
                  >
                    {item.todo}
                  </div>

                  <div className="buttons my-2 flex">
                    <button
                      onClick={() => handleOngoing(item.id)}
                      className="bg-[#253a40] text-[#fffffe] border-2 rounded-lg border-[#0f0e17] shadow-md mx-2 py-1 px-4 font-bold hover:shadow-[#fffffe] hover:shadow-2xl hover:transition-shadow"
                    >
                      Ongoing
                    </button>
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="bg-[#253a40] text-[#fffffe] border-2 rounded-lg border-[#0f0e17] shadow-md mx-2 py-1 px-4 font-bold hover:shadow-[#fffffe] hover:shadow-2xl hover:transition-shadow"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-[#253a40] text-[#fffffe] border-2 rounded-lg border-[#0f0e17] shadow-md mx-2 py-1 px-4 font-bold hover:shadow-[#fffffe] hover:shadow-2xl hover:transition-shadow"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>

      <div className="my-3 mx-6 p-4 flex flex-col sm:flex-row justify-between">
        <button
          onClick={handleCompletedTasks}
          className="bg-[#253a40] text-[#fffffe] border-2 rounded-lg border-[#0f0e17] shadow-md mx-2 my-2 sm:my-0 py-1 px-4 font-bold hover:shadow-[#fffffe] hover:shadow-2xl hover:transition-shadow"
        >
          View Completed
        </button>
        <button
          onClick={handleReset}
          className="bg-[#253a40] text-[#fffffe] border-2 rounded-lg border-[#0f0e17] shadow-md mx-2 my-2 sm:my-0 py-1 px-4 font-bold hover:shadow-[#fffffe] hover:shadow-2xl hover:transition-shadow"
        >
          Reset
        </button>
      </div>
    </>
  );
};

export default AddToDo
