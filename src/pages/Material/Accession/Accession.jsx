import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TeacherTable from '../../../layout/table/TeacherTable'
import { useDispatch, useSelector } from 'react-redux'
import { editUser,  registerUser } from '../../../state/Modal/modalSlice'
import axios from 'axios'
import { Carret, Carret2, DefProfile, ExportIcon, FilterIcon, LeftArrow, Notification, Printer, Profile1, Profile2, Profile3, Profile4, RightArrow, Search, Sort2 } from '../../../asset/img'
import QRModal from '../../../components/ModalUI/QRModal'
import { changePage, setPageLimit } from '../../../state/Universal/universalSlice'
import AccessionTable from '../../../layout/table/AccessionTable'
import AccessionAdd from '../../../components/ModalUI/MaterialModal/AccessionAdd'
import AccessionEdit from '../../../components/ModalUI/MaterialModal/AccessionEdit'
import { useReactToPrint } from 'react-to-print'
import * as XLSX from 'xlsx/xlsx.mjs';
import QRCode from 'react-qr-code'
import ViewModal from '../../../components/ModalUI/ViewModal'

const Accession = () => {
  const dispatch = useDispatch()
  const {isRegistering, isEditing, dataChange,openQR,bookDetails} = useSelector(state => state.modal)
  const navigate = useNavigate() 
  const {loggedUser, accessControl} = useSelector(state => state.universal)
  const [userLogs, setUserLogs] = useState([loggedUser])
  const [userData,setUserData] = useState([])
  const [data, setData] = useState([])
  const [allData,setAllData] = useState([])
  const [dataCatalog,setDataCatalog] = useState([])
  const [search , setSearch] = useState('')

  const [limit,setLimit] = useState(10)
  const [finLimit, setFinLimit] = useState(10)

useEffect(()=>{

  axios.get('http://localhost:3002/getUsers')
  .then(res => {
      setUserData(res.data)
  })

  axios.get('http://localhost:3002/getBook')
 .then(res => {
     setData(res.data)
     setAllData(res.data)
 }).catch(err => console.log(err))

 
 axios.get('http://localhost:3002/getBookCatalog')
 .then(res => {
     setDataCatalog(res.data)
 }).catch(err => console.log(err))

},[dataChange])


  const handleClick = () => {
     dispatch(registerUser())
  }
  
  const [result, setResult] = useState()
  const [resultCat,setResultCat] = useState()

  const editHandle = (val) => {
     const item = data.filter(items => items._id == val)
     dispatch(editUser())
     setResult(item)
  }
  const viewHandle = (val) => {
    const item = data.filter(items => items._id == val)

    const catalogItem = dataCatalog.filter(cat => item[0].title == cat.title )
    
    setResultCat(catalogItem)
    setResult(item)
 }

  const generateCode = (val) => {
    const item = data.filter(items => items._id == val)
    setResult(item)
  }



  // const numPages = []
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

   const handleExport = () => {

   
      let wb = XLSX.utils.book_new()
      let ws = XLSX.utils.json_to_sheet(data)

      XLSX.utils.book_append_sheet(wb,ws,"LibrarySheet1")

      XLSX.writeFile(wb,"LibraryExcel.xlsx")

   }
   let currentUser = userData.filter((item) => {
    return item.status == true
 })

 const [openDrop,setOpenDrop] = useState(false)
 const openDropDown = () => {
     setOpenDrop(item => !item)
 }

 const [sortSelected,setSortSelected] = useState('All')
 const handleSortClick = (item) => {
    setSortSelected(item)
    setOpenDrop(item => !item)
 }
 const [openDrop2,setOpenDrop2] = useState(false)
 const openDropDown2 = () => {
     setOpenDrop2(item => !item)
 }

 const [sortSelected2,setSortSelected2] = useState('None')
 const handleSortClick2 = (item) => {
    setSortSelected2(item)
    setOpenDrop2(item => !item)
 }

 const [sortedData,setSortedData] = useState(data)
 const submitSort = () => {

  if(sortSelected == 'All'){ 
    setData(allData)
  }else{
    const newData = data.filter((item) => {
       return item.typeOfMaterial == sortSelected
    })
    setData(newData)
  }
   
 }
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
                           item.title
                         }
                        </p>
                       <QRCode value={JSON.stringify(item._id)} size={140} /> 
                    </div>
                 ))
                  :
                  createPaper === true ? 
                  data.map(item => (
                    <div className='dataContainer'> 
                       <p style={{marginBottom: '10px'}}>{item.title}</p>
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
      <h1>List of Materials (Accession) Available</h1>
        <div className='dash-control'>
             {/* <div className="notif-container">
               <img src={Notification} alt="notif" />
             </div> */}
            {
               accessControl ?
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
               : <button className='limitBtn' onClick={() => {navigate('/')}}>Main Page</button>
            }
          </div>
      </nav>
      <div className="title-header">
        {/* <h1>List of Materials (Accession) Available</h1> */}
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
        {
           accessControl ? 
           <button class="button-52" onClick={()=>{handleClick()}}>NEW BOOK</button>
           : ''
        }
      </div>
      <div className="dropDown-container">
         <div className="dropDown-white">
           <h3>Type of Material</h3>
            <ul className={`menu ${openDrop ? 'active' : ''}`}>
                <li>
                     <p onClick={openDropDown}>{sortSelected}</p>
                     <ul className="sub-menu">
                        <li onClick={()=>{handleSortClick('All')}}>All</li>
                        <li onClick={()=>{handleSortClick('Books')}}>Books</li>
                        <li onClick={()=>{handleSortClick('CD/DVD')}}>CD/DVD</li>
                        <li onClick={()=>{handleSortClick('Dessertation')}}>Dessertation</li>
                        <li onClick={()=>{handleSortClick('Periodecals')}}>Periodecals</li>
                        <li onClick={()=>{handleSortClick('Thesis')}}>Thesis</li>
                     </ul>
                </li>
                <img src={Carret2} alt="carr2" className={`carret2 ${openDrop  ? 'carRotate' : ''}`} />
            </ul>
         </div>
         {/* <div className="dropDown-white">
           <h3>Sort By</h3>
            <ul className={`menu ${openDrop2 ? 'active' : ''}`}>
                <li>
                     <p onClick={openDropDown2}>{sortSelected2}</p>
                     <ul className="sub-menu" style={{width: '150px', height: '140px', right: '-30px'}}>
                        <li onClick={()=>{handleSortClick2('None')}}>None</li>
                        <li onClick={()=>{handleSortClick2('Accession No')}}>Accession No</li>
                        <li onClick={()=>{handleSortClick2('Date Acquired')}}>Date Acquired</li>
                        <li onClick={()=>{handleSortClick2('Title')}}>Title</li>
                        <li onClick={()=>{handleSortClick2('Year Publication')}}>Year Publication</li>
                     </ul>
                </li>
            </ul>
         </div> */}
         <button className='sortNewBtn' onClick={submitSort}>
            <img src={Sort2} alt="sort" />
         </button>
      </div>
      
      <div className="table-container">
        <h2>Books</h2>
       {
         accessControl ? 
        <>
          <div className="print-container"  onClick={()=>{
            handlePrint() 
            }}>
            <img src={Printer} alt="print" />
            <p>Print</p>
           </div>  
         <div className='export-container' onClick={handleExport}>
            <img src={ExportIcon} alt="" />
             <p>Export</p>
         </div>
        </>
        
       : 
       ''
       }
        <div className='all-items'>
           <p>All <span>{data.length}</span></p>
        </div>
        <AccessionTable 
          data={data} 
          search={search} 
          onEdit = {editHandle} 
          onView = {viewHandle}
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
      { isRegistering ?  <AccessionAdd/> : ''}
      { isEditing ? <AccessionEdit data = {result} /> : '' }
      { bookDetails ? <ViewModal data = {result} catalog = {resultCat}/> : ''} 
      {openQR ? <QRModal data = {result} type = {'Book'}/> : ''}
    </>
  )
}

export default Accession
