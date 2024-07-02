import React from 'react'
import './modaledit.css'
import { CloseBlack } from '../../asset/img'
import { useDispatch } from 'react-redux'
import { changeData, editUser, registerUser } from '../../state/Modal/modalSlice'
import { useFormik } from 'formik'
import { editStudent } from '../../state/MongoDB/MongoDBSLice'

const GuestEdit = ({data, id}) => {

 const dispatch = useDispatch()


console.log(id)

const onSubmit = () => { 
  dispatch(editStudent({data: values,identifier: id}))
  dispatch(editUser())
  dispatch(changeData())
}


const {values, handleSubmit, handleChange, touched, error} = useFormik({
   initialValues : {
      name: `${data[0].guestName}`,
      age:  `${data[0].guestAge}`,
      email:  `${data[0].guestEmail}`,
      phoneNumber:  `${data[0].guestPhone}`,
      status: `${data[0].status}`
   },
   onSubmit
})

console.log(values)


return (
  <>
     <div className="modal-background">
        <div className="modal-container">
          <div className="title">
             <h2>NEW STUDENT</h2>
              <button className="close"  onClick={()=>{
                  dispatch(editUser())
                  dispatch(changeData())
                  }}>
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

export default GuestEdit
