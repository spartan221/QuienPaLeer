import React, { useState } from 'react'
import '../css/EventPost.css'
import ViewBook from './ViewBook'

export const BookPost = ({ posts, loading }) => {
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
                            <h5>{post.title}</h5>
                        </div>
                        <div className='row'>
                            <input onClick={e => setProperties({ ...post })} type="image" data-bs-toggle="modal" data-bs-target="#Modal" className="rounded-4 border" src="https://firebasestorage.googleapis.com/v0/b/quienpaleer-c0891.appspot.com/o/299381290_1098676200815041_5013859073615010350_n%20(1).jpg?alt=media&token=c3a0a1ad-dce6-48cd-9a08-c70aabf02db9"></input>
                        </div>
                        <div className='row'>
                            
                            <h6 className='col text-start'>{post.name}</h6>
                            <h6 className='col text-end gray-text'>$ {post.price}</h6>
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
                                    <ViewBook {...properties} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    </div>
}
export default BookPost