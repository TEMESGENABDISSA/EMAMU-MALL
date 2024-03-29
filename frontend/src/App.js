
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import ShopCategory from './Pages/ShopCategory';
import LoginSignup from './Pages/LoginSignup';
import Cart from './Pages/Cart';
import Shop from './Pages/Shop';
import Product from './Pages/Product';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner5.jpg'
import women_banner from './Components/Assets/baner4.jpg'
import kid_banner from './Components/Assets/banner1.2.jpg'

function App() {
  return (
    <div >
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path='/'element={<Shop/>}/>
    <Route path='/mens'element={<ShopCategory  banner={men_banner} category="men"/>}/>
    <Route path='/womens'element={<ShopCategory banner={women_banner} category="women"/>}/>
    <Route path='/kids'element={<ShopCategory banner={kid_banner} category="kid"/>}/>
    <Route path='/Product'element={<Product/>}>
    <Route path=':ProductId'element={<Product/>}/>
    </Route>
    <Route path='/cart'element={<Cart/>}/>
    <Route path='/login'element={<LoginSignup/>}/>

    </Routes>
    <Footer/>
    </BrowserRouter>
    </div>
  );
}

export default App;
