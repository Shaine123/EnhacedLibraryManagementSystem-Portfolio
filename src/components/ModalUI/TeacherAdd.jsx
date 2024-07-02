import React from 'react'
import './modaladd.css'
import { useFormik } from 'formik'
import { CloseBlack } from '../../asset/img'
import { changeData, registerUser } from '../../state/Modal/modalSlice'
import { useDispatch } from 'react-redux'
import { addStudent, addTeacher } from '../../state/MongoDB/MongoDBSLice'

const TeacherAdd = () => {
 
  const dispatch = useDispatch()
  const onSubmit = () => { 
       dispatch(addTeacher({data : values}))
       dispatch(registerUser())
       dispatch(changeData())
      console.log(values)
  }

  const {values, handleSubmit, handleChange, touched, error} = useFormik({
      initialValues : {
         name:'',
         id: '',
         contact: '',
         email: '',
         gender: '',
         position: '',
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
               <h2>NEW TEACHER</h2>
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
                    <label htmlFor="studentid">Teacher ID</label>
                     <input 
                        type="text" 
                        id='id'
                        value={values.id}
                        onChange={handleChange}
                        placeholder='Enter Teacher ID'
                      />
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="studentid">Contact NO</label>
                     <input 
                        type="text" 
                        id='contact'
                        value={values.contact}
                        onChange={handleChange}
                        placeholder='Enter Contact'
                      />
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="studentid">Email</label>
                     <input 
                        type="text" 
                        id='email'
                        value={values.email}
                        onChange={handleChange}
                        placeholder='Enter Email'
                      />
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="gender">Gender</label>
                     <select name="gender" id="gender" onChange={handleChange}>
                       <option value="">Select gender</option>
                       <option value="Male">Male</option>
                       <option value="Female">Female</option>
                     </select>
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="studentid">Position</label>
                     <input 
                        type="text" 
                        id='position'
                        value={values.position}
                        onChange={handleChange}
                        placeholder='Enter Position'
                      />
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="status">Status</label>
                      <select name="status" id="status" onChange={handleChange}>
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="InActive">InActive</option>
                      </select>
                  </div>
                  <button class="button-29" type='submit'>REGISTER</button>
              </form>
            </div>
          </div>
       </div>
    </>
  )
}

export default TeacherAdd
