import React from 'react'
import './modaledit.css'
import { CloseBlack } from '../../asset/img'
import { useDispatch } from 'react-redux'
import { changeData, editUser } from '../../state/Modal/modalSlice'
import { useFormik } from 'formik'
import { editStudent, editTeacher } from '../../state/MongoDB/MongoDBSLice'


const EditTeacher = ({data , id}) => {
  const dispatch = useDispatch()


  console.log(data)
  
  const onSubmit = () => { 
    dispatch(editTeacher({data: values , identifier: id}))
    dispatch(editUser())
    dispatch(changeData())
    console.log('working')
  }
  
  
  const {values, handleSubmit, handleChange, touched, error} = useFormik({
     initialValues : {
        name:`${data[0].name}`,
        id: `${data[0].id}`,
        contact: `${data[0].contact}`,
        email: `${data[0].email}`,
        gender: `${data[0].gender}`,
        position: `${data[0].position}`,
        status: `${data[0].status}`
     },
     onSubmit
  })
  
  
  
    return (
      <>
        <div className="modal-background">
           <div className="modal-container">
             <div className="title">
                <h2>EDIT TEACHER</h2>
                  <button className="close" onClick={()=>{
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
                     <select name="gender" id="gender" onChange={handleChange}  value={values.gender}  >
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
                      <select name="status" id="status" onChange={handleChange}  value={values.status}  >
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">InActive</option>
                      </select>
                  </div>
                  <button class="button-29" style={{paddingLeft: '30px', paddingRight: '30px'}} type='submit' onClick={()=>{
          
                    }} >EDIT</button>
              </form>
              </div>
           </div>
        </div>
      </>
    )
}

export default EditTeacher
