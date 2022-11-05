import React from 'react'
import { useLoaderData } from 'react-router-dom';
import { publicRequest } from '../../requestMethods';
import EditProfile from './EditProfile';
import '../css/Profile.css';
import * as bootstrap from 'bootstrap';
import LogoQPLBlack from '../../assets/img/QPL_Logo_Black.png';
import { AnimatedPageSmoothY, AnimatedPageNavBar } from '../AnimationPage';
import profileUnknown from '../../assets/img/profileUnknown.jpg';

export async function loader({ params }) {
    return await publicRequest.get(`profile/view/${params.userId}`)
}

const Profile = ({ myProfile }) => {
    const user = useLoaderData().data.user;
    const events = useLoaderData().data.events;
    const books = useLoaderData().data.books;
    const donations = useLoaderData().data.donations;
    const swaps = useLoaderData().data.swaps;
    console.log({ user, events, books, donations, swaps });
    const handleShow = () => {
        const myModal = new bootstrap.Modal(document.getElementById('modalEditProfile'))
        myModal.show();
    };
    const hideModal = () => {
        const myModal = document.getElementById('modalEditProfile');
        const modal = bootstrap.Modal.getInstance(myModal);
        modal.hide();
    };
    const currentDate = new Date();
    return (
        <div>
            <AnimatedPageSmoothY>
                <div className='row mb-5'>
                    <div className='col-3 d-flex justify-content-center align-items-center mt-4 ms-5' style={{ backgroundColor: '#ffcfa2', borderRadius: '15px' }}>
                        <div id='userProfilePhotoView' style={user.photo ? {backgroundImage: "url(" + user.photo +")"} : {backgroundImage: "url(" + profileUnknown +")"}}/>
                    </div>
                    <div className=' col mt-4 me-5 ms-2 rounded-4 text-center' style={{ backgroundColor: '#ffcfa2' }}>
                        <div className='m-5 p-4 d-flex flex-column align-content-center justify-content-center'>
                            <p className='lead fs-2'>{user.name} {user.lastName}</p>
                            <p className='lead fs-6 text-muted'>Usuario desde el {currentDate.getDate()}/{currentDate.getMonth()}/{currentDate.getFullYear()}</p>
                            <span>
                                {myProfile && <button className='btn' id='btnEditProfile' onClick={handleShow}>Editar</button>}
                            </span>
                        </div>
                    </div>
                </div>
                

                <div className='mx-5 d-flex flex-row fs-6'>
                    <div className='col text-center'>
                        <h6 className='text-muted'>Correo Electrónico</h6>
                        <span className='fw-lighter'>{user.email}</span>
                    </div>
                    <div className="vr"></div>

                    <div className='col text-center'>
                        <h6 className='text-muted'>Teléfono</h6>
                        <span className='fw-lighter'>{user.phone}</span>
                    </div>
                </div>
            </AnimatedPageSmoothY>

            <AnimatedPageNavBar>
                <div className='container-fluid d-flex justify-content-evenly align-content-center mt-3 mb-2'>
                    <div className='row mt-5 pt-3'>
                        <div className='col mx-5 text-center p-4 px-5 rounded-4' style={{ backgroundColor: '#ffcfa2' }}>
                            <h4>{books.length}</h4>
                            <i className="bi bi-currency-dollar p-2 "></i>
                        </div>
                        <div className='col mx-5 text-center p-4 px-5 rounded-4' style={{ backgroundColor: '#ffcfa2' }}>
                            <h4>{swaps.length}</h4>
                            <i className="bi bi-repeat p-2"></i>
                        </div>
                        <div className='col mx-5 text-center p-4 px-5 rounded-4' style={{ backgroundColor: '#ffcfa2' }}>
                            <h4>{donations.length}</h4>
                            <i className="bi bi-bag-heart p-2"></i>
                        </div>
                    </div>
                </div>
            </AnimatedPageNavBar>




            <div className='row'>
                <div className='col mt-5 pt-3'>
                    <div>
                        <p className='fs-6 text-center'>Publicaciones en <b>Compra</b> de Libros</p>
                    </div>
                    <div className='d-flex justify-content-center align-content-center'>
                        <div className='wrapper'>
                            {books.map((book, i) => (
                                <div className='item'>
                                    <img src={book.image} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className='mt-5 mx-5 text-center pt-3'>
                        <div>
                            <p className='fs-6'>Publicaciones en <b>Cambio</b> de Libros</p>
                        </div>
                        <div className='d-flex justify-content-center align-content-center'>
                            <div className='wrapper'>
                                {swaps.map((book, i) => (
                                    <div className='item'>
                                        <img src={book.image} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className='my-5 mx-5 text-center pt-3 '>
                <div>
                    <p className='fs-6'>Publicaciones en <b>Donación</b> de Libros</p>
                </div>
                <div className='d-flex justify-content-center align-content-center'>
                    <div className='wrapper'>
                        {donations.map((book, i) => (
                            <div className='item'>
                                <img src={book.image} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="modal fade" id="modalEditProfile" tabIndex={-1} aria-labelledby="modalEditProfileLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold" id="modalEditProfileLabel">Editar perfil</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <EditProfile closeModal={hideModal} />
                        </div>
                        <div className='modal-footer'>
                            <span><img src={LogoQPLBlack} id='qplLogoNavBar' className='' /></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default Profile
