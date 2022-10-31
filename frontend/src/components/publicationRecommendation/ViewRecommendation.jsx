import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import DatePublication from '../DatePublication.jsx';
import "../css/ViewPublication.css"

const ViewDonation = (props) => {
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
            </div>
            <br />
            
            <div className='row mt-3 text-center'>
                <div className='col'>
                    <h5>Nombre del libro</h5>
                    <p>{props.name}</p>
                </div>
                <div className='col'>
                    <h5>Autor</h5>
                    <p>{props.author}</p>
                </div>
            </div>
            <div className='row mt-3 text-center'>
                <div className='col'>
                    <h5>Recomendación</h5>
                    <p>{props.recommendation}</p>
                </div>
                <div className='col'>
                    <h5>Resumen</h5>
                    <p>{props.summary}</p>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <div className='d-flex align-content-center justify-content-center'>
                        <Link data-bs-dismiss="modal" aria-label="Close" onClick={hideModal} className='text-black rounded-3 btn text-decoration-none' style={{backgroundColor: '#ffcfa2'}}> 
                            <i className="bi bi-person"></i>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='text-center mt-4'>
                <DatePublication dateCreatedAt={props.createdAt} />
            </div>
        </div>
    )
}

export default ViewDonation
