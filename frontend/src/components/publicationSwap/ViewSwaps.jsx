import axios from 'axios'
import React, { useState, useEffect } from 'react'
import SwapPost from './SwapPost'
import Paginations from '../Paginations'
import '../css/ViewBooks.css'
import FormSwap from './AddBookSwap.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap'
import { useLoaderData } from 'react-router-dom'
import { publicRequest } from '../../requestMethods.js'

export function loader({ params }) {
    if (params.filter != '' || params.filter != 'null') {
        return `search/${params.filter}`
    } 
    return 'view/all'
}


const ViewSwaps = () => {
    const [posts, setPost] = useState([])
    const [loading, setLoading] = useState(false);
    const [band, setBand] = useState(true);
    const [reload, setReload] = useState(0);
    const [bandRight, setBandRight] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6)
    const reloadPage = () => setReload(reload + 1);
    let url = useLoaderData()
    if (!url) {
        url = 'view/all'
    }

    const handleShow = () => {
        const myModal = new bootstrap.Modal(document.getElementById('ModalCreateSwap'))
        myModal.show();
    };

    const hideModal = () => {
        const myModal = document.getElementById('ModalCreateSwap');
        const modal = bootstrap.Modal.getInstance(myModal);
        modal.hide();
    }

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            const res = await publicRequest.get(`/swap/${url}`)
            console.log(res.data)
            setPost(res.data);
            setLoading(false);
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
        <div className='container pt-5'>
            <div className='row'>
                <h2 className='col text-start ms-4 fw-bold'>Intercambio de libros</h2>
                <div className='col text-end'>
                    <button type="button" className='btn border me-4' id='btnAddBookSell' onClick={handleShow}>Añadir un intercambio</button>
                </div>
            </div>
            <hr />

            <SwapPost posts={currentPost} loading={loading} />

            <Paginations postPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} currentPage={currentPage} band={band} bandRight={bandRight} />
            <div className="modal fade" id="ModalCreateSwap" tabIndex={-1} aria-labelledby="ModalCreateLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <FormSwap reloadPage={reloadPage} closeModal={hideModal} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default ViewSwaps