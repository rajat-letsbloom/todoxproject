// import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';


function App() {
  const [todo, setTodo] = useState('');
  const [allTodos, setAllTodos] = useState([])
 
  const addTodo = () => {
    if(todo !== ''){
      setAllTodos(before => {
        return [{title: todo}, ...before]
      })
      setTodo('')
    }else{
      alert('Input Cannot be Empty :)')
    }
  } 

  console.log(allTodos);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(res => res.json())
    .then(json=> setAllTodos(json))
  }, [])
  
  const checkTask = (ind, val)=>{
    console.log(ind, val);
    // console.log(allTodos)
    setAllTodos((prev)=>{
      prev[ind].completed = val === 'on'
      return prev
    })
  }

  return (

    <div className="App">
      <div>
        <h1>TO-DO LIST</h1>
        <h3>Get your to do list here...</h3>

        <input class="box" type="text" placeholder="to-do list.." id="content" value={todo} onChange={(e)=>setTodo(e.target.value)}/>

        <button onClick={addTodo}>Add To The List</button>

{/* {todo} */}
        {/* <button id="fetch-todos" onclick="getTodos()">Fetch From API</button> */}
        <div className='dashboard'>
          <div className='dashboard-items'>
            <p>Total To-Dos: {allTodos.length} </p>
          </div>
          <div className='dashboard-items'>
            <p>Completed: {allTodos.filter(tasks => tasks.completed).length} </p>
          </div>
          <div className='dashboard-items'>
          <p>Incompleted: {allTodos.filter(tasks => !tasks.completed).length} </p>
          </div>
        </div>

        <ul id="parentList">
          {allTodos?.map((item, index)=>{
            return <li key={index}>
              <input type='checkbox' onChange={(e) => checkTask(index, e.target.value)}/>{item.title}
            <span><i className='fa fa-trash-o'></i></span>
            </li>
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
