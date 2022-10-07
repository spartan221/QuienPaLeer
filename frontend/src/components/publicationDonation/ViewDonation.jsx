import React from 'react'
import "../css/ViewEvent.css"

const ViewDonation = (props) => {
    return (
        <div className='container rounded border p-4 mr-5'>
            <div className='row'>
                <img className='rounded-4' src={props.image}/>
            </div><br />
            <h5 className='text-start'>Titulo</h5>
            <p className='text-start'>{props.title}</p>
            <div className='row'>
                <div className='col'>
                    <h5>Nombre</h5>
                    <p>{props.name}</p>
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

export default ViewDonation
