import React from 'react';

const NoResultFound = () => {
    return (
        <>
            <h5>No se encontraron publicaciones</h5>
            <lu style={{ fontSize: 12 }}>
                <li className='text-muted'>Intenta con términos más específicos.</li>
                <li className='text-muted'>Revisa la ortografía.</li>
                <li className='text-muted'>Revisa la sección en la que estás buscando.</li>
            </lu>
        </>
    )
}
export default NoResultFound