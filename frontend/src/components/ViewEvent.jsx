import React from 'react'
import "../css/ViewEvent.css"

const ViewEvent = (props) => {
    return (
        <div className='container rounded border p-4 mr-5'>
            <div className='row'>
                <img className='rounded-4' src="https://firebasestorage.googleapis.com/v0/b/quienpaleer-c0891.appspot.com/o/299381290_1098676200815041_5013859073615010350_n%20(1).jpg?alt=media&token=c3a0a1ad-dce6-48cd-9a08-c70aabf02db9" />
            </div><br />
            <h5 className='text-start'>Descripción</h5>
            <p className='text-start'>{props.description}</p>
            <div className='row'>
                <div className='col'>
                    <h5>Fecha</h5>
                    <p>{props.startDate} - {props.endDate}</p>
                </div>
                <div className='col'>
                    <h5>Hora</h5>
                    <p>{props.hour}</p>
                </div>
                <div className='col'>
                    <h5>Lugar</h5>
                    <p>{props.place}</p>
                </div>
            </div>
        </div>
    )
}

export default ViewEvent
