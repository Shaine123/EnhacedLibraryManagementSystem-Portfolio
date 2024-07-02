import React from 'react'
import './success.css'
import { Smile } from '../../../asset/img'
import { useSelector } from 'react-redux'
const Success = () => {
  const {processFinished} = useSelector(state => state.universal)
  return (
    <div className='successContainer' style={processFinished ? {opacity: 1} : {opacity: 0}}>
     <div className="successInfo">
      <img src={Smile} alt="success" className='smileIcon' />
       <div className="divider"></div>
       <div className="successText">
          <h2>Great Success</h2>
          <p>Process has been finshed</p>
       </div>
      </div>
      <div className="footerColor"></div>
    </div>
  )
}

export default Success
