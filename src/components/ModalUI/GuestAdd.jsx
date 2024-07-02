import React from 'react'
import './modaladd.css'
import { useFormik } from 'formik'
import { CloseBlack } from '../../asset/img'
import { changeData, registerUser } from '../../state/Modal/modalSlice'
import { useDispatch } from 'react-redux'
import { addGuest, addStudent } from '../../state/MongoDB/MongoDBSLice'
import { processStatus } from '../../state/Universal/universalSlice'


const GuestAdd = () => {

  const dispatch = useDispatch()
  const onSubmit = () => { 
       dispatch(addGuest({data:values}))
       dispatch(registerUser())
       dispatch(processStatus())
       setTimeout(()=>{
        dispatch(changeData())
       },[500])
       setTimeout(()=>{
        dispatch(processStatus())
       },[1000])
  }

  const {values, handleSubmit, handleChange, touched, error} = useFormik({
      initialValues : {
         name:'',
         age: '',
         email: '',
         phoneNumber: '',
         status: '',
         type: 'User'
      },
      onSubmit
  })

  
  return (
    <>
       <div className="modal-background">
          <div className="modal-container">
            <div className="title">
               <h2>NEW STUDENT</h2>
                <button className="close" onClick={()=>{dispatch(registerUser())}}>
                 <img src={CloseBlack} alt="closeIcon" />
                </button>
            </div>
            <div className="body">
              <form  className="modal-form" onSubmit={handleSubmit}>
                 <div className='modal-field'>
                    <label htmlFor="name">Full Name</label>
                    <input 
                      value={values.name}
                      onChange={handleChange}
                      type="text" 
                      placeholder='Enter Full Name'
                      id='name'
                      />
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="age">Age</label>
                     <input 
                        type="number"
                        id='age'
                        value={values.age}
                        onChange={handleChange}
                        placeholder='Enter Age'
                      />
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="email">Email</label>
                     <input 
                        type="text" 
                        id='email'
                        value={values.email}
                        onChange={handleChange}
                        placeholder='Enter Email'
                      />
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="phoneNumber">Phone Number</label>
                     <input 
                        type="number"
                        id='phoneNumber'
                        value={values.phoneNumber}
                        onChange={handleChange}
                        placeholder='Enter PhoneNumber'
                      />
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="status">Status</label>
                     <input 
                        type="text" 
                        id='status'
                        value={values.status}
                        onChange={handleChange}
                        placeholder='Enter Status etc Married,Single'
                      />
                  </div>
                  
                  <button class="button-29" role="button">REGISTER</button>
              </form>
            </div>
          </div>
       </div>
    </>
  )
}

export default GuestAdd
