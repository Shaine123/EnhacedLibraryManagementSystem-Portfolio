import React from 'react'
import './modaladd.css'
import { useFormik } from 'formik'
import { CloseBlack } from '../../asset/img'
import { changeData, registerUser } from '../../state/Modal/modalSlice'
import { useDispatch } from 'react-redux'
import { addStudent } from '../../state/MongoDB/MongoDBSLice'
import { processStatus } from '../../state/Universal/universalSlice'


const ModalAdd = () => {

  const dispatch = useDispatch()
  const onSubmit = () => { 
       dispatch(addStudent({data:values}))
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
         studentid: '',
         course: '',
         yearlevel: '',
         gender: '',
         college: '',
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
                    <label htmlFor="course">Course</label>
                     <select name="course" id="course" onChange={handleChange}>
                        <option value="">Select Course</option>
                        <option value="BSINT">BS Informatio Technology</option>
                        <option value="BSBA">BS Business Administration</option>
                        <option value="BSCS">BS Computer Science</option>
                        <option value="BSATAnimalHusbandry">Bachelor of Agricultural Technology Major in Animal Husbandry</option>
                        <option value="BSAAnimal">BS Agriculture Major in Agronomy</option>
                        <option value="BSF">BS Forestry</option>
                        <option value="AHM">Associate in Hospitality Management</option>
                        <option value="BSHM">BS Hospitatlity Management</option>
                        <option value="BSBAHM">BS Business Administration Manjor in Human Resources </option>
                        <option value="BSOA">BS Office Administration</option>
                        <option value="BSCrim">BS Criminology</option>
                        <option value="BEEDGC">BEED Genereal Curriculumn</option>
                        <option value="BEEDSE">BEED Special Education</option>
                        <option value="BSEDSci">BSED Science</option>
                        <option value="BSEDMath">BSED Mathematics</option>
                        <option value="BSEDEng">BSED Sciences</option>
                        <option value="BSITAT">BS Industrial Technology Major in Automotive Tech</option>
                        <option value="BSITET">BS Industrial Technology Major in Electrical Tech</option>
                        <option value="BSITCT">BS Industrial Technology Major in Computer Tech</option>
                        <option value="Graduate">Graduate</option>
                     </select>
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="studentid">Student ID</label>
                     <input 
                        type="text" 
                        id='studentid'
                        value={values.studentid}
                        onChange={handleChange}
                        placeholder='Enter StudentID'
                      />
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="yearlevel">Year Level</label>
                    <select name="yearlevel" id="yearlevel" onChange={handleChange}>
                       <option value="">Select Yearlevel</option>
                       <option value="1st Year">1st Year</option>
                       <option value="2nd Year">2nd Year</option>
                       <option value="3rd Year">3rd Year</option>
                       <option value="4th Year">4th Year</option>
                       <option value="5th Year">5th Year</option>
                    </select>
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
                    <label htmlFor="college">College</label>
                     <select name="college" id="college" onChange={handleChange} >
                        <option value="">Select College</option>
                        <option value='CAS'>CAS</option>
                        <option value="CTED">CTED</option>
                        <option value="CCJE">CCJE</option>
                        <option value="CAF">CAF</option>
                        <option value="CIT">CIT</option>
                        <option value="CBA">CBA</option>
                     </select>
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="status">Status</label>
                      <select name="status" id="status" onChange={handleChange}>
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="InActive">InActive</option>
                      </select>
                  </div>
                  <button class="button-29" role="button">REGISTER</button>
              </form>
            </div>
          </div>
       </div>
    </>
  )
}

export default ModalAdd
