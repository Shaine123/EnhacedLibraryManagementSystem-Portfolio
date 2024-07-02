import React, { useRef, useState } from 'react'
import QRCode from "react-qr-code";
import { CloseBlack, Download, Printer } from '../../asset/img'
import './qrmodal.css'
import { useDispatch } from 'react-redux';
import { generateQR, registerUser } from '../../state/Modal/modalSlice';
import html2canvas from 'html2canvas'
import downloadjs from 'downloadjs'
import {useReactToPrint} from 'react-to-print'
const QRModal = ({data, type}) => {

  
  const dispatch = useDispatch()
   console.log(type)
  const downloadClick = async () => { 
     const canvas = await html2canvas(document.querySelector('#qr'))
     const dataURl = canvas.toDataURL('image/png')
     downloadjs(dataURl,'qrcode.png', 'image/png')
  }

  const componentRef = useRef()
     const handlePrint = useReactToPrint({
       content : () => componentRef.current,
       pageStyle:()=>{'paddingLeft : 40px, border:1px solid red'},
       documentTitle: 'QR Codes'
     })


  return (
    <>
         <div className="modal-background">
          <div className="modal-container qr-small">
            <div className="title">
               <h2>QR CODE</h2>
                <button className="close" onClick={()=>{dispatch(generateQR())}}>
                 <img src={CloseBlack} alt="closeIcon" />
                </button>
            </div>
            <div className="sub-title">
              {
                data[0].type == 'Material' ? <h2>Title : {data[0].title}</h2> 
                :
                data[0].type == 'Stationary' ? 
                <h2>Item Name: {data[0].itemName}</h2> :
                type == 'guest' ? 
                <h2>User Name: { data[0].name}</h2> :
                <h2>User Name: {type == 'teacher' ? data[0].name : data[0].studentname}</h2>
              }
            
            </div>
            <div className="qr-container">
                <div  ref={componentRef} id='qr' className='qr-code'>
                  {
                      type == 'student' ?
                      <QRCode value={JSON.stringify({data: data[0]._id, name: type == 'teacher' ? data[0].name : data[0].studentname , title: data[0].title,  type: data[0].type, category: 'student'})} size={140} />  
                      :
                      type == 'Book' ?
                      <QRCode value={JSON.stringify({data: data[0]._id, title:  data[0].title , isbn: data[0].isbn,  type: data[0].type, category: 'material'})} size={140} />  
                       :
                      <QRCode value={JSON.stringify({data: data[0]._id, name: type == 'teacher' ? data[0].name : data[0].studentname , title: data[0].title,  type: data[0].type, category: type == 'teacher' ? 'teacher' : 'guest'})} size={140} />       
                  }
                 
                </div>
                <div className="btn-container">
                  <div className="download-btn" onClick={downloadClick}>
                    <div className="img-container">
                      <img src={Download} alt="download" />
                    </div>
                    Save Image
                  </div>    
                  <div className="print-btn" onClick={handlePrint} >
                     <div className="img-container">
                          <img src={Printer} alt="print" />
                      </div>
                        Print Image
                  </div>      
                </div>       
            </div>
           </div>
          </div>   
    </>
  )
}

export default QRModal
