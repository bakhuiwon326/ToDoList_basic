import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Footer from './component/Footer';
import Header from './component/Header';
import ToDoService from './ToDoService';
import React, { useState } from 'react';

var idSequence = 0;

function App(){
  const [isLogin, SetIsLogin] = useState(false);

    return (
      <div className="App">
        <BrowserRouter>
          <Header login={isLogin} setLogin={SetIsLogin}/>
          <ToDoService login={isLogin} setLogin={SetIsLogin}/>
          <Footer login={isLogin} setLogin={SetIsLogin}/>
        </BrowserRouter>
    </div>
  );
}

export default App;
