import React from 'react'
import "../css/ViewEvent.css"

const ViewBook = (props) => {
    return (
        <div className='container rounded border p-4 mr-5'>
            <div className='row'>
                <img className='rounded-4' src="https://firebasestorage.googleapis.com/v0/b/quienpaleer-c0891.appspot.com/o/299381290_1098676200815041_5013859073615010350_n%20(1).jpg?alt=media&token=c3a0a1ad-dce6-48cd-9a08-c70aabf02db9" />
            </div><br />
            <h5 className='text-start'>Nombre del Libro</h5>
            <p className='text-start'>{props.name}</p>
            <div className='row'>
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
        </div>
    )
}

export default ViewBook
