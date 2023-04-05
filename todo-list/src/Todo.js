import { useState } from "react";
const Todointerface = () => {
    const [todoList, setTodoList] = useState('Add task here...')
    const [todoArray, setTodoArray] = useState([])

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
    }

    return ( 
        <div>
            <div>
                <input type="text" value={todoList} onChange={TodoList} required />
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