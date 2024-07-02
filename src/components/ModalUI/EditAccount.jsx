import React, { useEffect, useState } from 'react'
import './modaladd.css'
import { useFormik } from 'formik'
import { CloseBlack, DefProfile, Profile1, Profile2, Profile3, Profile4 } from '../../asset/img'
import { changeData, editUser, registerUser } from '../../state/Modal/modalSlice'
import { useDispatch, useSelector } from 'react-redux'
import { addStudent, updateUser } from '../../state/MongoDB/MongoDBSLice'
import { processStatus, userLogin } from '../../state/Universal/universalSlice'
import './editaccount.css'
import axios from 'axios'

const EditAccount = ({data}) => {



  const dispatch = useDispatch()
  const [image,setImage] = useState(null)
  const [fileName,setFileName] = useState('No File Selected')
  const {loggedUser} = useSelector(state => state.universal)
  const [userLogs, setUserLogs] = useState([loggedUser]) 

  const onSubmit = () => { 
   dispatch(updateUser({data: {
      id: data[0]._id,
      username: values.name ,
      password: values.password ,
      date:  values.dateRegistered,
      image: data[0].image ,
      newImage: image ? image : 'none',
      admincode: data[0].admincode ,
   }  }))
  dispatch(userLogin({data: {
     _id: loggedUser._id,
     username: values.name ,
     password: values.password ,
     date:  values.dateRegistered,
     image: loggedUser.image ,
     newImage: image ,
     admincode: loggedUser.admincode ,
  }}))
  dispatch(editUser())
  dispatch(changeData())
}

  const {values, handleSubmit, handleChange, touched, error} = useFormik({
      initialValues : {
         name: data[0].username,
         password: data[0].password,
         dateRegistered: data[0].date,
         profile: ''
      },
      onSubmit
  })

 
  


  return (
    <>
       <div className="modal-background">
          <div className="modal-container">
            <div className="title">
               <h2>Edit Account</h2>
                <button className="close" onClick={()=>{dispatch(editUser())}}>
                 <img src={CloseBlack} alt="closeIcon" />
                </button>
                {/* <div className="prof-container">
                 <img src={DefProfile} alt="profiledef" />
               </div> */}
             </div>
             <div className="main-content">
              <div className="form-image-container">
                <form action="" className='form-image' onClick={()=>{ document.getElementById('profile').click()}}>
                     <input 
                        type="file" 
                        accept='image/*'
                        id='profile'
                        onChange={({target: {files}}) => {
                           files[0] && setFileName(files[0].name)
                           if(files){
                              setImage(URL.createObjectURL(files[0]))
                           }
                        }}
                        hidden
                     />
                     {
                        image ? 
                         <img src={image} className='form-upImage' alt='file Name'/> :
                         data.map((item) => {
                           return ( 
                              item.newImage == 'none' ?
                              <div className='edit-image'>
                                 {
                                 item.image === 'Profile1' ?
                                 <img src={Profile1} className='form-upImage'  alt="prof1" /> : 
                                 item.image == 'Profile2' ? 
                                 <img src={Profile2} className='form-upImage'  alt="prof2" /> :
                                 item.image == 'Profile3' ? 
                                 <img src={Profile3} className='form-upImage'  alt="prof3" /> :
                                 item.image == 'Profile4' ? 
                                 <img src={Profile4} className='form-upImage'  alt="prof3" /> :
                                       ''
                               }
                              </div>   
                                 :
                             <div className='edit-image'>
                                     <img src={item.newImage} className='form-upImage'  alt="prev" /> 
                             </div>
                             )
                         })
                     }

               </form>
               </div>
             <form action="" className="account-body">
               <div className="account-input-container">
                  <div className="account-input">
                      <label htmlFor="name">Name</label>
                       <input 
                          type="text" 
                          id='name'
                          onChange={handleChange}
                          placeholder='Enter Name'
                          value={values.name}
                       />
                  </div>
                  <div className="account-input">
                      <label htmlFor="password">Password</label>
                       <input 
                          type="text" 
                          id='password'
                          onChange={handleChange}
                          placeholder='Enter Password'
                          value={values.password}
                       />
                  </div>
                  <div className="account-input">
                      <label htmlFor="dateRegistered">Date Registered</label>
                       <input 
                          type="date" 
                          id='dateRegistered'
                          onChange={handleChange}
                          placeholder='Enter Date Registered'
                          value={values.dateRegistered}
                       />
                  </div>
               </div>
               <button class="button-29" style={{paddingLeft: '30px', paddingRight: '30px'}} onClick={handleSubmit}>EDIT</button>
             </form>
             </div>
          </div>
       </div>
    </>
  )
}

export default EditAccount
