import React from 'react'
import { useLoaderData } from 'react-router-dom';
import { publicRequest } from '../../requestMethods';
import EditProfile from './EditProfile';

export async function loader({ params }) {
    return await publicRequest.get(`profile/view/${params.userId}`)
}

const Profile = ({ myProfile }) => {
    const user = useLoaderData().data.user;
    const events = useLoaderData().data.events;
    const books = useLoaderData().data.books;
    console.log({ user, events, books })
    return (
        <div>
            {myProfile && <button data-bs-toggle="modal" data-bs-target="#modalEditProfile">Editar</button>}
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
                            <EditProfile />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profile
