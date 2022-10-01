import React from 'react'

const Paginations = ({postPerPage, totalPosts,paginate,currentPage,band,bandRight}) => {
    const pageNumbers = [];
    for(let i =1 ; i<=Math.ceil(totalPosts/postPerPage);i++ ){
        pageNumbers.push(i);
    }
  return (
    <nav>
        <ul className='pagination justify-content-center mt-5'>
            {band
                  ?<li key={currentPage - 1} className="page-item disabled">
                        <span onClick={() => paginate(currentPage - 1)}  className='page-link text-secondary'>
                            <span aria-hidden="true">&lang;</span>
                        </span>
                    </li>
                  : <li key={currentPage - 1} className="page-item ">
                        <span onClick={() => paginate(currentPage - 1) }  className='page-link text-secondary'>
                            <span aria-hidden="true">&lang;</span>
                        </span>
                    </li>
            }
            {pageNumbers.map(number=>(
                
                <li key={number} className={number==currentPage ?"page-item active " : "page-item "}  >
                    <span onClick={()=>paginate(number)}  className={number==currentPage ?"page-link text-light bg-dark border-dark" :"page-link text-secondary"}>
                        {number}
                    </span>
                </li>
            ))}
            {bandRight
                  ? <li key={currentPage + 1} className="page-item disabled">
                      <span onClick={() => paginate(currentPage + 1)}  className='page-link text-secondary'>
                          <span aria-hidden="true">&rang;</span>
                      </span>
                    </li>
                  : <li key={currentPage + 1} className="page-item">
                      <sapn onClick={() => paginate(currentPage + 1)} className='page-link text-secondary'>
                          <span aria-hidden="true">&rang;</span>
                      </sapn>
                    </li>
            }
            
        </ul>
    </nav>
  )
}
export default Paginations