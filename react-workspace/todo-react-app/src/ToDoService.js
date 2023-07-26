import { Routes, Route, NavLink } from 'react-router-dom';
import Main from './page/Main';
import Login from './page/Login';
import SignUp from './page/SignUp';

function ToDoService({login, sestLogin}){
    return (
        <Routes>
            <Route path='/' element={<Main />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/SignUp' element={<SignUp />}/>
            <Route path='/logout' element={<SignUp />}/>
        </Routes>
  );
}

export default ToDoService;