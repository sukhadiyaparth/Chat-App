import './App.css';
import  {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Chat from './pages/Chat';
function App() {
  return (
    <div className="App">

      <Routes>

        <Route path='/' element={<Home/>} exact   ></Route>
        <Route path='/chats' element={<Chat/>}></Route>

      </Routes>  



    </div>
  );
}

export default App;
