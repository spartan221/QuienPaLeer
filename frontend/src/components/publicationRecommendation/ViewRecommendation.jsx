import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import DatePublication from '../DatePublication.jsx';
import "../css/ViewPublication.css"
import { useState } from 'react'
import { publicRequest } from '../../requestMethods.js';
import Swal from 'sweetalert2'

const ViewDonation = (props) => {
    const [comment, setComment] = useState('')
    const navigate = useNavigate();
    const hideModal = () => {
        setTimeout(() => {
            navigate(`profile/${props.userId}`)
        }, 100);
    }
    function handleChange(event) {
        setComment(event.target.value)
    }

    const handleClick = (event) => {
        event.preventDefault()
        const newComment = { recommendationId: props._id, comment: comment }
        //console.log(newComment);
        publicRequest.put("/recommendation/comment", newComment, { withCredentials: true });
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'Comentario agregado.'
        })
        document.getElementById('eventForm').reset()
        reloadPage();
        console.log('Comentario agregado.')
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
                        <Link data-bs-dismiss="modal" aria-label="Close" onClick={hideModal} className='text-black rounded-3 btn text-decoration-none' style={{backgroundColor: '#1C51C7'}}> 
                            <i className="bi bi-person text-white"></i>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='text-center mt-4'>
                <DatePublication dateCreatedAt={props.createdAt} />
            </div>
            <div className="mt-4">Comentarios</div>
            <div className='row'>
                {props.comments && props.comments.map((comment, i) => (
                    <div className='container border mt-3 p-2 ms-2 me-3 rounded' style={{ background: "#F5F5F5" }}>
                        <h6>{comment.nameUser}</h6>
                        <p className='mb-0'>{comment.comment}</p>
                    </div>
                ))}
            </div>
            <form className="text-start mt-3 row" id="commentForm">
                <label htmlFor="comment" className="comment-label"></label><br />
                <input className="form-control col px-4" name="comment" id="comment" type="text" onChange={handleChange} placeholder="Escribe un comentario..."></input>
                <div className="text-center col">
                    <button className="btn btn-dark px-2 text-black" id='btnCreateComment' type="submit" onClick={handleClick} style={{ backgroundColor: '#ffcfa2' }}>Agregar comentario</button>
                </div>
            </form>
        </div>
    )
}

export default ViewDonation
