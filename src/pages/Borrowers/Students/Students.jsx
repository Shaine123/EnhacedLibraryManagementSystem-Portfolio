import React, { useEffect, useRef, useState } from 'react'
import './student.css'
import { Link, json } from 'react-router-dom'
import TableLayout from '../../../layout/table/TableLayout'
import StudentAdd from '../../../components/ModalUI/StudentAdd'
import { useDispatch, useSelector } from 'react-redux'
import { changeData, editUser,  generateQR,  registerUser } from '../../../state/Modal/modalSlice'
import EditStudent from '../../../components/ModalUI/EditStudent'
import axios from 'axios'
import { Carret, DefProfile,Notification, LeftArrow, RightArrow, Search, Printer, Profile1, Profile2, Profile3, Profile4, ExportIcon } from '../../../asset/img'
import QRModal from '../../../components/ModalUI/QRModal'
import { changePage, processStatus, setPageLimit } from '../../../state/Universal/universalSlice'
import { useReactToPrint } from 'react-to-print'
import QRCode from 'react-qr-code'
import Success from '../../../components/ModalUI/confirmationModal/Success'
import Error from '../../../components/ModalUI/confirmationModal/Error'
import * as XLSX from 'xlsx/xlsx.mjs';
import ViewModal from '../../../components/ModalUI/ViewModal'

const Students = () => {

  const dispatch = useDispatch()
  const {isRegistering, isEditing, dataChange,openQR,bookDetails } = useSelector(state => state.modal)
  const {loggedUser,tableInfo} = useSelector(state => state.universal)
  const [userLogs, setUserLogs] = useState([loggedUser])
  const [userData,setUserData] = useState([])
  const {processFinished} = useSelector(state => state.universal)
  const {page} = useSelector(state => state.universal)
  const [data, setData] = useState([])
  const [search , setSearch] = useState('')

  const [limit,setLimit] = useState(10)
  const [finLimit, setFinLimit] = useState(10)


 const setPages = data.length % finLimit == 0 ? data.length / finLimit : (data.length / finLimit) + 1
 const numPages = Array.apply(null, Array(Math.floor(setPages))).map(function (x, i) { return i+ 1})

 let nextPageControl = setPages


 useEffect(()=>{
  
  axios.get('http://localhost:3002/getUsers')
  .then(res => {
      setUserData(res.data)
  })

  axios.get('http://localhost:3002/getStudentSorted')
 .then(res => {
     setData(res.data)
 })
  
},[dataChange])

console.log(dataChange)



  const handleClick = () => {
     dispatch(registerUser())
  }
  
  const [result, setResult] = useState()
  const [identifier,setIdentifier] = useState('')
  const editHandle = (val) => {
     const item = data.filter(items => items._id == val)
     console.log(item)
     dispatch(editUser())
     setResult(item)
     setIdentifier(val)
  }

  const generateCode = (val) => {
    const item = data.filter(items => items._id == val)
    console.log(val)
    setResult(item)
  }

  const header = [{
    name: 'STUDENTNAME',
    studentid: 'STUDENT ID NO',
    course: 'COURSE',
    yearlevel: 'YEARLEVEL',
    gender: 'GENDER',
    college: 'COLLEGE',
    status: 'STATUS'
  }]


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
    pageStyle: 'paddingLeft : 150px, border:1px solid red',
    documentTitle: 'Test',

  })
   let dataPerPage = data.length > limit ?  limit : data.length
   const lastIndex = page * dataPerPage
   const firstIndex = lastIndex - dataPerPage
   let printData =  tableInfo == '' ? data.slice(firstIndex,lastIndex) : tableInfo.slice(firstIndex,lastIndex)
   const {manualPrint} = useSelector(state => state.universal)

   //check if the page is in the first page
  
  const [disableBtn,setDisableBtn] = useState(true)

  const handleFilter = () => {
     dispatch(setPageLimit({limit: parseInt(limit)}))
     setFinLimit(limit)
  }
  
  console.log(data)

  
  const handleExport = () => {

   
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
       <div style={{display: 'none'}}> 
          <div className='page' ref={testRef}>
             <div className="pageFlex">
             {
                 manualPrint.length ?
                 manualPrint.map(item => (
                    <div className='dataContainer'> 
                       <p style={{marginBottom: '10px'}}>
                        {
                           item.studentname
                         }
                        </p>
                       <QRCode value={JSON.stringify(item._id)} size={140} /> 
                    </div>
                 ))
                  :
                  createPaper === true ? 
                  data.map(item => (
                    <div className='dataContainer'> 
                       <p style={{marginBottom: '10px'}}>{item.studentname}</p>
                       <QRCode value={JSON.stringify(item._id)} size={140} /> 
                    </div>
                 ))  : ''
                
              }
             </div>
          </div>
       </div>
          
      <nav className='dash-container'> 
       <h1>List of Students</h1>
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
              <Link className='dash-opt '  to={'/main/account'}>Profile</Link>
              <Link className='dash-opt' to='/'>Logout</Link>
              {/* <Link className='dash-opt'>Help</Link> */}
             </div>
           </div>
          </div>
      </nav>
      <div className="title-header">
        {/* <h1>List of Students</h1> */}
        <p>View the info of all registered students </p>
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
        <button class="button-52" role="button"  onClick={()=>{handleClick()}}>ADD STUDENT</button>
      </div>
      
      <div className="table-container">
        <h2>Students</h2>
        <div className="print-container" onClick={()=>{
           handlePrint() 
           }}>
            <img src={Printer} alt="print" />
            <p>Print</p>
        </div>
         <div className='export-container' onClick={handleExport}>
            <img src={ExportIcon} alt="" />
             <p>Export</p>
         </div>
        <div className='all-items'>
           <p>All <span>{data.length}</span></p>
        </div>
        {page == 0 ? 
            <h2 style={{textAlign: 'center'}}>There is No More Data Available</h2>   
           :
           <TableLayout 
           header = {header} 
           search = { search } 
           data = {data}  
           onEdit = {editHandle} 
           createQR = {generateCode}
           selectAll = {generatePaper}
         />
        }
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
            dispatch(changePage({pages: 'prev' , type: 'Student'}))
             }} >
            <img src={LeftArrow} className='right-arrow' alt="left" />
            Previos
          </button>
          <div className='current-page'>
            <p> {page}</p>
          </div>
          <button disabled = { page === parseInt(nextPageControl) ? true : false } onClick={() => {
             dispatch(changePage({pages: 'next' , type: 'Student'}))
             }}>
            <img src={RightArrow} className='left-arrow' alt="left" />
            Next
          </button>
         </div>
        </footer>
      </div>
      { isRegistering ?  <StudentAdd/> : ''}
      { isEditing ? <EditStudent data = {result} id = {identifier}/> : '' }
      { openQR ? <QRModal data = {result} type = {'student'}/> : ''}
      {processFinished ? <Success/> : ''}
    </>
  )
}

export default Students
