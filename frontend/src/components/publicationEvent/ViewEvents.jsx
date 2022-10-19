import React, { useState, useEffect } from 'react'
import EventPost from './EventPost.jsx'
import Paginations from '../Paginations'
import { publicRequest } from '../../requestMethods.js'
import '../css/ViewEvents.css'
import CreateEvent from './CreateEvent'
import * as bootstrap from 'bootstrap'
import { useLoaderData } from 'react-router-dom'

export function loader({ params }) {
    if (params.filter != '' || params.filter != 'null') {
        return `search/${params.filter}`
    } 
    return 'view/all'
}

const Pagination = () => {
    const [posts, setPost] = useState([])
    const [loading, setLoading] = useState(false);
    const [band, setBand] = useState(true);
    const [bandRight, setBandRight] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6)
    const [reload, setReload] = useState(0);
    const reloadPage = () => setReload(reload + 1);
    let url = useLoaderData()
    if (!url) {
        url = 'view/all'
    }

    const handleShow = () => {
        const myModal = new bootstrap.Modal(document.getElementById('ModalCreate'))
        myModal.show();
    };
    const hideModal = () => {
        const myModal = document.getElementById('ModalCreate');
        const modal = bootstrap.Modal.getInstance(myModal);
        modal.hide();
    }

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            const res = await publicRequest.get(`/event/${url}`)
            console.log(res.data)
            setPost(res.data);
            setLoading(false);
            console.log("posts:", res.data)
        }
        fetchPost();
        console.log("recarga")
    }, [reload]);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = pageNumber => {
        if ((pageNumber - 1) == 0) {

            setBand(true)
        }
        else {

            setBand(false)
        }
        if (pageNumber >= Math.ceil(posts.length / postsPerPage)) {
            setBandRight(true)
        }
        else {
            setBandRight(false)
        }
        setCurrentPage(pageNumber)
    }
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

            <Paginations postPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} currentPage={currentPage} band={band} bandRight={bandRight} />
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