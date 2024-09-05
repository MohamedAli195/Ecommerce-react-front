import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import RootLayOut from "../pages/RootLayOut";
import Home from "../pages/Home";
import About from "../pages/About";
import Products from "../pages/Products";
import Product from "../pages/Product";
import Login from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import CookieService from "../classes/CookieService";
import DashboardLayOut from "../pages/dashboard/DashboardLayout";
import DashboardIndex from "../pages/dashboard/DashboardIndex";
import ProductsDashboard from "../pages/dashboard/ProductsDashboard";
const token =CookieService.get("jwt")
const router = createBrowserRouter(createRoutesFromElements(
    <>
<Route path="/" element={ <ProtectedRoute isAllowd={token} redierct="/login" ><RootLayOut/></ProtectedRoute> }>
        <Route index element={<Home />}  />
        <Route path="about" element={<About />}  />
        <Route path="Projects" element={<div>Projects</div>}  />
        <Route path="Team" element={<div>Team</div>}  />
        <Route path="products" element={<Products />}  />
        <Route path="product/:id" element={<Product />}  />
    </Route>
        <Route path="login" element={<ProtectedRoute isAllowd={!token} redierct="/" ><Login /></ProtectedRoute>}  />


    <Route path="/dashboard" element={ <ProtectedRoute isAllowd={token} redierct="/login" ><DashboardLayOut/></ProtectedRoute> }>
        <Route index element={<DashboardIndex />}  />
        
        <Route path="product" element={<ProductsDashboard />}  />
        <Route path="Projects" element={<div>Projects</div>}  />
        <Route path="categories" element={<div>categories</div>}  />
        <Route path="users" element={<div>users</div>}  />
        <Route path="statistics" element={<div>statistics</div>}  />
        
    </Route>
    </>
    
    

))

export default router