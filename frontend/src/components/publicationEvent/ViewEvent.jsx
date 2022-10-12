import React from 'react'
import "../css/ViewEvent.css"
import { Link, Navigate, useNavigate } from 'react-router-dom'
import * as bootstrap from 'bootstrap'
import EditProfile from '../profile/EditProfile'
import DatePublication from '../DatePublication.jsx';

const ViewEvent = (props) => {
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
                    <h5 className='text-start'>Descripción</h5>
                    <p className='text-start'>{props.description}</p>
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
                    <h5>Fecha</h5>
                    <p>{props.startDate} - {props.endDate}</p>
                </div>
                <div className='col'>
                    <h5>Hora</h5>
                    <p>{props.hour}</p>
                </div>
                <div className='col'>
                    <h5>Lugar</h5>
                    <p>{props.place}</p>
                </div>
            </div>
            <div className='text-center mt-4'>
                <DatePublication dateCreatedAt={props.createdAt} />
            </div>
        </div>
    )
}
// to={`profile/${props.userId}`}
export default ViewEvent
