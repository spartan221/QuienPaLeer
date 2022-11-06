import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DatePublication from '../DatePublication.jsx';
import Rating from '@mui/material/Rating';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import "../css/ViewPublication.css"


const ViewBook = (props) => {
    const ApiHeroku = import.meta.env.VITE_API
    const navigate = useNavigate();
    const hideModal = () => {
        setTimeout(() => {
            navigate(`profile/${props.userId}`)
        }, 100);
    }
    const [value, setValue] = useState(0);
    const [hover, setHover] = useState();
    const [loading, setLoading] = useState(false);
    const [calification, setCalification] = useState([null]);
    const [book, setBook] = useState();

    const putRating = async (e) => {
        //console.log(e)
        setLoading(true);
        const res = await axios.put(ApiHeroku + "api/book/val", e, { withCredentials: true })
        console.log(res.data)
        setCalification(res.data.totalRatings)
        setLoading(false);

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
                        <Link data-bs-dismiss="modal" aria-label="Close" onClick={hideModal} className='text-black rounded-3 btn text-decoration-none' style={{ backgroundColor: '#ffcfa2' }}>
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

            <div className='row  justify-content-md-center'>
                <div className='col-3 px-0 mx-1' data-toggle="tooltip" data-placement="top" title={props.ratings}>
                    <Rating value={props.ratings ?? " "} precision={0.1} readOnly />
                </div>
                <div className='col-auto px-2 '>
                    {props.ratings}
                </div>
                <div className='col-auto pt-2 px-1'>
                    <p>({props.totalRatings} Valoraciones)</p>
                </div>
                <div className='col-auto'>
                    <div class="btn-group dropend">
                        <button type="button" class="btn btn-sm btn-secondary dropdown-toggle btnValorar" data-bs-toggle="dropdown" aria-expanded="false">
                            Valorar
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end py-0 pt-1 px-2">
                            <Rating
                                name="hover-feedback"
                                value={props.ratingUser ? props.ratingUser : value}
                                precision={1}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                    console.log(newValue)
                                    console.log(props._id)
                                    const rating = {
                                        _id: props._id,
                                        ratings: {
                                            rating: newValue
                                        }
                                    }
                                    putRating(rating)
                                }}
                                onChangeActive={(event, newHover) => {
                                    setHover(newHover);
                                }}
                            />
                            {props.ratingUser ? (<p className='py-0 my-0 mb-1'>Mi calificación: {props.ratingUser}</p>) : (<></>)}
                        </ul>
                    </div>
                </div>
            </div>

            <div className='text-center mt-4'>
                <DatePublication dateCreatedAt={props.createdAt} />
            </div>

        </div>

    )
}

export default ViewBook
