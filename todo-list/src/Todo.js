import { useState } from "react";
import { useEffect } from "react";
const Todointerface = () => {
  const [todoList, setTodoList] = useState('')
  const [todoArray, setTodoArray] = useState([])
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    const savedTodo = localStorage.getItem('todoList');
  
    if (savedTodo) {
      setTodoArray(JSON.parse(savedTodo));
    }
  }, []);

  useEffect(() => {
    try{
      const savedTodo = JSON.parse(localStorage.getItem('todoList'))
      setTodoArray(savedTodo);
    } 
    catch(err){
      console.log(err);
    }
  }, []);

  function TodoList(e) {
    setTodoList(e.target.value)
  }

  function deleteTodoList(id){
    const newTodoArray = todoArray.filter((todo) => todo.id !== id);
    setTodoArray(newTodoArray.map((todo, index) => ({ ...todo, count: index + 1 })));
  }

  function editTodoList(id){
    const selectedItem = todoArray.find((item) => item.id === id);
    setTodoList(selectedItem.text);
    const filteredArray = todoArray.filter((item) => item.id !== id).map((todo, index) => ({ ...todo, count: index + 1 }));
    setTodoArray(filteredArray);
  }



  function addTodoList(e){ 
    if (todoList.trim() === '') {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
      return;
    }

    setTodoArray([
      ...todoArray,
      {id: id, text: todoList, count: todoArray.length + 1},
    ]);
    setId(id + 1);
    setTodoList('');
    setShowPopup(false);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);      
  }

  return (
    <div>
      <div>
        <input 
          className='input-field bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500  w-9/12 p-2.5' 
          type="text" 
          value={todoList} 
          placeholder='Add task here..' 
          onChange={TodoList} 
        />
        <button 
          className="text-white bg-blue-700 hover:bg-blue-800  focus:outline-none  font-medium  text-sm  sm:w-auto px-5 py-2.5 text-center" 
          onClick={addTodoList}
        >
          Add
        </button>

        {showPopup && (
          <div className="bg-red-500 text-white  p-4 w-11/12 ml-3">
            Please enter a task item!
          </div>
        )}
        {showSuccess && (
          <div className="bg-green-500 text-white  p-4 w-11/12 ml-2">
            Task added successfully!
          </div>
        )}
      </div>
      <div className="p-5">
        {todoArray.map(todo =>(
          <p className="text-left text-lg text-gray-500 font-medium py-2" key={todo.id}>
            {todo.count}:{' '}{todo.text}
             <button className=" bg-red-700 text-white p-2  text-sm  rounded-md mx-2" onClick={() => deleteTodoList(todo.id)}>Delete</button>
             <button className="bg-green-700 text-white p-2  text-sm rounded-md mx-2" onClick={() => editTodoList(todo.id)}>Edit</button> 
          </p>
        ))}
      </div>
    </div> 
  );
}

export default Todointerface;