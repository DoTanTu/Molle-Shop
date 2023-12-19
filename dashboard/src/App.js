

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import Home from './pages/Hompage';
import NewProduct from './pages/NewProduct';
import AllProduct from './pages/AllProduct';
import EditProduct from './pages/EditProduct';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} >
          <Route path='all-products' element={<AllProduct />} />
          <Route path='new-product' element={<NewProduct />} />
          <Route path='product' element={<EditProduct />} >
            <Route path=':id' element={<EditProduct />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
