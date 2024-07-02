import React, { useCallback, useEffect } from 'react'
import './dashboard.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { BookDdash, BorrowDash, DefProfile, GuestIcon, Notification, Profile1, Profile2, Profile3, Profile4, StationaryIcon, StudentDash, TeacherDash } from '../../asset/img'
import {CategoryScale} from 'chart.js'; 
import {Chart, defaults} from 'chart.js/auto';

import {Bar, Line , Doughnut} from 'react-chartjs-2'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addTodaysRecord, updateTodayRecord } from '../../state/MongoDB/MongoDBSLice'
import { setNewDay, setTodayId } from '../../state/Tracking/trackerSlice'
import { setUpRec } from '../../state/Universal/universalSlice'
// import { defaults } from 'chart.js/dist'

defaults.maintainAspectRatio = false
defaults.responsive = true

defaults.plugins.title.display = true
defaults.plugins.title.align = 'start'
defaults.plugins.title.font.size = 20
defaults.plugins.title.color = 'black'
defaults.plugins.title.font.family = 'poppinsRegular' 
const DashBoard = () => {
  Chart.register(CategoryScale);

  const [activeProfile, setActiveProfile] = useState(false)
  const {loggedUser,upRec,refresh} = useSelector(state => state.universal)
  const {recorded,timeLogs,students,materials,teacher,guest} = useSelector(state => state.tracker)
  const {dataChange} = useSelector(state => state.modal)
  const [userLogs, setUserLogs] = useState([loggedUser])

  const [trackingData,setTrackingData] = useState([])
  const [userData,setUserData] = useState([])
  const [yearLogsData,setYearlyLogsData] = useState([])
  const [yearlyLogs,setYearlyLogsAll] = useState([])
  const [stationary,setStationary] = useState([])
  const [yearlyBookBorrowed, setYearlyBookBorrowed] = useState([])
  const [books,setBooks] = useState()
  const [bookData,setBookData] = useState([])
  const [todayData,setTodayData] = useState([])
  

 
  const dispatch = useDispatch()
  useEffect(()=>{
    axios.get('http://localhost:3002/logs')
    .then((res) => {
         setTrackingData(res.data)
    })

    axios.get('http://localhost:3002/getUsers')
    .then(res => {
        setUserData(res.data)
    })

    axios.get('http://localhost:3002/getLoginDb')
    .then((res) => {
       
        const d = new Date()
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
         
        const yearlyMonth = res.data.filter((item) => {return item.month == month[d.getMonth()]})
        setYearlyLogsAll(res.data)
        setYearlyLogsData(yearlyMonth)
      
    })

    axios.get('http://localhost:3002/getBookDb')
    .then((res) => {    
      const d = new Date()
      const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
       
      const yearlyBook = res.data.filter((item) => {return item.month == month[d.getMonth()]})
        setYearlyBookBorrowed(yearlyBook)
    })

    axios.get('http://localhost:3002/getStationaryData')
    .then((res) => {
       setStationary(res.data)
    })

    axios.get('http://localhost:3002/getMaterialLogs')
    .then((res) => {
      const d = new Date()
      const newData = res.data.filter((item) => {
          if(item.status == 'Borrowed'){
             const time =  d.getHours() - item.yearinfo.timeBorrowed 
             if(time >= 2){
               return true
             }
          }
      })
      setBookData(newData)
    })

   },[dataChange])


   useEffect(()=>{
    console.log('working data')
    // setUpRec(true) 
   },[dataChange])

   useEffect(()=>{
    axios.get('http://localhost:3002/getBook')
   .then(res => {
       setBooks(res.data)
   }).catch(err => console.log(err))
  
  },[dataChange])
  
  const weekday = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];

const d = new Date();
let day = weekday[d.getDay()];


   
  const [studentPres,setStudentPres] = useState(0)


  // setStudentPres(item => item + 1)



let todayLogins = 0
const [test,setTest] = useState(0)

 
// console.log(yearLogsData[0].weeks)
console.log('working')
console.log(yearLogsData.total)
console.log(yearlyBookBorrowed)

const newMonths= [
  {
     month: 'January',
     total: 0
  },
  {
    month: 'Febuary',
    total: 0
 },
 {
  month: 'March',
  total: 0
},
{
  month: 'April',
  total: 0
},
{
  month: 'May',
  total: 0
},
{
  month: 'June',
  total: 0
},
{
  month: 'July',
  total: 0
},
{
  month: 'August',
  total: 0
},
{
  month: 'September',
  total: 0
},
{
  month: 'October',
  total: 0
},
{
  month: 'November',
  total: 0
},
{
  month: 'December',
  total: 0
},
]
let updatedCount = [...newMonths]
 try{ 
     const d = new Date()
     const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      
     const yearlyMonth = yearLogsData.filter((item) => {return item.month == month[d.getMonth()]})
   

     if(yearlyLogs.length > 0){
        for(let i = 0; i < yearlyLogs.length; i++){
          updatedCount = newMonths.map((item) => {
            if(item.month === yearlyLogs[i].month){
               return {month: yearlyLogs[i].month, total: yearlyLogs[i].total}
            }
      
            return item
        })
         
        }
    
     }

       switch(day){
        case 'monday': 
        todayLogins = yearLogsData[0].weeks.monday
        break;
       case 'tuesday': 
        todayLogins = yearLogsData[0].weeks.tuesday
       break;
      case 'wednesday': 
      todayLogins = yearLogsData[0].weeks.wednesday
      break;
      case 'thursday': 
      todayLogins = yearLogsData[0].weeks.thursday
     break;
      case 'friday': 
      todayLogins = yearLogsData[0].weeks.friday
      break;
      case 'saturday': 
      todayLogins = yearLogsData[0].weeks.saturday
      console.log('sat')
      break;
  }
  
 }catch(error){
  //  console.log(error) 
 }
