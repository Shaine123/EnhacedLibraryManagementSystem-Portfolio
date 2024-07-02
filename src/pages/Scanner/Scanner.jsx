import React, { useEffect, useState } from 'react'
import './scanner.css'
import { DefProfile, LeftArrow, MaterialQR, Notification, Profile1, Profile2, Profile3, Profile4, QRScanner, RightArrow, Surveilance, UserQR } from '../../asset/img'
import {Link, json, useNavigate} from 'react-router-dom'
import QRReader from '@wypratama/react-qr';
import ScanSuccess from '../../components/ModalUI/ScanSuccess'
import sound from '../../asset/sound/qrsound.mp3'
import { useDispatch, useSelector } from 'react-redux'
import { controlTracking, deleteTracking, keepTrack, logsCompleted, logsCompletedMaterial, logsCompletedStationary, logsCompletedStudent, materialGetData, newRecord, setStudentStatus } from '../../state/Tracking/trackerSlice'
import { addGuestLog, addLoginLogs, addMaterialLogs, addMostBorrowedBook, addMostLoggedUser, addTeacherLog, addTeacherLogs, controlYearlyData, dataProccessState } from '../../state/MongoDB/MongoDBSLice';
import PurposeModal from '../../components/ModalUI/PurposeModal';
import { controlScanner, setBookScanned } from '../../state/Universal/universalSlice';
import UserInfoModal from '../../components/ModalUI/UserInfoModal';
import MaterialInfoModal from '../../components/ModalUI/MaterialInfoModal';
import axios from 'axios';
import { changeData } from '../../state/Modal/modalSlice';
import ScannedBook from '../../components/ModalUI/Card/ScannedBook';
import StationaryModal from '../../components/ModalUI/StationaryModal';



