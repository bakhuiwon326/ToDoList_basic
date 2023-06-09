import './App.css';
import Header from '../src/component/Header';
import Footer from '../src/component/Footer';
import Todo from '../src/component/Todo';
import { useEffect, useState } from 'react';
import AddTodo from './component/AddTodo';
import { call } from "./service/ApiService";

var idSequence = 0;

function App(){

  const [itemList, setItemList] = useState({items:[]});

  useEffect(() => {
    call("/todo", "GET", null).then((res) => setItemList({items: res.data}));  
  }, []);
  
  useEffect(() => {
    console.log(`화면에 출력되는 itemList가 변경되었습니다.`);
    console.log(itemList);
  }, [itemList]);

  const addTodoFunction = (newItem) => {
    call("/todo", "POST", newItem).then((res) => setItemList({items: res.data}));  
  };

  const deleteTodoFunction = (deleteItem) =>{
    call("/todo", "DELETE", deleteItem).then((res) => setItemList({items: res.data}));  
  }

  const modifyTodoFunction = (modifyItem) =>{
    call("/todo", "PUT", modifyItem).then((res) => setItemList({items: res.data}));  
  }

  return (
    <div>
      <Header/>
        <AddTodo addItem={addTodoFunction}/>
        {
          itemList.items.map((itm) => (
            <Todo item={itm} deleteItem={deleteTodoFunction} modifyItem={modifyTodoFunction}/>
          ))
        }
      <Footer/>
    </div>
  );
}

export default App;
