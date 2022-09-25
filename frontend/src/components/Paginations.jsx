import React from 'react'

const Paginations = ({postPerPage, totalPosts,paginate,currentPage,band,bandRight}) => {
    const pageNumbers = [];
    for(let i =1 ; i<=Math.ceil(totalPosts/postPerPage);i++ ){
        pageNumbers.push(i);
    }
  return (
    <nav>
        <ul className='pagination justify-content-center '>
            {band
                  ?<li key={currentPage - 1} className="page-item disabled">
                        <a onClick={() => paginate(currentPage - 1)} href="!#" className='page-link text-secondary'>
                            <span aria-hidden="true">&lang;</span>
                        </a>
                    </li>
                  : <li key={currentPage - 1} className="page-item ">
                        <a onClick={() => paginate(currentPage - 1) } href="!#" className='page-link text-secondary'>
                            <span aria-hidden="true">&lang;</span>
                        </a>
                    </li>
            }
            {pageNumbers.map(number=>(
                
                <li key={number} className={number==currentPage ?"page-item active " : "page-item "}  >
                    <a onClick={()=>paginate(number)} href="!#" className={number==currentPage ?"page-link text-light bg-dark" :"page-link text-secondary"}>
                        {number}
                    </a>
                </li>
            ))}
            {bandRight
                  ? <li key={currentPage + 1} className="page-item disabled">
                      <a onClick={() => paginate(currentPage + 1)} href="!#" className='page-link text-secondary'>
                          <span aria-hidden="true">&rang;</span>
                      </a>
                    </li>
                  : <li key={currentPage + 1} className="page-item">
                      <a onClick={() => paginate(currentPage + 1)} href="!#" className='page-link text-secondary'>
                          <span aria-hidden="true">&rang;</span>
                      </a>
                    </li>
            }
            
        </ul>
    </nav>
  )
}
export default Paginations