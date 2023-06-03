import logo from './logo.svg';
import './App.css';
import Header from '../src/component/Header';
import Footer from '../src/component/Footer';
import Todo from '../src/component/Todo';

function App() {
  return (
    <div>
      <Header/>
        <Todo/>
      <Footer/>
    </div>    
  );
}

export default App;
