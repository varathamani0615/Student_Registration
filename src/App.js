
import './App.css';
import Emptable from './Component/Emptable';
import Create from './Component/Create';
import Edit from './Component/Edit';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
function App() {
  return (
   <>
   <BrowserRouter>
   <Routes>
   <Route path='/'  element={<Emptable/>} />
   <Route path='/create'  element={<Create/>} />
   <Route path='/edit/:id'  element={<Edit/>} />
   </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
