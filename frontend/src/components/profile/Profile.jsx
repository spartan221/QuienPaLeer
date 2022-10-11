import React from 'react'
import { useLoaderData } from 'react-router-dom';
import { publicRequest } from '../../requestMethods';
import EditProfile from './EditProfile';
import '../css/Profile.css';
import * as bootstrap from 'bootstrap';
import AnimatedPage from '../AnimationPage';
import LogoQPLBlack from '../../assets/img/QPL_Logo_Black.png';
import AnimatedPageSmoothY from '../AnimationPage';

export async function loader({ params }) {
    return await publicRequest.get(`profile/view/${params.userId}`)
}

const Profile = ({ myProfile }) => {
    const user = useLoaderData().data.user;
    const events = useLoaderData().data.events;
    const books = useLoaderData().data.books;
    console.log({ user, events, books });
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
                    <div className='mt-4 mx-5 rounded-4 text-center' style={{backgroundColor: '#ffb875'}}>
                        <div className='m-5 p-4 d-flex flex-column align-content-center justify-content-center'>
                            <p className='lead fs-2'>{user.name} {user.lastName}</p>
                            <p className='lead fs-6 text-muted'>Usuario desde el {currentDate.getDate()}/{currentDate.getMonth()}/{currentDate.getFullYear()}</p>
                            <span>
                                {myProfile && <button className='btn' id='btnEditProfile' onClick={handleShow}>Editar</button>}
                            </span>
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

                <div className='mt-5 mx-5'>
                    <div>
                        <p className='fs-6'>Publicaciones en <b>Compra</b> de Libros</p>
                    </div>
                    <div className=''>
                    </div>
                </div>

                <div className='mt-5 mx-5'>
                    <div>
                        <p className='fs-6'>Publicaciones en <b>Cambio</b> de Libros</p>
                    </div>
                    <div className=''>
                    </div>
                </div>

                <div className='mt-5 mx-5'>
                    <div>
                        <p className='fs-6'>Publicaciones en <b>Donación</b> de Libros</p>
                    </div>
                    <div className=''>
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
