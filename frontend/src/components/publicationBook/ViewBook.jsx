import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DatePublication from '../DatePublication.jsx';
import "../css/ViewPublication.css"

const ViewBook = (props) => {
    const navigate = useNavigate();
    const hideModal = () => {
        setTimeout(() => {
            navigate(`profile/${props.userId}`)
        }, 100);
    }
    return (
        <div className='container rounded border p-4 mr-5'>
            <div className='row'>
                <img className='rounded-4' src={props.image} />
            </div><br />

            <div className='row'>
                <div className='col'>
                    <h5 className='text-start'>Nombre del Libro</h5>
                    <p className='text-start'>{props.name}</p>
                </div>
                <div className='col'>
                    <div className='d-flex align-content-center justify-content-end'>
                        <Link data-bs-dismiss="modal" aria-label="Close" onClick={hideModal} className='text-black rounded-3 btn text-decoration-none' style={{backgroundColor: '#ffcfa2'}}> 
                            <i className="bi bi-person"></i>
                        </Link>
                    </div>
                </div>
            </div>

            <div className='row mt-3'>
                <div className='col'>
                    <h5>Precio</h5>
                    <p>{props.price}</p>
                </div>
                <div className='col'>
                    <h5>Editorial</h5>
                    <p>{props.editorial}</p>
                </div>
                <div className='col'>
                    <h5>Autor</h5>
                    <p>{props.author}</p>
                </div>
            </div>

            <div className='text-center mt-4'>
                <DatePublication dateCreatedAt={props.createdAt} />
            </div>



        </div>

    )
}

export default ViewBook
