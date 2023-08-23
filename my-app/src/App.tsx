import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Layout from './module/Layout';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Layout />


        <Routes>
          <Route path='/' element={<>This home page</>}></Route>

          <Route path='/add' element={<>This add page</>}></Route>

          <Route path='/contact' element={<>This contact page</>}></Route>



        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
