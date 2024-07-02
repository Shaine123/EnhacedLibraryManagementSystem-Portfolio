import React from 'react'
import './Success'
import { Sad } from '../../../asset/img'
const Error = () => {
  return (
    <div className='successContainer'>
    <div className="successInfo">
     <img src={Sad} alt="success" className='smileIcon' />
      <div className="divider"></div>
      <div className="successText">
         <h2>Yikes. Something Went Wrong</h2>
         <p>Student have been added</p>
      </div>
     </div>
     <div className="footerColor" style={{backgroundColor:'#FE0000'}}></div>
   </div>
  )
}

export default Error