const Scanner = () => {

  const [scanner, setScanner] = useState(false)
  // const [scanned, setScanned] = useState(false)
  const navigate = useNavigate() 
  const {scanned,purpose,loggedUser ,accessControl, bookScanned} = useSelector(store => store.universal)
  const {dataChange} = useSelector(state => state.modal)
  const [userLogs, setUserLogs] = useState([loggedUser])
  const dispatch = useDispatch()
  const [userData,setUserData] = useState([])
  const {timeLogs, itemType} = useSelector(state => state.tracker)

 

  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(4)

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage

  const currentData = timeLogs.slice(firstPostIndex, lastPostIndex)
  const pageLimit = timeLogs.length === 0 ? timeLogs.length + 1 : timeLogs.length
  const setPages = timeLogs.length % postPerPage == 0 ? timeLogs.length / postPerPage : (timeLogs.length / postPerPage) + 1
  const nextPageControl = setPages
  const [newDatas, setNewData] = useState([])
  const [dataStudent,setDataStudent] = useState()

  useEffect(()=>{
    axios.get('http://localhost:3002/getUsers')
    .then(res => {
        setUserData(res.data)
    })
    axios.get('http://localhost:3002/logs')
    .then((res) => {
       setNewData(res.data)
    })

   
   },[timeLogs])

  useEffect(() => {
    axios.get('http://localhost:3002/getCurrentLogStudent')
    .then((res) => {
       setDataStudent(res.data)
    })
  },[dataChange])


  const handleClick = () => {
     setScanner(item => !item)
  }



  const currentTime = () => {
     const d = new Date()
     const day = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`

     let hours = d.getHours()

     let amOrpm = hours >= 12 ? 'pm' : 'am'
     hours = (hours % 12) || 12

     return {
              day: `${d.getDate()}`, 
              month:`${ d.getMonth() + 1}`, 
              year: `${d.getFullYear()}`,  
              timeBorrowed: hours,
              completeInfo: `${day} ${hours}:${d.getMinutes()}:${d.getSeconds()}${amOrpm}`
            }
  }

  const [purposSlc,setPurposeSlc] = useState(false)
  const [openPurpose,setOpenPurpose] = useState(false)
  const [result,setResult] = useState([])
  const [logStatus,setLogStatus] = useState(true)
  const [category,setCategory] = useState('')

  const handlePurpose = (val) => {
     let time =  currentTime().completeInfo
     const d = new Date()
     setLogStatus(true)
     dispatch(setStudentStatus({status: true}))
     setTimeout(() => {
      dispatch(keepTrack({out: JSON.parse(result), purpose: val , name: JSON.parse(result).name  }))
     },[500])
    
        dispatch(logsCompletedStudent())
    //  setPurposeSlc(item => !item)


    console.log('working')
    if(JSON.parse(result).category == 'teacher'){
      dispatch(addTeacherLog({data:JSON.parse(result) , yearinfo: currentTime(), status: true, purpose: val}))
      dispatch(controlTracking({data:JSON.parse(result).data , time: time , type: JSON.parse(result).category }))
     }else if(JSON.parse(result).category == 'guest'){
      console.log('guest - option')
      dispatch(addGuestLog({data:JSON.parse(result) , yearinfo: currentTime(), status: true, purpose: val}))
      dispatch(controlTracking({data:JSON.parse(result).data , time: time , type: JSON.parse(result).category  }))
     }else{ 
       dispatch(addLoginLogs({data:JSON.parse(result) , yearinfo: currentTime(), status: true, purpose: val}))
       dispatch(controlTracking({data:JSON.parse(result).data , time: time , type: JSON.parse(result).type }))
       dispatch(addMostLoggedUser({name: JSON.parse(result).name, month: d.getMonth(), id: JSON.parse(result).data, count: 1}))
     }
   
 
     dispatch(controlScanner())
     setTimeout(()=>{
       dispatch(controlScanner())
     },[500])

     setOpenPurpose(item => !item)

     setTimeout(()=>{
      setScanner(true)
      // setPurposeSlc(item => !item)
      dispatch(logsCompletedStudent())
     },[2000])

    setTimeout(()=>{
      // dispatch(keepTrack({out: JSON.parse(result), purpose: val , name: JSON.parse(result).name  }))
      dispatch(dataProccessState())
    },[1000])
    dispatch(newRecord())
    setLogStatus(true)
    // setTimeout(() => {
    
    // }, [500]);
   
  }


  const [isMaterial,setIsMaterial] = useState(false)
  const [bookaAdd,setBookAdd] = useState()
  const [bookProcess,setBookPrcess] = useState(false)

  const {logsControllerMaterial,logsControllerStationary,logsControllerStudent,students,teacher, studentPurpose} = useSelector(state => state.tracker)

  const handleBookScan = () => {
    setScanner(true)
    setBookPrcess(true)
  }
 
  const handleResult = (result) => {
    let time =  currentTime().completeInfo
    let mySound = new Audio(sound)
    console.log('handleResulst Function')
    console.log(result)
    console.log(JSON.parse(result).type)
    mySound.play()
    setResult(result)


    if(bookProcess){
      const d = new Date()
      setTimeout(() => {
        dispatch(logsCompletedMaterial())
      }, [500]);
      dispatch(addMaterialLogs({data:JSON.parse(bookaAdd).data ,userData: JSON.parse(result).data , yearinfo: currentTime(), status: true}))
      dispatch(controlTracking({data:JSON.parse(bookaAdd).data , time: time , type: 'Material' }))
      dispatch(addMostBorrowedBook({name: JSON.parse(bookaAdd).title, month: d.getMonth(), id: JSON.parse(result).data, count: 1}))
      setIsMaterial(item => !item)

      setTimeout(()=>{
        setScanner(true)
        dispatch(logsCompletedMaterial())
        setIsMaterial(item => !item)
       },[2000])

       dispatch(controlScanner())
       setTimeout(()=>{
         dispatch(controlScanner())
         dispatch(keepTrack({out: JSON.parse(bookaAdd)}))
       },[500])
       dispatch(newRecord())

       setTimeout(() => {
       setBookPrcess(false)

       },[500])
    }else{
    if((JSON.parse(result).type== 'User' && bookProcess == false)){
      console.log(result)
      setScanner(false)
      setCategory(JSON.parse(result).category)
      setLogStatus(false)
      dispatch(controlYearlyData({type:JSON.parse(result).type }))

      // const checkData = dataStudent.filter((item) => {
      //    return item.unid == JSON.parse(result).data
      // })
      // console.log('checkdata')
      // console.log(checkData)
      if(students.includes(JSON.parse(result).data)){
        dispatch(logsCompletedStudent())
        console.log('data already exisiting')
        const purpose = studentPurpose.filter((value) => {
            return value.name === JSON.parse(result).name
        })
           if(JSON.parse(result).category == 'teacher'){
            dispatch(addTeacherLog({data:JSON.parse(result) , yearinfo: currentTime(), status: true, purpose: purpose[0].purpose}))
            dispatch(controlTracking({data:JSON.parse(result).data , time: time , type: JSON.parse(result).category  }))
           }else if(JSON.parse(result).category == 'guest'){
            console.log('guest - option')
            dispatch(addGuestLog({data:JSON.parse(result) , yearinfo: currentTime(), status: true, purpose: purpose[0].purpose}))
            dispatch(controlTracking({data:JSON.parse(result).data , time: time , type: 'guest'  }))
           }else{ 
             dispatch(addLoginLogs({data:JSON.parse(result) , yearinfo: currentTime(), status: true, purpose: purpose[0].purpose}))
             dispatch(controlTracking({data:JSON.parse(result).data , time: time , type: JSON.parse(result).type }))
           }
       
         
         dispatch(controlScanner())
         setTimeout(()=>{
           dispatch(controlScanner())
         },[500])
    
         setOpenPurpose(false)
    
         setTimeout(()=>{
          setScanner(true)
          // setPurposeSlc(item => !item)
          dispatch(logsCompletedStudent())
         },[2000])
    
        setTimeout(()=>{
          dispatch(keepTrack({out: JSON.parse(result), name: JSON.parse(result).name}))
          dispatch(deleteTracking({id: JSON.parse(result).data }))
        },[1000])
        dispatch(newRecord())
      }else{
        setOpenPurpose(item => !item)
      }
   

      setLogStatus(false)
      dispatch(setStudentStatus({status: false}))
    }
    else if(JSON.parse(result).type == 'Material'){
        console.log('material')
        console.log(JSON.parse(result))

        const d = new Date()
        
       setBookAdd(result)
        setScanner(false)
        setResult(result)
        dispatch(controlYearlyData({type:JSON.parse(result).type }))

        dispatch(setBookScanned())
        // setTimeout(() => {
        //   dispatch(logsCompletedMaterial())
        // }, [500]);
        // dispatch(addMaterialLogs({data:JSON.parse(result).data , yearinfo: currentTime(), status: true}))
        // dispatch(controlTracking({data:JSON.parse(result).data , time: time , type: 'Material' }))
        // dispatch(addMostBorrowedBook({name: JSON.parse(result).title, month: d.getMonth(), id: JSON.parse(result).data, count: 1}))
        // setIsMaterial(item => !item)

        // setTimeout(()=>{
        //   // setScanner(true)
        //   dispatch(logsCompletedMaterial())
        //   setIsMaterial(item => !item)
        //  },[2000])

        //  dispatch(controlScanner())
        //  setTimeout(()=>{
        //    dispatch(controlScanner())
        //    dispatch(keepTrack({out: JSON.parse(result)}))
        //  },[500])
        //  dispatch(newRecord())

 
        
    }else if(JSON.parse(result).type == 'Stationary'){
      console.log('stationary')
      console.log(JSON.parse(result))
      dispatch(logsCompletedStationary())
      const d = new Date()
      setScanner(false)
      setResult(result)
      dispatch(controlYearlyData({type:JSON.parse(result).type }))

      dispatch(controlTracking({data:JSON.parse(result).data , time: time , type: 'Stationary' }))
      setIsMaterial(item => !item)

      setTimeout(()=>{
        setScanner(true)
        dispatch(logsCompletedStationary())
        setIsMaterial(item => !item)
       },[2000])

       dispatch(controlScanner())
       setTimeout(()=>{
         dispatch(controlScanner())
         dispatch(keepTrack({out: JSON.parse(result)}))
       },[500])
       dispatch(newRecord())

    }
    }
   
  }
 
  const [activeProfile, setActiveProfile] = useState(false)

  let currentUser = userData.filter((item) => {
    return item.status == true
  })
  return (
    <>
      <nav className='dash-container'> 
        <h1>QR Scanner</h1>
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
       <div className="scanner-main-container">
         <div className="scan-logs">
           <div className="header">
             <h2>Scan Logs</h2>
           </div>
           <div className="scan-log">
             { 
               currentData.map((item,index) => (
                <div className="log-card" key={index}>
                  <div className="con-1">
                    <div className="img-container">
                       <img src={item.type !== 'Material' ? UserQR : MaterialQR} alt="userqr" />
                     </div>
                    </div>
                  <div className="con-2">
                    <h2>Scan Successfully {item.type}</h2>
                    <p >{item.time}</p>
                  </div>
               </div>
               ))
             }
           </div>
           <div className="pagination-container">
               <button 
                className="pag-btn"  
                disabled = {currentPage <= 1 ? true : false}  
                onClick={()=>{setCurrentPage(currentPage - 1)}}
               >
                   <img src={LeftArrow} alt="l-arrow" />
                   Previos
                </button>
                <div className="pages">
                  <p>{currentPage}</p>
                </div>
                <button 
                  className="pag-btn" 
                  style={{paddingLeft: '13px'}} 
                  onClick={()=>{setCurrentPage(currentPage + 1)}}
                  disabled = {currentPage == nextPageControl ? true : false }
                >
                    Next
                   <img src={RightArrow} alt="r-arrow" />
                </button>
            </div>
         </div>
       <div className={`scanner-container ${scanned ? 'scanned' : ''}`}>
         <h1>Scan QR Easy</h1>
         {scanner ? 
            <div className='qr-code'>   
               <QRReader 
                  onResult={handleResult} 
                  style={{width:'370px', height: '310px', overflow: 'hidden'}} 
                  useFrame = {false}
                  scanDelay={500}
                  >
                 <div className='qr'></div>
               </QRReader>
            </div>
            : <div className="scanner-image">
               <img src={Surveilance} alt="sur" />
              </div>
         }
         <div className="qr-btn" onClick={handleClick}>
           <div className="img-container" style={{marginBottom: '10px'}}>
              <img src={QRScanner} alt="qrscanner" />
           </div>
           Scan Now
         </div>
      </div>
       </div>
       {openPurpose ?   <PurposeModal handleEvent= {handlePurpose}/> : ''}
       { logsControllerStudent ? <UserInfoModal log = {logStatus} id = {JSON.parse(result).data} type = {category ? category : 'User'} />  : '' }
       { logsControllerMaterial ?  <MaterialInfoModal  id = {JSON.parse(bookaAdd).data} />  : ''}
       { logsControllerStationary ? <StationaryModal id = {JSON.parse(result).data} /> : ''}
       {/* <PurposeModal handleEvent= {handlePurpose}/> */}
       { bookScanned ? <ScannedBook scanner = {handleBookScan}/> : ''}
    </>
  )
}

export default Scanner
