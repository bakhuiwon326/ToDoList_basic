import './App.css';
import Header from '../src/component/Header';
import Footer from '../src/component/Footer';
import Todo from '../src/component/Todo';
import { useEffect, useState } from 'react';
import AddTodo from './component/AddTodo';

var idSequence = 0;

function App(){
  const exItems = [
    {
      id: 0,
      done: false,
      title: "0번째 todo 입니다."
    },
    {
      id: 1,
      done: false,
      title: "1번째 todo 입니다."
    },
    {
      id: 2,
      done: true,
      title: "2번째 todo 입니다."
    },
    {
      id: 3, 
      done: false,
      title: "3번째 todo 입니다."
    }
  ]

  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    }
    
    fetch("http://localhost:8080/todo", requestOptions)
    .then((response) => response.json())
    .then((response) => {
      setItemList(response.data);
    }, (error) => {
      console.log(`에러발생: ${error}`);
    })
  }, []);
  
  useEffect(() => {
    
    console.log(`화면에 출력되는 itemList가 변경되었습니다.`);
    console.log(itemList);
  }, [itemList]);

  const addTodoFunction = (newItem) => {
    newItem.id = "ID-" + idSequence;
    idSequence++;
    newItem.done = false;
    setItemList([...itemList, newItem])
  };

  const deleteTodoFunction = (deleteItem) =>{
    var newItemList = [];
    itemList.map((itm) => {
      if(itm.id !== deleteItem.id) newItemList.push(itm);
    })
    setItemList(newItemList);
  }

  const modifyTodoFunction = (modifyItem) =>{
    var newItemList = [];
    itemList.map((itm) => {
      if(itm.id === modifyItem.id) newItemList.push(modifyItem)
      else newItemList.push(itm);
    })
    setItemList(newItemList);
  }

  return (
    <div>
      <Header/>
        <AddTodo addItem={addTodoFunction}/>
        {
          itemList.map((itm) => (
            <Todo item={itm} deleteItem={deleteTodoFunction} modifyItem={modifyTodoFunction}/>
          ))
        }
      <Footer/>
    </div>
  );
}

export default App;
