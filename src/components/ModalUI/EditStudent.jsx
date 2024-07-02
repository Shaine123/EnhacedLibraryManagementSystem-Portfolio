import React from 'react'
import './modaledit.css'
import { CloseBlack } from '../../asset/img'
import { useDispatch } from 'react-redux'
import { changeData, editUser } from '../../state/Modal/modalSlice'
import { useFormik } from 'formik'
import { editStudent } from '../../state/MongoDB/MongoDBSLice'

const ModalEdit = ({data, id}) => {

 const dispatch = useDispatch()


console.log(id)

const onSubmit = () => { 
  dispatch(editStudent({data: values,identifier: id}))
  dispatch(editUser())
  dispatch(changeData())
}


const {values, handleSubmit, handleChange, touched, error} = useFormik({
   initialValues : {
      name:`${data[0].studentname}`,
      studentid: `${data[0].studentid}`,
      course: `${data[0].course}`,
      yearlevel: `${data[0].yearlevel}`,
      gender: `${data[0].gender}`,
      college: `${data[0].college}`,
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
              <h2>EDIT STUDENT</h2>
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
                      type="text"
                      value={values.name}
                      placeholder='Enter Full Name'
                      id='name'
                      onChange={handleChange}
                      />
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="studentid">Student ID</label>
                     <input 
                        type="text" 
                        value={values.studentid}
                        id='studentid'
                        placeholder='Enter StudentID'
                        onChange={handleChange}
                      />
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="course">Course</label>
                     <select name="course" id="course"  onChange={handleChange} value={values.course} >
                        <option value="">Select Course</option>
                        <option value="BSINT">BSINT</option>
                        <option value="BSBA">BSBA</option>
                        <option value="BSCS">BSCS</option>
                     </select>
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="yearlevel">Year Level</label>
                    <select name="yearlevel" id="yearlevel"  onChange={handleChange} value={values.yearlevel}>
                       <option value="">Select Yearlevel</option>
                       <option value="1st Year">1st Year</option>
                       <option value="2nd Year">2nd Year</option>
                       <option value="3rd Year">3rd Year</option>
                       <option value="4th Year">4th Year</option>
                    </select>
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="gender">Gender</label>
                     <select name="gender" id="gender"  onChange={handleChange} value={values.gender}>
                       <option value="">Select gender</option>
                       <option value="Male">Male</option>
                       <option value="Female">Female</option>
                     </select>
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="college">College</label>
                     <select name="college" id="college"  onChange={handleChange} value={values.college}   >
                        <option value="">Select College</option>
                        <option value='CAS'>CAS</option>
                        <option value="CTED">CTED</option>
                        <option value="CCJE">CCJE</option>
                        <option value="CAF">CAF</option>
                     </select>
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="status">Status</label>
                      <select name="status" id="status"  onChange={handleChange} value={values.status}  >
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="InActive">InActive</option>
                      </select>
                  </div>
                  <button class="button-29" style={{paddingLeft: '30px', paddingRight: '30px'}} type='submit' onClick={()=>{
                      dispatch(editStudent({data: values,identifier: id}))
                      dispatch(editUser())
                      dispatch(changeData())
                    }} >EDIT</button>
              </form>
            </div>
         </div>
      </div>
    </>
  )
}

export default ModalEdit
