import React, { useState, useEffect } from 'react'
import DonationPost from './DonationPost.jsx'
import Paginations from '../Paginations'
import '../css/ViewBooks.css'
import CreateDonation from './CreateDonation.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap'
import usePaginationHook from '../PaginationHook.jsx';
import useViews from '../ViewsHook.jsx'


const ViewBooks = () => {
    const {handleShow,hideModal,posts,loading,fetch} = useViews("http://127.0.0.1:5000/api/donation/")
    const {currentPage,currentPost,postsPerPage,changeCurrentPage} = usePaginationHook(posts)
    const [reload, setReload] = useState(0);
    const reloadPage = () => setReload(reload + 1);

    useEffect(() => {
        const fetchPost = async () => {
            fetch()
        }
        fetchPost();
    }, [reload]);

    return (
        <div className='container pt-5'>
            <div className='row'>
                <h2 className='col text-start ms-4 fw-bold'>Donación de libros</h2>
                <div className='col text-end'>
                    <button type="button" className='btn border me-4' id='btnAddBookSell' onClick={handleShow} >Añadir donación</button>
                </div>
            </div>
            <hr />

            <DonationPost posts={currentPost} loading={loading} />

            <Paginations postPerPage={postsPerPage} totalPosts={posts.length} setCurrentPage={changeCurrentPage} currentPage={currentPage} />


            <div className="modal fade" id="ModalCreate" tabIndex={-1} aria-labelledby="ModalCreateLabel" >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <CreateDonation reloadPage={reloadPage} closeModal={hideModal} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default ViewBooks