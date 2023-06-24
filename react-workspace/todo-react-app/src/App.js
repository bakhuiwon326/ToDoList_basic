import './App.css';
import { Routes, Route, NavLink } from 'react-router-dom';
import Main from './page/Main';
import Login from './page/Login';
import SignUp from './page/SignUp';

var idSequence = 0;

function App(){
    return (
      <div className="App">
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/SignUp' element={<SignUp/>}/>
      </Routes>
    </div>
  );
}

export default App;