const [dashUser,setDashUser] = useState([])
 useEffect(() => {
     try{
      const d = new Date()
     const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      if(yearLogsData.length > 0){
        const yearlyMonth = yearLogsData.filter((item) => {return item.month == month[d.getMonth()]})
        setDashUser(yearlyMonth)
      }
      
  

  
     }catch(err){
       
     }
 },[dataChange])

 let currentUser = userData.filter((item) => {
    return item.status == true
 })
  return (
    <div>
        <nav className='dash-container'>
  
        <h1>ADMINISTRATIVE DASHBOARD</h1>
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
              <Link className='dash-opt' to={'/main/account'}>Profile</Link>
              <Link className='dash-opt' to='/'>Logout</Link>
              {/* <Link className='dash-opt'>Help</Link> */}
             </div>
           </div>
          </div>
        </nav>
            {/* <h1>ADMINISTRATIVE DASHBOARD</h1> */}
            <div className="summary-sec">
              <h1>Today's Record</h1>
              <p>Record Summary</p>
             <div className="info-container">
              <div className="card">
                <div className="card-layout">
                  <div className="card-details">
                    <h2>Total Students</h2>
                    {/* {
                        todayData.length > 0 ? 
                        <h1>{ todayData[0].totalStudents}</h1> :
                        ''
                    }
                  */}
                  {/* <h1>{ yearLogsData.length > 0 ? yearLogsData[0].todaysRecord.totalStudents : ''}</h1> */}
                  <h1>{students.length}</h1>
                  </div>                
                  <div className="icon">
                      <div className="img-container">
                      <img src={StudentDash} alt="studentDash" />
                    </div>
                  </div>
                </div>
                
                 {/* <p>+5% from yesterday</p> */}
               </div>
               <div className="card">
                <div className="card-layout">
                  <div className="card-details">
                    <h2>Total Teachers</h2>
                    {/* <h1>{ yearLogsData.length > 0 ? yearLogsData[0].todaysRecord.totalTeachers : 0}</h1>           */}
                    <h1>{teacher.length}</h1>
                  </div>
                 <div className="icon">
                  <div className="img-container"> 
                    <img src={TeacherDash} alt="studentDash" />
                  </div>
                  </div>
                </div>
                  {/* <p>+2% from yesterday</p> */}
                </div>
               <div className="card">
               <div className="card-layout">
                  <div className="card-details">
                    <h2>Total Books Borrowed</h2>
                     {/* {
                        yearlyBookBorrowed.length > 0 ?
                        <h1>{ yearlyBookBorrowed[0].bookBorrowed}</h1>
                        : ''
                     } */}
                     <h1>{materials.length}</h1>
                  </div>
                 <div className="icon">
                    <div className="img-container">
                    <img src={BorrowDash} alt="studentDash" />
                   </div>
                  </div>
                </div>
               
                 {/* <p>+7% from yesterday</p> */}
                </div>
               <div className="card">
                 <div className="card-layout">
                  <div className="card-details">
                    <h2>Total Books</h2>
                    {
                       books ? 
                       <h1>{books.length}</h1>   :
                       <h1>{0}</h1>
                    }  
                  </div>
                  <div className="icon">
                    <div className="img-container">
                    <img src={BookDdash} alt="studentDash" />
                   </div>
                  </div>
                </div>
              
                 {/* <p>+3% from yesterday</p> */}
               </div>
               <div className="card">
                 <div className="card-layout">
                  <div className="card-details">
                    <h2>Total Guest</h2>
                    {/* <h1>{  yearLogsData.length > 0 ? yearLogsData[0].todaysRecord.guest : 0}</h1>  */}
                    <h1>{guest.length}</h1>
                  </div>
                  <div className="icon">
                    <div className="img-container">
                    <img src={GuestIcon} alt="studentDash" />
                   </div>
                  </div>
                </div>
              
                 {/* <p>+3% from yesterday</p> */}
               </div>
               <div className="card">
               <div className="card-layout">
                  <div className="card-details">
                    <h2>Total Stationary</h2>
                    <h1>{stationary.length}</h1>    
                  </div>
                  <div className="icon">
                    <div className="img-container">
                    <img src={StationaryIcon} alt="studentDash" />
                   </div>
                  </div>
                </div>
               
                 {/* <p>+3% from yesterday</p> */}
               </div>
            </div>
             </div>
           
            <div className="second-section">
              <div className="line-graph">
                <Line
                  data={{
                     labels: ['Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sept','Oct','Nov','Dec'],
                     datasets: [
                       {
                         label: 'Student Logins',
                         data: [
                               updatedCount[0].total,
                               updatedCount[1].total,
                               updatedCount[2].total,
                               updatedCount[3].total,
                               yearLogsData.length > 0 ? yearLogsData[0].total : 0,
                               updatedCount[5].total,
                               updatedCount[6].total,
                               updatedCount[7].total,
                               updatedCount[8].total,
                               updatedCount[9].total,
                               updatedCount[10].total,
                               updatedCount[11].total
                              ],
                         backgroundColor: '#97BC62FF',
                         borderColor:'#2C5F2D',
                         tension: 0.1
                       },
                       {
                         label: 'Book Borrowed',
                         data: [
                             0,
                             0,
                             0,
                             0,
                              yearlyBookBorrowed.length > 0 ? yearlyBookBorrowed[0].total : 0,
                             0,
                             0,
                             0,
                             0,
                             0,
                             0,
                             0],
                         backgroundColor: '#8F1A00',
                         borderColor:'#B43E08',
                         tension: 0.1
                       }
                     ]
                  }}
                  options={{
                    plugins: {
                       title: {
                         text:'Monthly Student Logins & Book Borrowed'
                       }
                    }
                 }}
                 />
              </div>
               {
                 <div className="pie-chart">
              <Doughnut
                data = {{ 
                   labels: ['CTED','CAS','CAF','CCJE','CBA','CIT'],
                   datasets: [
                     {
                       label: 'Daily Login',
                       data: [
                          yearLogsData.length > 0 ?  yearLogsData[0].weeklycollege.cted : 0,
                          yearLogsData.length > 0 ?  yearLogsData[0].weeklycollege.cas : 0,
                          yearLogsData.length > 0 ?  yearLogsData[0].weeklycollege.caf : 0,
                          yearLogsData.length > 0 ?  yearLogsData[0].weeklycollege.ccje : 0,
                          yearLogsData.length > 0 ?  yearLogsData[0].weeklycollege.cba : 0,
                          yearLogsData.length > 0 ?  yearLogsData[0].weeklycollege.cit : 0
                          ],
                       backgroundColor: [
                        '#472731',
                        ' #282130',
                        ' #24788F',
                        ' #343148FF',
                        ' #eea849',
                        '#684551'
                       ]
                     },
                   ],
                }}
                 options={{
                    plugins: {
                       title: {
                         text:'College Sources',
                       }
                    }
                 }}
              />
              </div>  
              
               }
            </div>
            <div className="third-section">
             {
                  yearLogsData.length > 0 && yearlyBookBorrowed.length > 0 ?
                  <div className="bar-chart">
                  <Bar
                    data = {{ 
                       labels: ['Monday','Tuesday','Wednesday','Thursday','Friday'],
                       datasets: [
                         {
                           label: 'Daily Login',
                           data: [
                              yearLogsData[0].weeks.monday,
                              yearLogsData[0].weeks.tuesday,
                              yearLogsData[0].weeks.wednesday,
                              yearLogsData[0].weeks.thursday,
                              yearLogsData[0].weeks.friday
                              ],
                           backgroundColor: [
                             '#472731',
                           ]
                         },
                         {
                           label: 'Daily BookBorrowed',
                           data: [
                               yearlyBookBorrowed[0].weeks.monday,
                               yearlyBookBorrowed[0].weeks.tuesday ,
                               yearlyBookBorrowed[0].weeks.wednesday,
                               yearlyBookBorrowed[0].weeks.thursday,
                               yearlyBookBorrowed[0].weeks.friday
                             ],
                           backgroundColor: [
                            ' #282130',                  
                           ]
                         },
                       ],
                    }}
                     options={{
                        plugins: {
                           title: {
                             text:' Student Sources',
                           }
                        }
                     }}
                  />
                </div>
                :
                ''
             }
             <div className="overdue-container">
                <h2>List of Overdue Books</h2>
               <div className="table-cont">
                <table>
                    <thead>
                        <tr>
                          <th>Book Name</th>
                          <th>Student Number</th>
                          <th>Student Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookData.length > 0 ? 
                               bookData.map((item,index) => {
                                  return   <>
                                     <tr>
                                       <td>{index + 1}. {item.data.title}</td>
                                       <td>{item.data.studentid}</td>
                                       <td>{item.data.studentname}</td>
                                     </tr>
  
                                  </>
                               })
                            :
                            ''
                        }
                    </tbody>
                  </table>
               </div>
             </div>
            </div>
           
    </div>
  )
}

export default DashBoard
