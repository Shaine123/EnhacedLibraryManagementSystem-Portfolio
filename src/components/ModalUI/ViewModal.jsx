import React, { useEffect } from 'react'
import './viewmodal.css'

import { CloseBlack } from '../../asset/img'
import { useDispatch } from 'react-redux'
import { registerUser, showBookDetails } from '../../state/Modal/modalSlice'
import axios from 'axios'

const ViewModal = ({data,catalog}) => {

  const dispatch = useDispatch()

 

  return (
    <div className='viewmodal-bg'>
     <div className="viewmodal-container">
      <div className="viewmodal-title">
           <h2>Book Details</h2>
                <button className="close" onClick={()=>{dispatch(showBookDetails())}}>
                 <img src={CloseBlack} alt="closeIcon" />
           </button>
      </div>
       <div className="viewmodal-content">
          <div className="view-info">
              <h2>Catalog Info</h2>
              <div className="view-details">
                  {
                     catalog.length > 0 ? 
                     <>
                        <h3>Title</h3>
                        <p>{catalog[0].title}</p>
                        <h3>Classification</h3>
                        <p>{catalog[0].classificationno}</p>
                        <h3>ISBN</h3>
                        <p>{catalog[0].isbn}</p>
                        <h3>Section</h3>
                        <p>{catalog[0].section}</p>
                        <h3>Subject</h3>
                        <p>{catalog[0].subject}</p>
                     </>
                     : 
                     <h2 style={{backgroundColor: 'white', marginTop: '30%'}}>No Data</h2>
                  }
              </div>
          </div>
          <div className="view-info">
              <h2>Book Info</h2>
              <div className="view-details">
                  {
                     data.length > 0 ? 
                     <>
                        <h3>Title</h3>
                        <p>{data[0].title}</p>
                        <h3>Author</h3>
                        <p>{data[0].author}</p>
                        <h3>ISBN</h3>
                        <p>{data[0].isbn}</p>
                        <h3>Publisher</h3>
                        <p>{data[0].publisher}</p>
                        <h3>Year</h3>
                        <p>{data[0].year}</p>
                        <h3>Acession Number</h3>
                        <p>{data[0].accessionnum}</p>
                     </>
                     : 
                     ''
                  }
              </div>
          </div>
       </div>
      </div>
    </div>
  )
}

export default ViewModal
