import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import DatePublication from '../DatePublication';
import "../css/ViewPublication.css"

const ViewSwap = (props) => {
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
                    <p className='text-start'>{props.title}</p>
                </div>
                <div className='col'>
                    <div className='d-flex align-content-center justify-content-end'>
                        <Link data-bs-dismiss="modal" aria-label="Close" onClick={hideModal} className='text-black rounded-3 btn text-decoration-none' style={{backgroundColor: '#1C51C7'}}> 
                            <i className="bi bi-person text-white"></i>
                        </Link>
                    </div>
                </div>
            </div>

            <div className='row mt-3'>

                <div className='col'>
                    <h5>Descripción</h5>
                    <p>{props.description}</p>
                </div>
                <div className='col'>
                    <h5>Intereses</h5>
                    <p>{props.interest}</p>
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

export default ViewSwap
