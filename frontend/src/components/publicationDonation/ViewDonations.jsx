import axios from 'axios'
import React, { useState, useEffect } from 'react'
import DonationPost from './DonationPost.jsx'
import Paginations from '../Paginations'
import '../css/ViewBooks.css'
import CreateDonation from './CreateDonation.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';


const ViewBooks = () => {
    const [posts, setPost] = useState([])
    const [loading, setLoading] = useState(false);
    const [band, setBand] = useState(true);
    const [bandRight, setBandRight] = useState(false);
    const [reload, setReload] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6)

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost)
    
    const reloadPage = () => setReload(reload+1);
    const paginate = pageNumber => {
        console.log("holaa")
        if ((pageNumber - 1) == 0) {
            setBand(true)
        }
        else {
            setBand(false)
        }
        if (pageNumber >= Math.ceil(posts.length / postsPerPage)) {
            setBandRight(true)
            console.log("true")
        }
        else {
            setBandRight(false)
            console.log("false")
        }
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            const res = await axios.get("http://127.0.0.1:5000/api/donation/")
            setPost(res.data);
            setLoading(false);
        }
        fetchPost();
    }, [reload]);


   
    return (
        <div className='container pt-5'>
            <div className='row'>
                <h2 className='col text-start ms-4 fw-bold'>Donación de libros</h2>
                <div className='col text-end'>
                    <button type="button" className='btn border me-4' id='btnAddBookSell' data-bs-toggle="modal" data-bs-target="#ModalCreate">Añadir donación</button>
                </div>
            </div>
            <hr/>

            <DonationPost posts={currentPost} loading={loading} />

            <Paginations postPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} currentPage={currentPage} band={band} bandRight={bandRight} />
            <div className="modal fade" id="ModalCreate" tabIndex={-1} aria-labelledby="ModalCreateLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <CreateDonation reloadPage={reloadPage}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default ViewBooks