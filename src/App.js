import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Body from './components/body';
import DevInfo from './components/devInfo';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Body/>} />
        <Route exact path='/devInfo/:id' element={<DevInfo/>}/>
      </Routes>
    </Router>
  );
}

export default App;
