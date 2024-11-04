import '../styles/RegisterProduct.css'; // Asegúrate de tener este archivo para los estilos
import { addDoc, collection } from 'firebase/firestore';
import React from 'react';
import { useForm } from 'react-hook-form';
import { db } from '../firebase/appConfig';
import { useNavigate } from 'react-router-dom';

export default function RegisterProduct() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    // Método para guardar un producto
    const saveProduct = async (data) => {
        try {
            await addDoc(collection(db, "products"), {
                name: data.name,
                description: data.description
            });
            alert("Producto guardado exitosamente");
            // Redirigir a la lista de productos
            navigate("/productos");
        } catch (error) {
            console.error("Error al registrar el producto:", error);
            alert("Hubo un error al guardar el producto. Intenta de nuevo.");
        }
    };

    return (
        <div className="register-product-container">
            <h2 className="register-title">Registro de Productos</h2>
            <form onSubmit={handleSubmit(saveProduct)} className="register-form">
                <div className="form-group">
                    <label htmlFor="name">Ingresar Producto</label>
                    <input 
                        type="text" 
                        {...register('name', { required: 'El nombre es requerido' })} 
                        className={`form-input ${errors.name ? 'input-error' : ''}`}
                    />
                    {errors.name && <p className="error-message">{errors.name.message}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Descripción</label>
                    <input 
                        type="text" 
                        {...register('description', { required: 'La descripción es requerida' })} 
                        className={`form-input ${errors.description ? 'input-error' : ''}`}
                    />
                    {errors.description && <p className="error-message">{errors.description.message}</p>}
                </div>

                <div>
                    <button type="submit" className="submit-button">Guardar Producto</button>
                </div>
            </form>
        </div>
    );
}