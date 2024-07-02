import Login from "./Login/Login";
import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import MainPage from "./MainPage/MainPage";
import DashBoard from "./Dashboard/DashBoard";
import LoginManager from "./LoginManager/LoginManager";
import Students from "./Borrowers/Students/Students";
import Teachers from "./Borrowers/Teachers/Teachers";
import Scanner from "./Scanner/Scanner";
import Logins from "./Tracker/Logins/Logins";

import Accession from "./Material/Accession/Accession";
import Catalog from "./Material/Catalog/Catalog";
import Material from "./Tracker/Material/Material";
import { useDispatch, useSelector } from "react-redux";
import { addBookDatabase, addLoginDatabase, addLoginDb, addLoginDbs, editBookDatabase, editLoginDatabase } from "../state/MongoDB/MongoDBSLice";
import { beginBookDay, beginDay } from "../state/Tracking/trackerSlice";
import axios from "axios";
import Stationary from "./Material/Stationary/Stationary";
import AccountPage from "./Account/AccountPage";
import SettingPage from "./Settings/SettingPage";
import TeacherLog from "./Tracker/TeacherLog/TeacherLog";
import ActiveBorrower from "./Statistics/Active Borrower/ActiveBorrower";
import MostBorrowed from "./Statistics/Most Borrowed/MostBorrowed";
import MostLogged from "./Statistics/Most Logged/MostLogged";
import Guest from "./Borrowers/Guess/Guest";
import GuestLog from "./Tracker/GuestLog/GuestLog";
import { setAccessControl, setFirstTime } from "../state/Universal/universalSlice";
import { current } from "@reduxjs/toolkit";

