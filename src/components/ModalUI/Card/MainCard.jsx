import React from 'react'
import './mainCard.css'
import { MainPageImage } from '../../../asset/img'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setAccessControl } from '../../../state/Universal/universalSlice'
import axios from 'axios'

const MainCard = () => {
  const navigate = useNavigate() 
  const dispatch = useDispatch()

  const handlePublic = () => {
    dispatch(setAccessControl({state: false}))
     axios.put('http://localhost:3002/updateCurrentAccess', {
        name: 'def',
        id: 'default',
        uri: 0,
        accessLevel: false
     })
     .then((res) => {console.log(res)})
     .catch((err) => {console.log(err)})
      

      navigate('/main')
  }
  return (
   <>
      <div className='mainCardContainer'>
        <div class="mainImage">
           <img src={MainPageImage} alt='da'/>
         </div>
        <div className='btnContainer'>
            <h2>Please Select Your Access Level</h2>
             <div className="btns">
              <button class="button-57" role="button" onClick={handlePublic}><span class="text">
                 Public Access</span><span>Public Access
                </span></button>
              <button class="button-57" role="button" onClick={() => {dispatch(setAccessControl({state: true}))}}><span class="text">
                Admin Access</span><span>Admin Access</span></button>
             </div>
        </div>
      </div>
  </>
  )
}

export default MainCard
