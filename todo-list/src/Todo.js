import { useState } from "react";
import { useEffect } from "react";
const Todointerface = () => {
    const [todoList, setTodoList] = useState('')
    const [todoArray, setTodoArray] = useState([])
    const [showPopup, setShowPopup] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    function TodoList(e) {
        setTodoList(e.target.value)
    }
    let id = 0
    function addTodoList(e){ 
        setTodoArray([
            ...todoArray,
            {id: id, text: todoList}
        ])
        setTodoList('')
        const input = document.querySelector('.input-field')
        if(input.value.trim() === ''){
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
              }, 2000); 
        }else{
            setShowPopup(false);
            setShowSuccess(true);
            setTodoList('');
            setTimeout(() => {
              setShowSuccess(false);
            }, 2000);

            
        }
    }
    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todoList));
      }, [todoList]);

      useEffect(() => {
        const savedTodoList = localStorage.getItem('todoList');
        if (savedTodoList) {
          setTodoList(JSON.parse(savedTodoList));
        }
      }, []);
    return ( 
        <div>
            <div>
            {showPopup && (
                <div style={{ background: 'red', color: 'white', padding: 10,  }}>
                  Please enter a todo item!
                </div>
              )}
              {showSuccess && (
                <div style={{ background: 'green', color: 'white', padding: 10 }}>
                  Todo added successfully!
                </div>
              )}
                <input className='input-field' type="text" value={todoList} placeholder='Add task here..' onChange={TodoList} required />
                <button onClick={addTodoList}>Add</button>
            </div>
            <div>
                {todoArray.map(todo =>(
                    <p key={todo.id}>{todo.text}</p>
                ))}
            </div>
        </div>
     );
}
 
export default Todointerface;