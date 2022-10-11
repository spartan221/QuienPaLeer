import React from 'react'
import "../css/ViewEvent.css"

const ViewSwap = (props) => {
    return (
        <div className='container rounded border p-4 mr-5'>
            <div className='row'>
                <img className='rounded-4' src={props.image} />
            </div><br />
            <h5 className='text-start'>Nombre del Libro</h5>
            <p className='text-start'>{props.title}</p>
            <div className='row'>

                <div className='col'>
                    <h5>Descripción</h5>
                    <p>{props.description}</p>
                </div>
                <div className='col'>
                    <h5>Intereses</h5>
                    <p>{props.interest}</p>
                </div>
                <div className='col'>
                    <h5>Autor</h5>
                    <p>{props.author}</p>
                </div>
            </div>
        </div>
    )
}

export default ViewSwap
