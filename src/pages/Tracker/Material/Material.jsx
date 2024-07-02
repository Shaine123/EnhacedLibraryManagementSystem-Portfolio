import React, { useEffect, useState } from 'react'
import './material.css'
import { Link } from 'react-router-dom'
import { Carret, DefProfile, ExportIcon, LeftArrow, Notification, Profile1, Profile2, Profile3, Profile4, RightArrow, Search } from '../../../asset/img'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { changePage, setPageLimit } from '../../../state/Universal/universalSlice'
import TrackerMaterialTable from '../../../layout/table/TrackerMaterialTable'
import * as XLSX from 'xlsx/xlsx.mjs';

const Material = () => {

  const dispatch = useDispatch()
  const [trackingData,setTrackingData] = useState([]) 
  const {loggedUser} = useSelector(state => state.universal)
  const [userLogs, setUserLogs] = useState([loggedUser])
  const [search , setSearch] = useState('')
  const [data,setData] = useState([])
  const [userData,setUserData] = useState([])
  
  const {timeLogs} = useSelector(state => state.mongoDB)
  const {dataChange} = useSelector(state => state.modal)

 useEffect(()=>{

  axios.get('http://localhost:3002/getUsers')
  .then(res => {
      setUserData(res.data)
  })


  axios.get('http://localhost:3002/getMaterialLogs')
  .then((res) => {
       setTrackingData(res.data)
  })
 },[])

 const [limit,setLimit] = useState(10)
 const [finLimit, setFinLimit] = useState(10)

 const setPages = trackingData.length % finLimit == 0 ? trackingData.length / finLimit : (trackingData.length / finLimit) + 1
 const numPages = Array.apply(null, Array(Math.floor(setPages))).map(function (x, i) { return i+ 1})
 let nextPageControl = setPages
  const {page} = useSelector(state => state.universal)
  
  

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
//'NAME', 'ID', 'COURSE', 'YEAR','GENDER','DATE' 
 const header = [
   {
     name: 'NAME' ,
     id: 'ID' ,
     course: 'COURSE' ,
     yearlevel: 'YEAR LEVEL' ,
     gender: 'GENDER' ,
     type: 'TYPE',
     login: 'STATUS',
     date: 'DATE'
   }
 ]

 const [activeProfile, setActiveProfile] = useState(false)
 const [disableBtn,setDisableBtn] = useState(true)

 const handleFilter = () => {
  dispatch(setPageLimit({limit: parseInt(limit)}))
  setFinLimit(limit)
}

const handleExport = () => {
  const  data = trackingData.map((item) => {
     return {
             accessionnumber: item.data.accessionnum, 
             title: item.data.title,
             author: item.data.author,
             publisher: item.data.publisher,
             year: item.data.year,
             dataacquired: item.data.dateacquired,
             isbn: item.data.isbn,
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
         <h1>List of Books Borrowed Logs</h1>
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
        {/* <h1>List of Books Borrowed Logs</h1> */}
        <p>View the info of all books borrowed in the library </p>
      </div>
      <div className='table-control-container'>
      <div className="filter-container">
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
        <input 
          type="number" 
          placeholder='Enter Limit'
          className='limitInput'
          onChange={(e) => {setLimit(e.target.value)}}
        />
        <button onClick={handleFilter} className='limitBtn'>
            filter
        </button>
        </div>
      </div>

      <div className="table-container">
        <h2>Books</h2>
        <div className='export-container' onClick={handleExport} style={{left: '80px', top: '17px'}}>
            <img src={ExportIcon} alt="" />
             <p>Export</p>
         </div>
        <TrackerMaterialTable 
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

export default Material
