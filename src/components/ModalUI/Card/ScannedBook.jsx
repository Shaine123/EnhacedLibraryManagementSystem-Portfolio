import React from 'react'
import './scannedBook.css'
import { useDispatch } from 'react-redux'
import { setBookScanned } from '../../../state/Universal/universalSlice'

const ScannedBook = ({scanner}) => {
  const dispatch = useDispatch()

  const handleScaned = () => {
    dispatch(setBookScanned())
    scanner()
  }
  return (
    <div className='scannedBookContainer'>
        <h3>Please Scan Your Id to Complete The Process</h3>
        <button className='scannedBookBtn' onClick={handleScaned}>Scan</button>
    </div>
  )
}

export default ScannedBook
