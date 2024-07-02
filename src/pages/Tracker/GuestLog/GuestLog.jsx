import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Carret, ExportIcon, LeftArrow, Notification, Profile1, Profile2, Profile3, Profile4, RightArrow, Search } from '../../../asset/img'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { changePage } from '../../../state/Universal/universalSlice'
import TrackerTeacherTable from '../../../layout/table/TrackerTeacherTable'
import TrackerGuestTable from '../../../layout/table/TrackerGuestTable'
import * as XLSX from 'xlsx/xlsx.mjs';

const GuestLog = () => {

  const {loggedUser} = useSelector(state => state.universal)
  const [search , setSearch] = useState('')
  const [trackingData,setTrackingData] = useState([]) 
  const dispatch = useDispatch()
  const [userLogs, setUserLogs] = useState([loggedUser])
  const [userData,setUserData] = useState([])
  const [activeProfile, setActiveProfile] = useState(false)

  useEffect(()=>{
    axios.get('http://localhost:3002/getUsers')
    .then(res => {
        setUserData(res.data)
    })
    axios.get('http://localhost:3002/getGuestLogs')
    .then((res) => {
         setTrackingData(res.data)
    })
   },[])

   console.log(trackingData)

  const numPages = []
  const setPages = trackingData.length % 10 == 0 ?  trackingData.length / 10 : ( trackingData.length / 10) + 1
  let nextPageControl = setPages
  const {page} = useSelector(state => state.universal)
  
  for(let i = 1; i < setPages; i++){
    numPages.push(i)
  }

  const [pageNum, setPageNum] = useState(1)
  const nextPage = (val) => {
     if(val == 'next'){
        setPageNum(pageNum + 1)
     }else if(val == 'prev'){
        setPageNum(pageNum - 1)
     }
  }
  
  const [active,setActive] = useState(false)
  const selectPage = () => {
      setActive(item => !item)
  }

  const handleExport = () => {
    const  data = trackingData.map((item) => {
       return {
               name: item.data.name, 
               phone: item.data.guestPhone,
               age: item.data.guestAge,
               email: item.data.guestEmail,
               status: item.data.status,
               purpose: item.purpose,
               status: item.status,
               time: item.yearinfo.completeInfo
             }
    })
 
   let wb = XLSX.utils.book_new()
   let ws = XLSX.utils.json_to_sheet(data)
 
   XLSX.utils.book_append_sheet(wb,ws,"LibrarySheet1")
 
   XLSX.writeFile(wb,"LibraryExcel.xlsx")
 }

 let currentUser = userData.filter((item) => {
  return item.status == true
})
 
  return (
    <>
       <nav className='dash-container'> 
       <h1>List of Guest Logs</h1>
        <div className='dash-control'>
             {/* <div className="notif-container">
               <img src={Notification} alt="notif" />
             </div> */}
           <div className={`profile-main ${activeProfile ? `min-bubble` : ''}`} onClick={()=>{setActiveProfile(item => !item)}}>
            <div className='profile-container '>
            <div className="img-container">
                  {
                     currentUser.length > 0 ? 
                       currentUser.map((item) => {
                        return ( 
                         item.image === 'Profile1' ?
                         <img src={Profile1} alt="prof1" /> : 
                         item.image == 'Profile2' ? 
                         <img src={Profile2} alt="prof2" /> :
                          item.image == 'Profile3' ? 
                          <img src={Profile3} alt="prof3" /> :
                          item.image == 'Profile4' ? 
                          <img src={Profile4} alt="prof3" /> :
                                 ''
                        )
                     })
                     :
                      userLogs.map((item) => {
                         return ( 
                          item.image === 'Profile1' ?
                          <img src={Profile1} alt="prof1" /> : 
                          item.image == 'Profile2' ? 
                          <img src={Profile2} alt="prof2" /> :
                           item.image == 'Profile3' ? 
                           <img src={Profile3} alt="prof3" /> :
                           item.image == 'Profile4' ? 
                           <img src={Profile4} alt="prof3" /> :
                                  ''
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
        {/* <h1>List of Guest Logs</h1> */}
        <p>View the info of all Guest Logs in the library </p>
      </div>
      <div className='table-control-container'>
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
      </div>

      <div className="table-container">
        <h2>Guest</h2>
        <div className='export-container' onClick={handleExport} style={{left: '80px', top: '17px'}}>
            <img src={ExportIcon} alt="" />
             <p>Export</p>
         </div>
        <TrackerGuestTable
          search={search}
          data = {trackingData}
          />
        <footer>
        <div className={`nav  ${active ? 'active' : ''}`} style={active ? {height:'auto', maxHeight:'140px' , overflowY:'scroll'} : {height: '40px'}}>
          <div className="menu">
              <ul>
                {
                  numPages.map(item => (
                   <li className='option' onClick={()=>{
                    dispatch(changePage({pages: item, type: 'number'}))
                    setActive(item => !item)
                   }}>{item}</li>
                  ))
                }
              </ul>
          </div>
          </div>
          <button className='control-item' onClick={selectPage}>
              <img src={Carret} alt="carret" />
                Page {page}
            </button>
         <div className="next-btns">
         <button disabled = {page === 1 ? true : false } onClick={() => {
          dispatch(changePage({pages: 'prev' , type: 'Teacher'}))
          }} >
              <img src={LeftArrow} className='right-arrow' alt="left" />
            Previos
          </button>
          <div className='current-page'>
            <p> {page}</p>
          </div>
          <button disabled = { page === parseInt(nextPageControl) ? true : false } onClick={() => {
            dispatch(changePage({pages: 'next' , type: 'Teacher'}))
            }}>
             <img src={RightArrow} className='left-arrow' alt="left" />
            Next
          </button>
         </div>
        </footer>
      </div>
    
    </>
  )
}

export default GuestLog
