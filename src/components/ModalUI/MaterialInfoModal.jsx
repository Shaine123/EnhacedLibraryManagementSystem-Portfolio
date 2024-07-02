import React, { useEffect, useState } from 'react'
import './userinfomodal.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { illustration4 } from '../../asset/img'
import { dataProccessState, editBookDatabase } from '../../state/MongoDB/MongoDBSLice'

function MaterialInfoModal({id}) {
 
  const [trackingDatas,setTrackingDatas] = useState([])
  const [bookDb,setBookDb] = useState([])
  const {timeLogs} = useSelector(state => state.mongoDB)
  const {logsController} = useSelector(state => state.tracker)
  const dispatch = useDispatch()
  
 useEffect(()=>{

  setTrackingDatas([])
  axios.get('http://localhost:3002/getMaterialLogs')
  .then((res) => {
      setTrackingDatas(res.data)
  }).catch(err => console.log(err))

  dispatch(dataProccessState())

   axios.get('http://localhost:3002/getBookDb')
   .then((res) => {
       setBookDb(res.data)
   })
 },[timeLogs])
 console.log(timeLogs)


 useEffect(() => {
    try{
      console.log('working function')
       if(bookDb.length > 0){
        const d = new Date()
        const dates = ['January','Febuary','March','April','May','June','July','August','September','October','November','Decemenber']
        const exist = bookDb.filter(item => {
            return item.month ==  dates[d.getMonth()]
          })
          if(exist.length > 0){
            console.log('editWorking')
             
             if(trackingDatas.length > 0) {
         
               dispatch(editBookDatabase({id: exist[0]._id, month: exist[0].month, newId: trackingDatas[trackingDatas.length-1]._id }))
             }
          }
          
       }

 


    }catch(error){
       
    }
 },[trackingDatas])


  return (
    <>
       <div className="userinfo-container">
           <div className="title"> </div>
                <div className="imageContainer">
                  <img src={illustration4} alt="ill4" />
                </div>
                  <div className="details">
                     {
                         trackingDatas.length >= 1  ? 
                           <div>
                              <h2>Title: {trackingDatas[trackingDatas.length-1].data.title} </h2>
                              <h2>ISBN: {trackingDatas[trackingDatas.length-1].data.isbn}  </h2>
                              <h2>Author: {trackingDatas[trackingDatas.length-1].data.author}  </h2>
                              <h2>Publisher: {trackingDatas[trackingDatas.length-1].data.publisher} </h2>
                           </div>
                          :
                          ''
                     }
                    
                  </div>
       </div>
    </>
  )
}

export default MaterialInfoModal
