import React from 'react'
import "../css/ViewEvent.css"
import DatePublication from '../DatePublication.jsx';
import { useNavigate, Link } from 'react-router-dom';

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
            
            <div className='row '>
                
                <div className='col'>
                    <h5>Nombre</h5>
                    <p>{props.name}</p>
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

export default ViewDonation
