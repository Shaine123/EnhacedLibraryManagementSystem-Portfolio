import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { DefProfile, Notification } from '../../asset/img'

const SettingPage = () => {

  const [activeProfile, setActiveProfile] = useState(false)

  return (
 <div>
       <nav className='dash-container'>
         <h1>NORSU-BSC LIBRARY SYSTEM</h1>
         <div className='dash-control'>
            <div className="notif-container">
              <img src={Notification} alt="notif" />
            </div>
         <div className={`profile-main ${activeProfile ? `min-bubble` : ''}`} onClick={()=>{setActiveProfile(item => !item)}}>
         <div className='profile-container '>
            <div className="img-container">
                <img src={DefProfile} alt="DefProfile" />
            </div>
         </div>
        <div className={`profile-control `}>
        <Link className='dash-opt'>Profile</Link>
        <Link className='dash-opt' to='/'>Logout</Link>
        <Link className='dash-opt'>Help</Link>
     </div>
    </div>
   </div>
  </nav>
  </div>
  )
}

export default SettingPage
