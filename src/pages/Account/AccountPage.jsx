import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DefProfile, Notification, Profile1, Profile2, Profile3, Profile4, Search } from '../../asset/img'
import { useDispatch, useSelector } from 'react-redux'
import { editUser, registerUser } from '../../state/Modal/modalSlice'
import './account.css'
import EditAccount from '../../components/ModalUI/EditAccount'
import axios from 'axios'
const AccountPage = () => {


  const [data,setData] = useState([])
  const {loggedUser} = useSelector(state => state.universal)
  const {dataChange} = useSelector(state => state.modal)
  const [userLogs, setUserLogs] = useState([loggedUser]) 

  useEffect(() => {
    axios.get('http://localhost:3002/getUsers')
    .then(res => {
        setData(res.data)
    })
  },[dataChange])

  console.log(data)

  const {isEditing} = useSelector(state => state.modal)

  const [activeProfile, setActiveProfile] = useState(false)
  const {page} = useSelector(state => state.universal)
 
  const dispatch = useDispatch()
  const [search , setSearch] = useState('')
  const handleClick = () => {
  
  }

  const [editData,setEditData] = useState([])
  const handleEdit = (id) => {
   const tempData =  data.filter((item) => {
        return item._id == id
    })
    setEditData(tempData)
    dispatch(editUser())
  }
 
  return (
  <div>
       <nav className='dash-container'>
        <h1>Registered Accounts</h1>
         <div className='dash-control'>
            {/* <div className="notif-container">
              <img src={Notification} alt="notif" />
            </div> */}
         <div className={`profile-main ${activeProfile ? `min-bubble` : ''}`} onClick={()=>{setActiveProfile(item => !item)}}>
         <div className='profile-container '>
            <div className="img-container">
             {
                      userLogs.map((item) => {
                         return ( 
                          item.newImage == 'none' ? 
                          item.image === 'Profile1' ?
                          <img src={Profile1} alt="prof1" /> : 
                          item.image == 'Profile2' ? 
                          <img src={Profile2} alt="prof2" /> :
                           item.image == 'Profile3' ? 
                           <img src={Profile3} alt="prof3" /> :
                           item.image == 'Profile4' ? 
                           <img src={Profile4} alt="prof3" /> :
                                ''
                          :
                          <img src={item.newImage} alt="prof3" />
                         )
                      })
                  }
            </div>
         </div>
        <div className={`profile-control `}>
        <Link className='dash-opt'  to={'/main/account'}>Profile</Link>
        <Link className='dash-opt' to='/'>Logout</Link>
        {/* <Link className='dash-opt'>Help</Link> */}
     </div>
  </div>
 </div>
</nav>
  <div className="title-header">
        {/* <h1>Registered Accounts</h1> */}
        <p>View the info of all registered accounts </p>
   </div>
   {/* <div className='table-control-container'>
        <div className="search-container">
          <input
            type='text'
            placeholder='Search name..'
            className='searchbar'
            onChange={(e) => setSearch(e.target.value)}
          />
          <img
            src={Search}
            alt='search'
          />
        </div>
        <button class="button-52" role="button"  onClick={()=>{handleClick()}}>ADD USER</button>
   </div> */}
   <div className="account-container">
   {
      data.map((item) => {
          return (
            <div className="account-card"  onClick={()=>{handleEdit(item._id)}}>
              {
                item.newImage == 'none' ? 
                <div className="accountImg-container">
                  {
                     item.image === 'Profile1' ?
                     <img src={Profile1} alt="prof1" /> : 
                     item.image == 'Profile2' ? 
                     <img src={Profile2} alt="prof2" /> :
                     item.image == 'Profile3' ? 
                     <img src={Profile3} alt="prof3" /> :
                     item.image == 'Profile4' ? 
                     <img src={Profile4} alt="prof3" /> :
                         ''
                  }
                </div>
                  :
                <div className="accountImg-container">
                     <img src={item.newImage} alt="prof5" />                  
                </div>
              }
                
               <div className="accountInfo-container">
                  <h2>Name : {item.username}</h2>
                  <h2>Password : ******</h2>
                  <h2>Date Registered : {item.date}</h2>
               </div>
            </div>
          )
      })
   }
   </div>
 

   {isEditing ? <EditAccount data = {editData} /> : ''}
</div>
  )
}

export default AccountPage
