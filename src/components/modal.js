import React, { useEffect, useState } from "react";
import Productos, { } from "./Productos";
import { showAlert } from '../functions';
import axios from "axios";


export default function ModalApp({ isEdit, isAdd }) {

    let [products, setProducts] = useState([]);
    let [id, setId] = useState('');
    let [brand, setBrand] = useState('');
    let [category, setCategory] = useState('');
    let [description, setDescription] = useState('');
    let [quantity_in_stock, setQuantity_in_stock] = useState('');
    let [price, setPrice] = useState('');
    let [provider, setProvider] = useState('');
    let [drink_size, setDrink_size] = useState('');
    let [presentation, setPresentation] = useState('');
    let [alcohol_percentage, setAlcohol_percentage] = useState('');
    let [operation, setOperation] = useState(1);
    let [title, setTitle] = useState('');
    const url = 'http://localhost:1000/productos';

    const validar = () => {
        let parametros;
        let metodo;

        if (brand.trim() === '') {
            showAlert('Escribe la marca del producto', 'warning');
        } else if (category.trim() === '') {
            showAlert('Escribe la categoria del producto', 'warning');
        } else if (description.trim() === '') {
            showAlert('Escribe la descripcion del producto', 'warning');
        } else if (quantity_in_stock === '') {
            showAlert('Escribe la cantidad en stock del producto', 'warning');
        } else if (price === '') {
            showAlert('Escribe el precio del producto', 'warning');
        } else if (provider.trim() === '') {
            showAlert('Escribe el proveedor del producto', 'warning');
        } else if (drink_size === '') {
            showAlert('Escribe el tamaño del producto', 'warning');
        } else if (presentation.trim() === '') {
            showAlert('Escribe la presentación del producto', 'warning');
        } else if (alcohol_percentage === '') {
            showAlert('Escribe el procentaje de alcohol del producto', 'warning');
        } else {
            if (operation === 1) {
                parametros = {brand:brand.trim(), category:category.trim(), description:description.trim(), quantity_in_stock, price,
                    provider:provider.trim(), drink_size, presentation:presentation.trim(), alcohol_percentage};

                metodo = 'POST';
            } else {
                parametros = {id:id, brand:brand.trim(), category:category.trim(), description:description.trim(), quantity_in_stock, price,
                    provider:provider.trim(), drink_size, presentation:presentation.trim(), alcohol_percentage};

                metodo = 'PUT';
            }

            enviarSolicitud(metodo, parametros);
        }
    }

    const enviarSolicitud = async (metodo, parametros) => {
        await axios({ method: metodo, url: url, data: parametros }).then(function (respuesta) {
            console.log("respuesta")
            console.log(respuesta)
            let tipo = respuesta.data[0];
            let msj = respuesta.data[1];

            showAlert(msj, tipo);
            if (tipo === 'success') {
                document.getElementById('btnCerrar').click();
                getProducts();
            }
        })
            .catch(function (error) {
                showAlert('Error en la solicitud', 'error');
                console.log(error);
            });
    }

    const getProducts = async () => {
        const respuesta = await axios.get(url);
        setProducts(respuesta.data);
    }

    return (
        <>
            
            <div className="modal fade" id="modalProducts" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="h5" >{title}</label>
                        </div>
                        <div className="modal-body">
                            <input type='hidden' id='id'></input>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-wine-bottle'></i></span>
                                <input type='text' id='brand' className='form-control' placeholder='Marca' value={brand} onChange={(e) => setBrand(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-list'></i></span>
                                <input type='text' id='category' className='form-control' placeholder='Categoria' value={category} onChange={(e) => setCategory(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                                <input type='textArea' id='description' className='form-control' placeholder='Descripción' value={description} onChange={(e) => setDescription(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-cart-shopping'></i></span>
                                <input type='number' id='quantity_in_stock' className='form-control' placeholder='Cantidad en Stock' value={quantity_in_stock} onChange={(e) => setQuantity_in_stock(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-dollar-sign'></i></span>
                                <input type='number' id='price' className='form-control' placeholder='Precio' value={price} onChange={(e) => setPrice(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-truck'></i></span>
                                <input type='text' id='provider' className='form-control' placeholder='Proveedor' value={provider} onChange={(e) => setProvider(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-martini-glass-empty'></i></span>
                                <input type='text' id='drink_size' className='form-control' placeholder='Tamaño de la bebida' value={drink_size} onChange={(e) => setDrink_size(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-wine-glass'></i></span>
                                <input type='text' id='presentation' className='form-control' placeholder='Presentación' value={presentation} onChange={(e) => setPresentation(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-percent'></i></span>
                                <input type='text' id='alcohol_percentage' className='form-control' placeholder='Porcentaje de alcohol %' value={alcohol_percentage} onChange={(e) => setAlcohol_percentage(e.target.value)}></input>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <div className='d-grid col-6 us-auto'>
                                <button onClick={() => validar()} className='btn btn-success'>{isAdd ? 'Registrar' : ''}
                                    <i className='fa-solid fa-floppy-disk'></i> Guardar
                                </button>
                            </div>
                            <input class="btn btn-info" type="reset" value="Reset"></input>
                            <button type="button" id="btnCerrar" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
