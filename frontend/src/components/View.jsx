import axios from 'axios'
import React,{useState,useEffect} from 'react'
import Post from './Post.jsx'
import Paginations from './Paginations'

const Pagination = ()=>{
    const [posts,setPost] = useState([])
    const [loading,setLoading] = useState(false);
    const [band,setBand] = useState(true);
    const [bandRight,setBandRight] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6)
    

    useEffect(() =>{
        const fetchPost = async ()=>{
            setLoading(true);
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
            console.log(res.data)
            setPost(res.data);
            setLoading(false);
        }
        fetchPost();
    },[]);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPost = posts.slice(indexOfFirstPost,indexOfLastPost)
    
    const paginate = pageNumber => {
        if((pageNumber-1) ==0){
            
            setBand(true)
        }
        else{
            
            setBand(false)
        }
        if(pageNumber>=Math.ceil(posts.length/postsPerPage)){
            setBandRight(true)
        }
        else{
            setBandRight(false)
        }
        setCurrentPage(pageNumber)}
    return(
        <div className='container mt-5'>
            <h1 className='text-primary mb-3'>My blog </h1>
            <Post posts={currentPost} loading={loading}/>
            <Paginations postPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} currentPage={currentPage} band={band} bandRight={bandRight}/>
        </div>
    )

}
export default Pagination