import React, { useEffect, useState } from 'react'
import './userinfomodal.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { illustration5 } from '../../asset/img'
import { collegesWeeklyData, dataProccessState, editLoginDatabase } from '../../state/MongoDB/MongoDBSLice'
import { placeGuestDetails, placeStudentDetails, placeTeacherDetails, removeGuestDetails, removeStudentDetails, removeTeacherDetails } from '../../state/Tracking/trackerSlice'
import { setUpRec } from '../../state/Universal/universalSlice'
import { changeData } from '../../state/Modal/modalSlice'

const UserInfoModal = ({log,id, type}) => {
   

  const [trackingDatas,setTrackingDatas] = useState([])
  const [yearlyData,setYearlyData] = useState([])
  const [teacherTracking,setTeacherTracking] = useState([])
  const [guestTracking,setGuestTracking] = useState([])
  const {timeLogs} = useSelector(state => state.mongoDB)
  const {studentDetails,teacherDetails,guestDetails, recorded,students,materials,teacher,guest} = useSelector(state => state.tracker)


 const dispatch = useDispatch()
 
 useEffect(()=>{
  axios.get('http://localhost:3002/getLoginDb')
  .then((res)=>{
    //  sendLoginDb(res.data)
    setYearlyData(res.data)
  })
  axios.get('http://localhost:3002/logs')
  .then((res) => {
    setTrackingDatas([])
    setTrackingDatas(res.data)
    // getTrackingData(res.data)
  }).catch(err => console.log(err))
  
  axios.get('http://localhost:3002/getTeacherLogs')
  .then((res) => {
    setTeacherTracking([])
    setTeacherTracking(res.data)
  }).catch(err => console.log(err))

  axios.get('http://localhost:3002/getGuestLogs')
  .then((res) => {
     setGuestTracking([])
     setGuestTracking(res.data)
  }).catch(err => console.log(err))



 },[timeLogs])




let track = trackingDatas.length <=0 ?  trackingDatas.length : trackingDatas.length - 1
let teacherTrack = teacherTracking.length <=0 ? teacherTracking.length : teacherTracking.length - 1
let guestTrack = guestTracking.length <= 0 ? guestTracking.length : guestTracking.length - 1
 if(trackingDatas.length >= 1){
  // console.log(trackingDatas[track].data.studentname)
 }
  


useEffect(()=>{
     try{
      if(trackingDatas.length !==0 && log === true){
        
        dispatch(collegesWeeklyData({college:trackingDatas[track].data.college}))
        dispatch(dataProccessState())
        dispatch(changeData())
        // console.log(trackingDatas[track].data.college)


  
        if(type == 'teacher'){
           dispatch(placeTeacherDetails({
              id: id,
              name: teacherTracking[teacherTrack].data.name ,
              contact: teacherTracking[teacherTrack].data.contact ,
              email: teacherTracking[teacherTrack].data.email ,
              purpose:  teacherTracking[teacherTrack].purpose
           }))
        }else if(type == 'guest'){
          console.log(guestTracking)
            dispatch(placeGuestDetails({
              id: id,
              name: guestTracking[guestTrack].data.name,
              phone: guestTracking[guestTrack].data.guestPhone,
              email: guestTracking[guestTrack].data.guestEmail,
              purpose: guestTracking[guestTrack].purpose,
         }))
         
        }else{
          console.log('student checking')
        dispatch(placeStudentDetails({
            id: id,
            name: trackingDatas[track].data.studentname,
            course: trackingDatas[track].data.course,
            college: trackingDatas[track].data.college,
            purpose: trackingDatas[track].purpose,
        }))
      }
      }
     }catch(error){
      //  console.log(error)
     }
    setTimeout(()=>{
      if(log == false){
        dispatch(removeStudentDetails({id : id}))
        dispatch(removeTeacherDetails({id : id}))
        dispatch(removeGuestDetails({id : id}))
     }
    },[1500])
},[trackingDatas])
  
useEffect( () => {
  // try{
   
  //     const d = new Date()
  //     const dates = ['January','Febuary','March','April','May','June','July','August','September','October','November','Decemenber']
      
  //    if(yearlyData.length > 0){
  //     const monthExist =  yearlyData.filter((item) => {
  //        return item.month == dates[d.getMonth()]
  //     })
   
  //     if(monthExist.length > 0){
  //        console.log('testing reached')
  //         console.log(trackingDatas[trackingDatas.length - 1]._id)
  //         console.log(teacherTracking[teacherTracking.length - 1]._id)
  //         console.log(guestTracking[guestTracking.length - 1]._id)
  //         studentTotal: trackingDatas[trackingDatas.length - 1]._id,
  //         teacherTotal: teacherTracking[teacherTracking.length - 1]._id,
  //         guestTotal: guestTracking[guestTracking.length - 1]._id,
  //          console.log( trackingDatas[trackingDatas.length - 1]._id)


  //     }
  //   }
     

  // }catch(error){
  
  // }
    //   const d = new Date()
    //   const dates = ['January','Febuary','March','April','May','June','July','August','September','October','November','Decemenber']
      
    //  if(yearlyData.length > 0){
    //   const monthExist =  yearlyData.filter((item) => {
    //      return item.month == dates[d.getMonth()]
    //   })

    //   if(monthExist[0].length > 0){
        
    //   }
  

},[trackingDatas])



useEffect(() => {
    
  const d = new Date()
  const dates = ['January','Febuary','March','April','May','June','July','August','September','October','November','Decemenber']
  
 if(yearlyData.length > 0){

      if(trackingDatas.length > 0){
        dispatch(editLoginDatabase({
          id: dates[d.getMonth()], 
          month: 'May', 
          college:  trackingDatas[track].data.college,
       }))

      }
  }
}, [])
   
useEffect(() => {
   console.log('worrking trial')
   const d = new Date()
   const dates = ['January','Febuary','March','April','May','June','July','August','September','October','November','Decemenber']

   if(trackingDatas.length > 0){
    dispatch(editLoginDatabase({
      id: dates[d.getMonth()], 
      month: 'May', 
      college: trackingDatas[track].data.college,
   }))
   }

},[trackingDatas])





// const getTrackingData = (data) => {
//       console.log('function is Working')
//      console.log(data)
// }

     
  return (
    <>
       <div className="userinfo-container">
           <div className="title"> </div>
                <div className="imageContainer">
                  <img src={illustration5} alt="ill5" />
                </div>
                  <div className="details">
                     {
                      type == 'teacher' ?
                      log == false ? 
                      teacherDetails.map((item)=>{
                       if(item.id == id){
                         return (
                         <div>
                           <h2>Name: {item.name}</h2>
                           <h2>Contact: {item.phone}</h2>
                           <h2>Email: {item.email}</h2>
                           <h2>Purpose: {item.purpose}</h2>
                        </div>
                         )
                      }
                      })
                      :
                      teacherTracking.length >= 1 ? 
                      <div>
                         <h2>Name: {teacherTracking[teacherTrack].data.name} </h2>
                         <h2>Contact: {teacherTracking[teacherTrack].data.contact}  </h2>
                         <h2>Email: {teacherTracking[teacherTrack].data.email}  </h2>
                         <h2>Purpose: {teacherTracking[teacherTrack].purpose} </h2>
                      </div>
                      : ''
                        :
                        type == 'guest' ?
                        log == false ?
                        guestDetails.map((item) => {
                          if(item.id == id){
                            return (
                            <div>
                              <h2>Name: {item.name}</h2>
                              <h2>Email: {item.email}</h2>
                              <h2>Phone: {item.phone}</h2>
                              <h2>Purpose: {item.purpose}</h2>
                           </div>
                            )
                         }
                        })
                        :
                        guestTracking.length >= 1 ?
                        <div>
                        <h2>Name: {guestTracking[guestTrack].data.name} </h2>
                        <h2>Email: {guestTracking[guestTrack].data.guestEmail}  </h2>
                        <h2>Phone: {guestTracking[guestTrack].data.guestPhone}  </h2>
                        <h2>Purpose: {guestTracking[guestTrack].purpose} </h2>
                     </div>
                          :  ''
                          :
                         log == false ? 
                         studentDetails.map((item)=>{
                           if(item.id == id){
                              return (
                              <div>
                                <h2>Name: {item.name}</h2>
                                <h2>Course: {item.course}</h2>
                                <h2>College: {item.college}</h2>
                                <h2>Purpose: {item.purpose}</h2>
                             </div>
                              )
                           }
                         })
                          :
                         trackingDatas.length >= 1 ? 
                           <div>
                              <h2>Name: {trackingDatas[track].data.studentname} </h2>
                              <h2>Course: {trackingDatas[track].data.course}  </h2>
                              <h2>College: {trackingDatas[track].data.college}  </h2>
                              <h2>Purpose: {trackingDatas[track].purpose} </h2>
                           </div>
                           :
                           ''
                     }
                    
                  </div>
       </div>
    </>
  )
}

export default UserInfoModal
