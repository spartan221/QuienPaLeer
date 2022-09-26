import React, { useState } from 'react'
import '../css/EventPost.css'
import ViewEvent from '../ViewEvent'

export const EventPost = ({ posts, loading }) => {
    const [properties, setProperties] = useState({})
    if (loading) {
        return <h2>Cargando ...</h2>
    }
    return <div className='container'>
        <div className='row row-cols-2'>
            {posts.map(post => (
                <div>
                    <div key={post._id} className="col py-2 px-4">
                        <div className='row'>
                            <input onClick={e => setProperties({ ...post })} type="image" data-bs-toggle="modal" data-bs-target="#Modal" className="rounded-4 border" src={post.image}></input>
                        </div>
                        <div className='row'>
                            <p className='col text-start'>{post.name}</p>
                            <p className='col text-end gray-text'>{post.place}</p>
                        </div>
                        <p className='col text-start orange-text'>{post.startDate} - {post.endDate}</p>
                    </div>

                    <div className="modal fade" id="Modal" tabindex={-1} aria-labelledby="ModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="ModalLabel">{post.name}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <ViewEvent {...properties} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    </div>
}
export default EventPost