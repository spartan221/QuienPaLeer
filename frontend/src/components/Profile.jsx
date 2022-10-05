import React from 'react'
import { useLoaderData } from 'react-router-dom';
import { publicRequest } from '../requestMethods';

export async function loader({ params }) {
    return await publicRequest.get(`profile/view/${params.userId}`)
}

const Profile = () => {
    const user = useLoaderData().data.user;
    const events = useLoaderData().data.events;
    const books = useLoaderData().data.books;
    console.log({ user, events, books })
    return (
        <div>
            Página perfil usuario <br />
            Nombre: {user.name} <br />
            ...
        </div>
    )
}

export default Profile
