import axios from 'axios'
import React, { useState, useEffect } from 'react'
import EventPost from './publicationEvent/EventPost.jsx'
import Paginations from './Paginations'
import { publicRequest } from '../requestMethods.js'
import '../css/View.css'
import CreateEvent from './CreateEvent.jsx'

const Pagination = () => {
    const [posts, setPost] = useState([])
    const [loading, setLoading] = useState(false);
    const [band, setBand] = useState(true);
    const [bandRight, setBandRight] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6)
    const [reload, setReload] = useState(0);
    const reloadPage = () => setReload(reload+1);


    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            const res = await publicRequest.get("/event/view/all")
            console.log(res.data)
            setPost(res.data);
            setLoading(false);
        }
        fetchPost();
    }, []);

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
            <div className='row'>
                <h2 className='col text-start'>Eventos</h2>
                <div className='col text-end'>
                    <button type="button" className='btn btn-dark border' data-bs-toggle="modal" data-bs-target="#ModalCreate">Crear evento</button>
                </div>
            </div>
            <br></br>

            <EventPost posts={currentPost} loading={loading} />

            <Paginations postPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} currentPage={currentPage} band={band} bandRight={bandRight} />
            <div className="modal fade" id="ModalCreate" tabindex={-1} aria-labelledby="ModalCreateLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <CreateEvent reloadPage={reloadPage} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Pagination