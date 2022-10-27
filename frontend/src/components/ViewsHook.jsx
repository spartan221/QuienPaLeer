import React, { useState } from 'react';
import axios from 'axios'
const useViews = (url) =>{
    const [posts, setPost] = useState([])
    const [loading, setLoading] = useState(false);
   
    
    
    const handleShow = () => {
        const myModal = new bootstrap.Modal(document.getElementById('ModalCreate'))
        myModal.show();
    };
    const hideModal = () => {
        const myModal = document.getElementById('ModalCreate');
        const modal = bootstrap.Modal.getInstance(myModal);
        modal.hide();
    }

    const fetch = async (param)=>{
        setLoading(true);
        const res = await axios.get(url+param)
        setPost(res.data.reverse());
        setLoading(false);
    }

    return {
        handleShow,
        hideModal,
        posts,
        loading,
        fetch
    }
}
export default useViews