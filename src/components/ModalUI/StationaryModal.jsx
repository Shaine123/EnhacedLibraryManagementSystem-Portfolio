import React, { useEffect, useState } from 'react'
import './userinfomodal.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { illustration4 } from '../../asset/img'
import { dataProccessState, editBookDatabase } from '../../state/MongoDB/MongoDBSLice'

function StationaryModal({id}) {
 
  const [trackingDatas,setTrackingDatas] = useState([])
  const [bookDb,setBookDb] = useState([])
  const {timeLogs} = useSelector(state => state.mongoDB)
  const {logsController} = useSelector(state => state.tracker)
  const dispatch = useDispatch()
  console.log('stationary')
  console.log(id)
 useEffect(()=>{

  setTrackingDatas([])
  axios.get('http://localhost:3002/getStationaryData')
  .then((res) => {
    const data = res.data.filter((item) => {
         return item._id == id
    })
    setTrackingDatas(data)
  })
.catch(err => console.log(err))

  dispatch(dataProccessState())

 },[timeLogs])




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
                              <h2>Name: {trackingDatas[0].itemName} </h2>
                              <h2>Condition: {trackingDatas[0].condition}  </h2>
                              <h2>PurchaseDate: {trackingDatas[0].purchaseDate}  </h2>
                              <h2>Model: {trackingDatas[0].model} </h2>
                              <h2>Quantity: {trackingDatas[0].quantity} </h2>
                           </div>
                          :
                          ''
                     }
                    
                  </div>
       </div>
    </>
  )
}

export default StationaryModal
