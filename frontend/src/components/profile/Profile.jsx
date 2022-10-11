import React from 'react'
import { useLoaderData } from 'react-router-dom';
import { publicRequest } from '../../requestMethods';
import EditProfile from './EditProfile';
import * as bootstrap from 'bootstrap'

export async function loader({ params }) {
    return await publicRequest.get(`profile/view/${params.userId}`)
}

const Profile = ({ myProfile }) => {
    const user = useLoaderData().data.user;
    const events = useLoaderData().data.events;
    const books = useLoaderData().data.books;
    const donations = useLoaderData().data.donations;
    const swaps = useLoaderData().data.swaps;
    console.log({ user, events, books, donations, swaps })
    const handleShow = () => {
        const myModal = new bootstrap.Modal(document.getElementById('modalEditProfile'))
        myModal.show();
    };
    const hideModal = () => {
        const myModal = document.getElementById('modalEditProfile');
        const modal = bootstrap.Modal.getInstance(myModal);
        modal.hide();
    }
    return (
        <div>
            {myProfile && <button onClick={handleShow}>Editar</button>}
            Página perfil usuario <br />
            Nombre: {user.name} <br />
            ...

            <div className="modal fade" id="modalEditProfile" tabIndex={-1} aria-labelledby="modalEditProfileLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalEditProfileLabel">Editar perfil</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <EditProfile closeModal={hideModal} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profile