const Layout = () => {
  const {recordLogins,recordBooksBorrowed, dataProcessed} = useSelector(state => state.mongoDB)
  const { accessControl, refresh, firstTime } = useSelector((state) => state.universal)
  const [accData,setAccData] = useState([])
  const {startDay,startDayBook,students,material} = useSelector(state => state.tracker)
  const dispatch = useDispatch()
  const [data,setData] = useState()
  const [dataBook,setDataBook] = useState()

  

  const [dataStatus,setDataStatus] = useState(false)
  const [startOfDay,setStartOfDay] = useState(true)
  setTimeout(()=>{
    setDataStatus(true)
  },[500])
 useEffect(() => {
    axios.get('http://localhost:3002/getCurrentAccess')
    .then((res) => {
      createUser(res.data)
      setAccData(res.data)
    })
 }, [])
useEffect(()=>{
  axios.get('http://localhost:3002/getLoginDb')
  .then((res)=>{
     setData(res.data)
     sendLoginDb(res.data)
  })
},[recordLogins])

useEffect(()=>{
  axios.get('http://localhost:3002/getBookDb')
  .then((res)=>{
     setDataBook(res.data)
     sendBookDb(res.data)
  })
},[recordBooksBorrowed])



 const sendLoginDb =  (data) => {
    console.log('send login db')
    console.log(data.length )
    const d = new Date()
    const dates = ['January','Febuary','March','April','May','June','July','August','September','October','November','Decemenber']
    
    if(data.length == 0){
      dispatch(addLoginDatabase())
      console.log('loginDbStart')
   }else if(data.length > 0){
      const exist = data.filter((item) => {
         return item.month === dates[d.getMonth()]
      })
      if(exist.length <= 0){
        console.log('send new')
        dispatch(addLoginDatabase())
      }
   }
   
 } 

 const sendBookDb = (dataBook) => { 
   
  const d = new Date()
  const dates = ['January','Febuary','March','April','May','June','July','August','September','October','November','Decemenber']

   if(dataBook.length == 0){
    dispatch(addBookDatabase())
    dispatch(beginBookDay())
   }else if(dataBook.length > 0){
    console.log('add new book')
    const exist = dataBook.filter((item) => {
      return item.month === dates[d.getMonth()]
   })
   console.log(exist)
    if(exist.length <= 0){
      console.log('send new')
      dispatch(addBookDatabase())
    }
   }
    // if(startDayBook == true){
    //    if(recordBooksBorrowed > 0){
      
    //    }
    // }else if(startDayBook == false){
    //   const d = new Date()
    //   const dates = ['January','Febuary','March','April','May','June','July','August','September','October','November','Decemenber']
    //   const newData = dataBook.filter(item => {
    //       return item.month ==  dates[d.getMonth()]
    //     })
    // console.log(data)
    //   if(dataBook.length >= 1){
    //     console.log('editWorking')
    //     dispatch(editBookDatabase({id: newData[0]._id, month: newData[0].month }))
    //   }
    // }
 }
 
  // const time = ()=>{
  //    setTimeout(()=>{
  //      console.log('timeing')
  //      time()
  //    },[60000])
   
 
   
  // }
  // time()  

  const createUser = (val) => {
    console.log(val)
      if(val.length <= 0) {
        axios.post('http://localhost:3002/addCurrentAccess', {
          name: 'default',
          id: 'default',
          uri: 0,
          accessLevel: false
       })
       .then((res) => {console.log(res)})
       .catch((err) => {console.log(err)})
      }
  }

  // if(firstTime){
  //    dispatch(setFirstTime())
  //    dispatch(setAccessControl({state: false}))
  //   axios.put('http://localhost:3002/updateCurrentAccess', {
  //     name: 'def',
  //     id: 'default',
  //     uri: 0,
  //     accessLevel: false
  //  })
  //  .then((res) => {console.log(res)})
  //  .catch((err) => {console.log(err)})
  // }

  // if(refresh){
  //    if(accData.length > 0){
  //       console.log('workging')
  //        dispatch(()=>{setAccessControl({state: accData[0].accessLevel})})
  //    }

  // }else{
     
  // }

//  setTimeout(() => {
//   if(accData.length > 0){
//     dispatch(setAccessControl({state: accData[0].accessLevel}))
//    }
      
//  },[500])


  return (

       <Routes>
         <Route path="/" element={<Login/>}></Route>
         {
           accessControl ? <Route path="/main" element={<MainPage/>}>
           <Route  index  element = {<DashBoard/>}/>
           <Route path= "borrower/student" element = {<Students/>}/>
           <Route path= "borrower/teacher" element = {<Teachers/>}/>
           <Route path= "borrower/guest" element = {<Guest/>}/>
           <Route path = "Login" element = {<LoginManager/>}/>
           <Route path = "tracker/logins" element = {<Logins/>}/>
           <Route path = "tracker/material" element = {<Material/>}/>
           <Route path = "tracker/teacher" element = {<TeacherLog/>}/>
           <Route path = "tracker/guest" element = {<GuestLog/>}/>
           <Route path = "scanner" element = {<Scanner/>}/>
           <Route path="material/accession" element = {<Accession/>}/>
           <Route path="material/catalog" element = {<Catalog/>}/>
           <Route path="material/stationary" element = {<Stationary/>}/>
           <Route path="statistics/activeBorrower" element = {<ActiveBorrower/>} />
           <Route path="statistics/mostBorrowed" element = {<MostBorrowed/>} />
           <Route path="statistics/mostLogged" element = {<MostLogged/>} />
           <Route path="account" element = {<AccountPage/>}/>
           <Route path = "setting" element = {<SettingPage/>}/>
         </Route>
           :
           <Route path="/main" element={<MainPage/>}>
           <Route  index  element = {<Accession/>}/>
           <Route path= "borrower/student" element = {<Students/>}/>
           <Route path= "borrower/teacher" element = {<Teachers/>}/>
           <Route path= "borrower/guest" element = {<Guest/>}/>
           <Route path = "Login" element = {<LoginManager/>}/>
           <Route path = "tracker/logins" element = {<Logins/>}/>
           <Route path = "tracker/material" element = {<Material/>}/>
           <Route path = "tracker/teacher" element = {<TeacherLog/>}/>
           <Route path = "tracker/guest" element = {<GuestLog/>}/>
           <Route path = "scanner" element = {<Scanner/>}/>
           <Route path="material/accession" element = {<Accession/>}/>
           <Route path="material/catalog" element = {<Catalog/>}/>
           <Route path="material/stationary" element = {<Stationary/>}/>
           <Route path="statistics/activeBorrower" element = {<ActiveBorrower/>} />
           <Route path="statistics/mostBorrowed" element = {<MostBorrowed/>} />
           <Route path="statistics/mostLogged" element = {<MostLogged/>} />
           <Route path="account" element = {<AccountPage/>}/>
           <Route path = "setting" element = {<SettingPage/>}/>
       </Route>
         }
       </Routes>
    
  )
}

export default Layout
