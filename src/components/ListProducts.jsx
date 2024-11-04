import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase/appConfig';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/ListProducts.css';

export default function ListProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "products"),
            (snapshot) => {
                const array_products = snapshot.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id };
                });
                setProducts(array_products);
            }
        );
        return () => unsubscribe(); 
    }, []);

    const deleteProduct = (id) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "No se podrá revertir",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, bórralo!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteDoc(doc(db, "products", id));
                Swal.fire({
                    title: "Borrado",
                    text: "Tu producto se ha borrado",
                    icon: "success"
                });
            }
        });
    };

    return (
        <div className="product-list-container">
            <h2>Lista de Productos</h2>
            <div className="product-grid">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} className="product-card">
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-description">{product.description}</p>
                            <div className="product-actions">
                                <Link to={`/editar/${product.id}`} className="edit-button">Editar</Link>
                                <button onClick={() => deleteProduct(product.id)} className="delete-button">Eliminar</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay productos por el momento</p>
                )}
            </div>
        </div>
    );
}