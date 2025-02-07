import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import Slidebar from './components/SideBar/Slidebar';
import Header from './components/Header/Header';

function App() {

  return (

    <BrowserRouter>
      <Header/>
      <div className='main d-flex'>
        <div className='slidebarWrapper'>
          <Slidebar></Slidebar>
        </div>
        <div className='content'></div>
        <Routes>
        <Route path={'/'}  element={<Dashboard/>}></Route>
        <Route path={'/dashboard'}  element={<Dashboard/>}></Route>
      </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App
