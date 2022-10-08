
import React from 'react'
import "../css/ViewEvent.css"
import DatePublication from '../DatePublication.jsx';

const ViewDonation = (props) => {

    return (
        <div className='container rounded border p-4 mr-5'>
            <div className='row'>
                <img className='rounded-4' src={props.image} />    
            </div>
            <br />
            
            <div className='row '>
                
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
            <DatePublication dateCreatedAt={props.createdAt}/>
        </div>
    )
}

export default ViewDonation
