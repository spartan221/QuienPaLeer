import React from 'react'
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import { publicRequest } from '../requestMethods';

export async function loader({params}) {
    return await publicRequest.get(`profile/view/${params.userId}`)
}

const Profile = () => {
    const user = useLoaderData().data;
    console.log(user);
    return (
        <div>
            Página perfil usuario <br />
            Nombre: {user.name} <br />
            ...
        </div>
    )
}

export default Profile
