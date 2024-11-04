import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

export default function Home() {
    return (
        <div className="home-container">
            <h1 className="home-title">¡Bienvenido a nuestra tienda!</h1>
            <p className="home-description">¿Deseas ver nuestros productos?</p>
            <Link to="/productos" className="home-link">Ver Productos</Link>
        </div>
    );
}