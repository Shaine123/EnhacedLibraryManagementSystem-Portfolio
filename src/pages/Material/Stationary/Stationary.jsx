import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import TeacherTable from '../../../layout/table/TeacherTable'
import { useDispatch, useSelector } from 'react-redux'
import { editUser,  registerUser } from '../../../state/Modal/modalSlice'
import axios from 'axios'
import { Carret, DefProfile, LeftArrow, Notification, Printer, Profile1, Profile2, Profile3, Profile4, RightArrow, Search } from '../../../asset/img'
import QRModal from '../../../components/ModalUI/QRModal'
import { changePage, setPageLimit } from '../../../state/Universal/universalSlice'
import AccessionTable from '../../../layout/table/AccessionTable'
import AccessionAdd from '../../../components/ModalUI/MaterialModal/AccessionAdd'
import AccessionEdit from '../../../components/ModalUI/MaterialModal/AccessionEdit'
import { useReactToPrint } from 'react-to-print'
import QRCode from 'react-qr-code'
import StationaryTable from '../../../layout/table/StationaryTable'
import StationaryAdd from '../../../components/ModalUI/MaterialModal/StationaryAdd'
import StationaryEdit from '../../../components/ModalUI/MaterialModal/StationaryEdit'

const Stationary = () => {

  const dispatch = useDispatch()
  const {isRegistering, isEditing, dataChange,openQR} = useSelector(state => state.modal)
  const {loggedUser} = useSelector(state => state.universal)
  const [userLogs, setUserLogs] = useState([loggedUser])
  const [userData,setUserData] = useState([])
  const [data, setData] = useState([])
  const [search , setSearch] = useState('')

  const [limit,setLimit] = useState(10)
  const [finLimit, setFinLimit] = useState(10)

  useEffect(()=>{
    axios.get('http://localhost:3002/getUsers')
    .then(res => {
        setUserData(res.data)
    })
  
    axios.get('http://localhost:3002/getStationaryData')
        .then((res) => {
          setData(res.data)
        })
      .catch(err => console.log(err))
  console.log('useEffectRUn')
  },[dataChange])

  console.log(data)
  const handleClick = () => {
     dispatch(registerUser())
  }
  
  const [result, setResult] = useState()

  const editHandle = (val) => {
     const item = data.filter(items => items._id == val)
     dispatch(editUser())
     setResult(item)
  }

  const generateCode = (val) => {
    const item = data.filter(items => items._id == val)
    setResult(item)
  }



  const setPages = data.length % finLimit == 0 ? data.length / finLimit : (data.length / finLimit) + 1
  let nextPageControl = setPages
  const numPages = Array.apply(null, Array(Math.floor(setPages))).map(function (x, i) { return i+ 1})
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

  const [activeProfile, setActiveProfile] = useState(false)

  const testRef = useRef()
  const [createPaper,setCreatePaper] = useState(false)
  const [selectAll,setSelectAll] = useState(false)

  const generatePaper = () => {
     setCreatePaper(item => !item)
  }
  const handlePrint = useReactToPrint({
    content : () => testRef.current,
    pageStyle:() =>{'paddingLeft : 40px, border:1px solid red'},
    documentTitle: 'Test',

  })
   let dataPerPage = data.length > limit ? limit : data.length
   const lastIndex = page * dataPerPage
   const firstIndex = lastIndex - dataPerPage
   let printData = data.slice(firstIndex,lastIndex) 

   const {manualPrint} = useSelector(state => state.universal)

   
   const handleFilter = () => {
    dispatch(setPageLimit({limit: parseInt(limit)}))
    setFinLimit(limit)
   }
   let currentUser = userData.filter((item) => {
    return item.status == true
  })
  
  return (
    <>
    <div style={{display: 'none'}}> 
          <div className='page' ref={testRef}>
             <div className="pageFlex">
             {
                 manualPrint.length ?
                 manualPrint.map(item => (
                    <div className='dataContainer'> 
                       <p style={{marginBottom: '10px'}}>
                        {
                           item.itemName
                         }
                        </p>
                       <QRCode value={JSON.stringify(item._id)} size={140} /> 
                    </div>
                 ))
                  :
                  createPaper === true ? 
                  printData.map(item => (
                    <div className='dataContainer'> 
                       <p style={{marginBottom: '10px'}}>{item.itemName}</p>
                       <QRCode value={JSON.stringify(item._id)} size={140} /> 
                    </div>
                 ))
                 :
                 ''
              }
             </div>
          </div>
       </div>
      <nav className='dash-container'> 
      <h1>List of Materials (Stationary) Available</h1>
        <div className='dash-control'>
             <div className="notif-container">
               <img src={Notification} alt="notif" />
             </div>
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
              <Link className='dash-opt'  to={'/main/account'} >Profile</Link>
              <Link className='dash-opt' to='/'>Logout</Link>
              {/* <Link className='dash-opt'>Help</Link> */}
             </div>
           </div>
          </div>
      </nav>
      <div className="title-header">
        {/* <h1>List of Materials (Stationary) Available</h1> */}
        <p>View the info of all books Currently Available </p>
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
        <button class="button-52" onClick={()=>{handleClick()}}>NEW ITEM</button>
      </div>
      
      <div className="table-container">
        <h2>Stationary</h2>
        <div className="print-container"  onClick={()=>{
           handlePrint() 
           }}>
            <img src={Printer} alt="print" />
            Print
        </div>
        <div className='all-items'>
           <p>All <span>{data.length}</span></p>
        </div>
        <StationaryTable 
          data={data} 
          search={search} 
          onEdit = {editHandle} 
          createQR={ generateCode}
          selectAll = {generatePaper}
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
         <button disabled = {page === 1 ? true : false } onClick={() => {dispatch(changePage({pages: 'prev' , type: 'Accession'}))}} >
            <img src={LeftArrow} className='right-arrow' alt="left" />
            Previos
          </button>
          <div className='current-page'>
            <p> {page}</p>
          </div>
          <button disabled = { page === parseInt(nextPageControl) ? true : false } onClick={() => {dispatch(changePage({pages: 'next' , type: 'Accession'}))}}>
           <img src={RightArrow} className='left-arrow' alt="left" />
            Next
          </button>
         </div>
        </footer>
      </div>
      { isRegistering ?  <StationaryAdd/> : ''}
      { isEditing ? <StationaryEdit data = {result} /> : '' }
      {openQR ? <QRModal data = {result} type = {'Book'}/> : ''}
    </>
  )
}

export default Stationary
