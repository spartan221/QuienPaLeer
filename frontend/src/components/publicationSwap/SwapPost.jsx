import React, { useState } from 'react'
import '../css/BookPost.css'
import ViewSwap from './ViewSwap'

export const SwapPost = ({ posts, loading }) => {
    const [properties, setProperties] = useState({})
    if (loading) {
        return <h2>Cargando ...</h2>
    }
    return <div className='container'>
        <div className='row row-cols-3'>
            {posts.map(post => (
                <div>
                    <div key={post._id} className="col py-2 px-5 pb-5">
                        <div className='row'>
                            <h5>{post.title}</h5>
                        </div>
                        <div className='row'>
                            <input onClick={e => setProperties({ ...post })} type="image" data-bs-toggle="modal" data-bs-target="#Modal" className="rounded-4 border" id='imageInputSellBook' src={post.image}></input>
                        </div>
                        <div className='row mt-2'>
                            <h6 className='col text-start'>{post.name}</h6>
                        </div>
                        <div className='row'>
                            <p>{post.description}</p>
                        </div>
                        
                    </div>

                    <div className="modal fade" id="Modal" tabIndex={-1} aria-labelledby="ModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="ModalLabel">{properties.title}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <ViewSwap {...properties} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    </div>
}
export default SwapPost