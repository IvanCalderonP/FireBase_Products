import '../styles/Menu.css';
import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import ListProducts from '../components/ListProducts';
import RegisterProduct from '../components/RegisterProduct';
import EditForm from '../components/EditForm';
import Login from '../components/Login';
import { ProtectedRoute } from '../components/AuthComponents';

// Componente de navegación estilizado
function Navigation() {
    return (
        <nav className="navigation">
            <ul className="nav-list">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/productos" className="nav-link">Productos</Link>
                </li>
                <li className="nav-item">
                    <Link to="/registro" className="nav-link">Registro</Link>
                </li>
            </ul>
        </nav>
    );
}

export default function Menu() {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                {/* Ruta pública de login */}
                <Route path="/login" element={<Login />} />
                
                {/* Rutas protegidas */}
                <Route 
                    path="/" 
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                
                <Route 
                    path="/productos" 
                    element={
                        <ProtectedRoute>
                            <ListProducts />
                        </ProtectedRoute>
                    }
                />
                
                <Route 
                    path="/registro" 
                    element={
                        <ProtectedRoute>
                            <RegisterProduct />
                        </ProtectedRoute>
                    }
                />
                
                <Route 
                    path="/editar/:id" 
                    element={
                        <ProtectedRoute>
                            <EditForm />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}