import React from 'react'
import './scansuccess.css'
import { HappyIcon } from '../../asset/img'

const ScanSuccess = () => {
  return (
    <>
       <div className="success-container">
          <div className="color">
             <div className="img-container">
                <img src={HappyIcon} alt="happy" />
             </div>
          </div>
         <div className="text-success">
          <h2>Yay!</h2>
          <p>You have Scanned Successfully</p>
          <h2>Ok Cool!</h2>
         </div>
       </div>
    </>
  )
}

export default ScanSuccess
