
import React, { useState, useEffect } from 'react'
import "../css/ViewEvent.css"
import { Link, useNavigate } from 'react-router-dom'
import DatePublication from '../DatePublication.jsx';
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
            <h5 className='text-start'>Nombre del Libro</h5>
            <p className='text-start'>{props.name}</p>
            <div className='row'>
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
            <DatePublication dateCreatedAt={props.createdAt}/>
            <Link data-bs-dismiss="modal" aria-label="Close" onClick={hideModal}>
                Usuario
            </Link>
        </div>
    )
}

export default ViewBook
