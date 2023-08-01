/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

    const nextPage = () => {
            if(currentPage !== nPages) setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if(currentPage !== 1) setCurrentPage(currentPage - 1)
    }
    return (
        <>
        <nav aria-label="...">
        <ul className="pagination">
          <li className="page-item">
            <a
              className="page-link download-center-pagination-links"
              onClick={prevPage}
            >
              &#x3c;
            </a>
          </li>
          {pageNumbers.map(pgNumber => (
                    <li key={pgNumber}
                        className= {`page-item ${parseInt(currentPage) === parseInt(pgNumber) ? 'active' : ''} `} >

                        <a onClick={() => setCurrentPage(pgNumber)}
                            className='page-link download-center-pagination-links'
                            >

                            {pgNumber}
                        </a>
                    </li>
                ))}
          <li className="page-item">
            <a className="page-link download-center-pagination-links" onClick={nextPage}>
              &#x3e;
            </a>
          </li>
        </ul>
      </nav>
        </>
    )
}

export default Pagination
