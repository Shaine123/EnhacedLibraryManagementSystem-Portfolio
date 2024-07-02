import React from 'react'
import '../modaladd.css'
import { useFormik } from 'formik'
import { CloseBlack } from '../../../asset/img'
import { changeData, registerUser } from '../../../state/Modal/modalSlice'
import { useDispatch } from 'react-redux'
import { addBookAccession, addStudent } from '../../../state/MongoDB/MongoDBSLice'


const AccessionAdd = () => {

  const dispatch = useDispatch()
  const onSubmit = () => { 
       dispatch(addBookAccession({data:values}))
       dispatch(registerUser())
     setTimeout(()=>{
      dispatch(changeData())
     },[500])
  }

  const {values, handleSubmit, handleChange, touched, error} = useFormik({
      initialValues : {
         title:'',
         author: '',
         accessionnum: '',
         publisher: '',
         year: '',
         dateacquired: '',
         isbn: '',
         typeOfMaterial: '',
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
               <h2>NEW BOOK</h2>
                <button className="close" onClick={()=>{dispatch(registerUser())}}>
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
                    <select name="typeOfMaterial" id="typeOfMaterial" onChange={handleChange}>
                       <option value="">Select Material Type</option>
                       <option value="Books">Books</option>
                       <option value="CD/DVD">CD/DVD</option>
                       <option value="Dessertation">Dessertation</option>
                       <option value="Periodecals">Periodecals</option>
                       <option value="Thesis">Thesis</option>
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

export default AccessionAdd 
