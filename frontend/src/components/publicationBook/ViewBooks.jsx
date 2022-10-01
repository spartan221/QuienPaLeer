import axios from 'axios'
import React, { useState, useEffect } from 'react'
import BookPost from './BookPost.jsx'
import Paginations from './Paginations'
import '../css/ViewBooks.css'
import FormBook from './AddBookSale.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';


const ViewBooks = () => {
    const [posts, setPost] = useState([])
    const [loading, setLoading] = useState(false);
    const [band, setBand] = useState(true);
    const [reload, setReload] = useState(0);
    const [bandRight, setBandRight] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6)
    const reloadPage = () => setReload(reload+1);
    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            const res = await axios.get("http://127.0.0.1:5000/api/book/")
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
                <h2 className='col text-start ms-4 fw-bold'>Venta de libros</h2>
                <div className='col text-end'>
                    <button type="button" className='btn border me-4' id='btnAddBookSell' data-bs-toggle="modal" data-bs-target="#ModalCreate">Añadir a la venta</button>
                </div>
            </div>
            <hr/>

            <BookPost posts={currentPost} loading={loading} />

            <Paginations postPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} currentPage={currentPage} band={band} bandRight={bandRight} />
            <div className="modal fade" id="ModalCreate" tabIndex={-1} aria-labelledby="ModalCreateLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <FormBook reloadPage={reloadPage}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default ViewBooks