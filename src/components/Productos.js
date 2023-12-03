import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ModalApp from './modal';
import { showAlert } from '../functions';


const Productos = () => {
    const url = 'http://localhost:1000/productos';
    const [products, setProducts] = useState([]);
    const [id, setId] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [quantity_in_stock, setQuantity_in_stock] = useState('');
    const [price, setPrice] = useState('');
    const [provider, setProvider] = useState('');
    const [drink_size, setDrink_size] = useState('');
    const [presentation, setPresentation] = useState('');
    const [alcohol_percentage, setAlcohol_percentage] = useState('');
    const [operation, setOperation] = useState(1);
    const [title, setTitle] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [search, setSearch] = useState('');
    const [productsPerPage, setProductsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const totalProducts = products.length;
    const pageNumbers = [1, 2, 3, 4, 5];
    const lastIndex = currentPage * productsPerPage;
    const firstIndex = lastIndex - productsPerPage;

    const Pagination = (productsPerPage, totalProducts, currentPage, setCurrentPage) => {
        for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
            pageNumbers.push(i)
        }
    }

    const onPreviousPage = () => {
        setCurrentPage(currentPage - 1)
    }

    const onNextPage = () => {
        setCurrentPage(currentPage + 1)
    }

    const onSpecificPage = (n) => {
        setCurrentPage(n)
    }

    const openModal = (opc, id, brand, category, description, quantity_in_stock, price, provider, drink_size, presentation, alcohol_percentage) => {
        setId('');
        setBrand('');
        setCategory('');
        setDescription('');
        setQuantity_in_stock('');
        setPrice('');
        setProvider('');
        setDrink_size('');
        setPresentation('');
        setAlcohol_percentage('');
        setOperation(opc);
        if (opc === 1) {
            setTitle('Registrar nuevo producto');
        } else if (opc === 2) {
            setTitle('Editar producto');
            setId(id);
            setBrand(brand);
            setCategory(category);
            setDescription(description);
            setQuantity_in_stock(quantity_in_stock);
            setPrice(price);
            setProvider(provider);
            setDrink_size(drink_size);
            setPresentation(presentation);
            setAlcohol_percentage(alcohol_percentage);
        }

        window.setTimeout(function () {
            document.getElementById('brand').focus();
        }, 500)

    }
    


    const enviarSolicitud = async (metodo, parametros) => {
        await axios({ method:metodo, url:url, data:parametros }).then(function (respuesta) {
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
            });
    }
    
    const deleteProduct = (id, brand) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: '¿Seguro de que deseas eliminar este producto ' + brand + '?',
            icon: 'question', text: 'No se podrá deshacer la operación',
            showCancelButton: true, confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar'
        }).then((resultado) => {
            console.log("resultado")
            console.log(resultado)
            if (resultado.isConfirmed) {
                setId(id);
                enviarSolicitud('DELETE', {id:id});
            } else {
                showAlert('El producto no fue eliminado', 'info');
            }
        })
    }

    const showData = async () => {
        const response = await fetch(url)
        const dato = await response.json(url)
    }

    const searcher = (e) => {
        setSearch(e.target.value)
    }

    const resultado = !search ? products : products.filter((dato) => dato.brand.includes(search))

    const handleClick = (product) => {
        setSelectedProduct(product);
    };

    useEffect(() => {
        getProducts();
        showData();
    }, []);

    const getProducts = async () => {
        const respuesta = await axios.get(url);
        setProducts(respuesta.data);
    }

    return (
        <div className='App'>
            <nav className="navbar bg-info" data-bs-theme="white">
                <h1 className='mt-3 text-white fst-italic'>Listado de productos D KACHÉ</h1>
            </nav>
            <nav className='navbar bg-info' data-bs-theme="white">
                <form className="d-flex" role="search">
                    <input value={search} onChange={searcher} type='text' placeholder='Search' className='form-control me-3 offset-md-1' ></input>
                </form>

            </nav>
            <button onClick={() => openModal(1)} type="button" className="btn btn-success mt-2" data-bs-toggle="modal" data-bs-target="#modalProducts">
                <i className='fa-solid fa-circle-plus'></i> Añadir producto
            </button>
            <div className='container_fluid'>
                <div className='row mt-3'>
                    <div className='col-9 col-lg-3- offset-lg-0'>
                        <div className='table-responsive'>
                            <table className='table table-striped table-hover'>
                                <thead>
                                    <tr className='bg-headers'><th>#</th><th>Marca</th><th>Categoría</th><th>Cantidad en Stock</th><th>Precio $</th>
                                        <th>Porcentaje de alcohol %</th><th>Editar/Eliminar</th></tr>
                                </thead>
                                <tbody className='table-group-divider'>
                                    {resultado.map((products, i) => (
                                        <tr key={products.id} onClick={() => handleClick(products)}>
                                            <td>{(i + 1)}</td>
                                            <td>{products.brand}</td>
                                            <td>{products.category}</td>
                                            <td>{products.quantity_in_stock}</td>
                                            <td>{products.price}</td>
                                            <td>{products.alcohol_percentage}</td>
                                            <td>
                                                <button onClick={() => openModal(2, products.id, products.brand, products.category, products.description,
                                                    products.quantity_in_stock, products.price, products.provider, products.drink_size, products.presentation, products.alcohol_percentage)} type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalProducts">
                                                    <i className='fa-solid fa-edit'></i></button>
                                                    &nbsp;
                                                    <button onClick={() => deleteProduct(products.id, products.brand)} className='btn btn-danger'>
                                                        <i className='fa-solid fa-trash'></i>
                                                    </button>
                                            </td>
                                        </tr>
                                    )).slice(firstIndex, lastIndex)
                                    }
                                </tbody>
                            </table>
                            <ModalApp isEdit={1}></ModalApp>
                        </div>
                    </div>
                </div>
            </div>
            <nav >
                <ul className="pagination justify-content-center mt-2">
                    <li className="page-item">
                        <button className={`page-link ${currentPage === 1 ? 'disabled' : ''}`} onClick={onPreviousPage}>Anterior</button>
                    </li>
                    {
                        pageNumbers.map(noPage => (
                            <li key={noPage} className="page-item"><button className={`page-link ${noPage === currentPage ? 'active' : ''}`} onClick={() => onSpecificPage(noPage)} href='#'>{noPage}</button></li>
                        ))
                    }
                    <li className="page-item">
                        <button className={`page-link ${currentPage >= pageNumbers.length ? 'disabled' : ''}`} onClick={onNextPage}>Siguiente</button>
                    </li>
                </ul>
            </nav>

        </div>
    )
}

export default Productos