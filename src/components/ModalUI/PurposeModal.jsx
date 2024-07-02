import React, { useState } from 'react'
import './purposemodal.css'
import { Carret } from '../../asset/img'
import { controlScanner, setPurpose } from '../../state/Universal/universalSlice'
import { useDispatch } from 'react-redux'
const PurposeModal = ({handleEvent}) => {

  const [selectState,setSelectState] = useState(false)
  const dispatch = useDispatch()
  const openSelect = (e) => {
     setSelectState(val => !val)  
  }
  return (
     <>
        <div className="purpose-container">
          <div className={`custom-select-container ${selectState ? 'activeSelect' : ''}`} onClick={openSelect} onKeyDown={openSelect}>
              <div className="custom-select">
                 <p>Select</p>
                 <img src={Carret} alt="carret" />
              </div>
              <div className="options">
                <div className="option" onClick={()=>{
                  handleEvent('Study')

                  dispatch(setPurpose({data:'Study'}))
                  }}>
                  <p>Study</p>
                </div>
                <div className="option" onClick={()=>{
                   handleEvent('IRS')
    
                   dispatch(setPurpose({data:'IRS'}))
                
                   }}>
                  <p>IRS</p>
                </div>
              </div>
          </div>
        </div>
     </>
  )
}

export default PurposeModal
