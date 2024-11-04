import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/appConfig';
import { useForm } from 'react-hook-form';
import '../styles/EditForm.css'; // Asegúrate de tener este archivo para los estilos

export default function EditForm() {
    const { register, handleSubmit, setValue } = useForm();
    const { id } = useParams();
    const navigate = useNavigate();

    // Montando el producto seleccionado
    useEffect(() => {
        const getProductById = async () => {
            const productDoc = await getDoc(doc(db, "products", id));

            // Validamos si el documento existe
            if (productDoc.exists()) {
                const productData = productDoc.data();
                // Mandar la información del producto al formulario
                setValue('name', productData.name);
                setValue('description', productData.description);
            } else {
                console.log("No existe el producto");
            }
        };

        getProductById();
    }, [id, setValue]);

    const editProduct = async (data) => {
        try {
            // Actualizamos el producto
            await updateDoc(doc(db, "products", id), {
                name: data.name,
                description: data.description
            });
            // Redireccionamos a la lista de productos
            navigate("/productos");
        } catch (error) {
            console.error('Error al actualizar el producto', error);
        }
    };

    return (
        <div className="edit-product-container">
            <h2 className="edit-title">Editar Producto</h2>
            <form onSubmit={handleSubmit(editProduct)} className="edit-form">
                <div className="form-group">
                    <label htmlFor="name">Ingresar Producto</label>
                    <input type="text" {...register('name')} className="form-input" />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Descripción</label>
                    <input type="text" {...register('description')} className="form-input" />
                </div>

                <div>
                    <button type='submit' className="submit-button">Guardar Producto</button>
                </div>
            </form>
        </div>
    );
}