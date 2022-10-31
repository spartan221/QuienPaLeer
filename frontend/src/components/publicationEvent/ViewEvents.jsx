import React, { useState, useEffect } from 'react'
import EventPost from './EventPost.jsx'
import Paginations from '../Paginations'
import { publicRequest } from '../../requestMethods.js'
import '../css/ViewEvents.css'
import CreateEvent from './CreateEvent'
import * as bootstrap from 'bootstrap'
import useViews from '../ViewsHook.jsx'
import usePaginationHook from '../PaginationHook.jsx';


import { useLoaderData } from 'react-router-dom'

export function loader({ params }) {
    if (params.filter != '' || params.filter != 'null') {
        return `search/${params.filter}`
    } 
    return 'view/all'
}

const Pagination = () => {
    const {handleShow,hideModal,posts,loading,fetch} = useViews("http://127.0.0.1:5000/api/event/")
    const {currentPage,currentPost,postsPerPage,changeCurrentPage} = usePaginationHook(posts)
    const [reload, setReload] = useState(0);
    const reloadPage = () => setReload(reload + 1);
    let url = useLoaderData()
    if (!url) {
        url = 'view/all'
    }
    useEffect(() => {
        const fetchPost = async () => {
            fetch(url)
        }
        fetchPost();
    }, [reload,url]);


    return (
        <div className='container pt-2'>
            <div className='row my-4'>
                <h2 className='col text-start ms-4 fw-bold'>Eventos</h2>
                <div className='col text-end'>
                    <button type="button" className='btn btn-dark border me-4' id='btnCreateEvent' onClick={handleShow}>Crear evento</button>
                </div>
            </div>
            <hr />

            <EventPost posts={currentPost} loading={loading} />

            <Paginations postPerPage={postsPerPage} totalPosts={posts.length} setCurrentPage={changeCurrentPage}  currentPage={currentPage}  />
            <div className="modal fade" id="ModalCreate" tabIndex={-1} aria-labelledby="ModalCreateLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <CreateEvent reloadPage={reloadPage} closeModal={hideModal} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Pagination