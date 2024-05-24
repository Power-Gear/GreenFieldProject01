import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home.jsx";
import About from "./Components/About.jsx";
import Login from "./Components/Login.jsx";
import Categories from './Components/Categories.jsx'
import Cart from "./Components/Cart.jsx";
import ProductDetails from "./Components/ProductDetails.jsx";
import AdminLayout from './Components/Admin/AdminLayout.jsx';
import ProductsPage from './Components/Admin/ProductsPage.jsx';
import UsersPage from './Components/Admin/UsersPage.jsx';
import SignUp from "./Components/SignUp.jsx";
import OrderPlaced from "./Components/OrderPlaced.jsx";
import Profile from "./Components/Profile.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="SignUp" element={<SignUp />} />
          <Route path="Categories" element={<Categories/>}/>
          <Route path="Cart" element={<Cart/>}/>
          <Route path="product/:productId" element={<ProductDetails />} />
          <Route path="admin" element={<AdminLayout />}/>
          <Route path="admin/products" element={<ProductsPage />} />
          <Route path="admin/users" element={<UsersPage />} />
          {/* <Route path="admin/orders" element={<OrdersPage />} /> */}
          <Route path="OrderPlaced" element={<OrderPlaced />} />
          <Route path="Profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
