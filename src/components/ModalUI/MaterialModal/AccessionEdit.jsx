import React from 'react'
import '../modaladd.css'
import { useFormik } from 'formik'
import { CloseBlack } from '../../../asset/img'
import { changeData, editUser, registerUser } from '../../../state/Modal/modalSlice'
import { useDispatch } from 'react-redux'
import { editBookAccession } from '../../../state/MongoDB/MongoDBSLice'


const AccessionEdit = ({data}) => {

  const dispatch = useDispatch()
  const onSubmit = () => { 
       dispatch(editBookAccession({data:values,_id:data[0]._id}))
       dispatch(editUser())
       dispatch(changeData())
  }

  const {values, handleSubmit, handleChange, touched, error} = useFormik({
      initialValues : {
         title: `${data[0].title}`,
         author: `${data[0].author}`,
         accessionnum: `${data[0].accessionnum}`,
         publisher: `${data[0].publisher}`,
         year: `${data[0].year}`,
         dateacquired: `${data[0].dateacquired}`,
         isbn: `${data[0].isbn}`,
         typeOfMaterial: `${data[0].typeOfMaterial}`,
         type: 'Material'
      },
      onSubmit
  })

  console.log(values)
  return (
    <>
       <div className="modal-background">
          <div className="modal-container" style={{maxHeight: '520px'}}>
            <div className="title">
               <h2>EDIT ACCESSION</h2>
                <button className="close" onClick={()=>{dispatch(editUser())}}>
                 <img src={CloseBlack} alt="closeIcon" />
                </button>
            </div>
            <div className="body">
              <form  className="modal-form" onSubmit={handleSubmit}>
                  <div className='modal-field'>
                    <label htmlFor="title">Title</label>
                    <input 
                      value={values.title}
                      onChange={handleChange}
                      type="text" 
                      placeholder='Enter Title'
                      id='title'
                      />
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="author">Author</label>
                     <input 
                        type="text" 
                        id='author'
                        value={values.author}
                        onChange={handleChange}
                        placeholder='Enter Author'
                      />
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="accessionnum">Acc No.</label>
                     <input 
                        type="text" 
                        id='accessionnum'
                        value={values.accessionnum}
                        onChange={handleChange}
                        placeholder='Enter Accession Number'
                      />
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="publisher">Publisher</label>
                    <input 
                        type="text" 
                        id='publisher'
                        value={values.publisher}
                        onChange={handleChange}
                        placeholder='Enter Publisher'
                      />
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="year">Year</label>
                    <input 
                        type="text" 
                        id='year'
                        value={values.year}
                        onChange={handleChange}
                        placeholder='Enter Year'
                      />
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="dateacquired">Date AQ</label>
                    <input 
                        type="date" 
                        id='dateacquired'
                        value={values.dateacquired}
                        onChange={handleChange}
                        placeholder='Enter Date Acquired'
                      />
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="isbn">ISBN</label>
                    <input 
                        type="text" 
                        id='isbn'
                        value={values.isbn}
                        onChange={handleChange}
                        placeholder='Enter ISBN No.'
                      />
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="typeOfMaterial">Material Type</label>
                    <select name="typeOfMaterial" id="typeOfMaterial" onChange={handleChange} value={values.typeOfMaterial}>
                       <option value="">Select Material Type</option>
                       <option value="Books">Books</option>
                       <option value="CD/DVD">CD/DVD</option>
                       <option value="Dessertation">Dessertation</option>
                       <option value="Periodecals">Periodecals</option>
                       <option value="Thesis">Thesis</option>
                    </select>
                  </div>
                  <button class="button-29" style={{paddingLeft: '30px', paddingRight: '30px'}} type='submit'>EDIT</button>
              </form>
            </div>
          </div>
       </div>
    </>
  )
}

export default AccessionEdit
