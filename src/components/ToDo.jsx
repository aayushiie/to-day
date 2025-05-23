import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Reorder } from 'framer-motion';

const AddToDo = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(false);

  useEffect(() => {
    const todoString = localStorage.getItem('todos');
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }
  }, []);

  const savetoLocalStorage = (updatedTodos) => {
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const handleAdd = () => {
    if (todo.trim() === '') return;
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodos);
    setTodo('');
    savetoLocalStorage(newTodos);
  };

  const handleEdit = (e, id) => {
    const t = todos.find((item) => item.id === id);
    setTodo(t.todo);
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    savetoLocalStorage(newTodos);
  };

  const handleDelete = (e, id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    savetoLocalStorage(newTodos);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex((item) => item.id === id);
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    savetoLocalStorage(newTodos);
  };

  const handleCompletedTasks = () => {
    setshowFinished(!showFinished);
  };

  const handleReset = () => {
    setTodos([]);
    savetoLocalStorage([]);
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
              if (e.key === 'Enter') handleAdd();
            }}
            className="task-input"
          />
          <button onClick={handleAdd} className="add-btn flex items-center justify-center">
            <lord-icon
              src="https://cdn.lordicon.com/gzqofmcx.json"
              trigger="hover"
              colors="primary:#ffffff"
            ></lord-icon>
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
        <p className="text-sm text-[#fffffe] mt-1">{progressPercentage}% completed</p>
      </div>

      <div className="border-solid border-2 rounded-md border-[#0f0e17] my-3 mx-6 shadow-lg">
        <h2 className="text-2xl text-[#fffffe] px-2 font-bold py-2">Tasks</h2>
        <div className="flex flex-col sm:flex-wrap">
          {todos.length === 0 && <div className="px-5 py-2 text-white">You have no tasks.</div>}

          <Reorder.Group axis="y" onReorder={setTodos} values={todos}>
            {todos
              .filter((item) => showFinished || !item.isCompleted)
              .map((item) => (
                <Reorder.Item
                  key={item.id}
                  value={item}
                  className="flex flex-col sm:flex-row px-4 my-2 items-start sm:items-end text-lg w-full sm:justify-between"
                >
                  <div className='flex items-center justify-between border w-full rounded-lg px-2 py-2 bg-white shadow-[0px 0px 0px rgba(0,0,0,0.8)] sm:flex-row'>
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
                        ? 'line-through w-full mx-2 text-black sm:mt-0 text-xl'
                        : 'w-full mx-2 text-black sm:mt-0 text-xl'
                    }
                  >
                    {item.todo}
                  </div>
                  <div className="buttons my-2 flex">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="add-btn mx-2 flex justify-center items-center todo-btn"
                    >
                      <lord-icon
                        src="https://cdn.lordicon.com/mudwpdhy.json"
                        trigger="hover"
                        colors="primary:#ffffff"
                      ></lord-icon>
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="add-btn mx-2 flex justify-center items-center todo-btn"
                    >
                      <lord-icon
                        src="https://cdn.lordicon.com/oqeixref.json"
                        trigger="hover"
                        colors="primary:#ffffff"
                      ></lord-icon>
                    </button>
                  </div>
                  </div>
                </Reorder.Item>
              ))}
          </Reorder.Group>
        </div>
      </div>

      <div className="my-3 mx-6 p-4 flex flex-col sm:flex-row justify-between">
        <button
          onClick={handleCompletedTasks}
          className="add-btn mx-2 flex justify-center items-center gap-2"
        >
          View Completed
          <lord-icon
            src="https://cdn.lordicon.com/rxgzsafd.json"
            trigger="hover"
            colors="primary:#ffffff"
          ></lord-icon>
        </button>
        <button
          onClick={handleReset}
          className="add-btn mx-2 flex justify-center items-center gap-2"
        >
          Reset
          <lord-icon
            src="https://cdn.lordicon.com/ibjcmcbv.json"
            trigger="hover"
            colors="primary:#ffffff"
          ></lord-icon>
        </button>
      </div>
    </>
  );
};

export default AddToDo;
