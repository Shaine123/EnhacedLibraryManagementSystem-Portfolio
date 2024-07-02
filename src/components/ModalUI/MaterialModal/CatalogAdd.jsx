import React from 'react'
import '../modaladd.css'
import { useFormik } from 'formik'
import { CloseBlack } from '../../../asset/img'
import { changeData, registerUser } from '../../../state/Modal/modalSlice'
import { useDispatch } from 'react-redux'
import { addBookAccession, addBookCatalog, addStudent } from '../../../state/MongoDB/MongoDBSLice'


const CatalogAdd = () => {

  const dispatch = useDispatch()
  const onSubmit = () => { 
       dispatch(addBookCatalog({data:values}))
       dispatch(registerUser())
       setTimeout(() => {
        dispatch(changeData())
       }, [500])
  }

  const {values, handleSubmit, handleChange, touched, error} = useFormik({
      initialValues : {
         title:'',
         author: '',
         accessionnum: '',
         isbn: '',
         section: '',
         classificationno: '',
         subject: '',
         type: 'Material'
      },
      onSubmit
  })

  return (
    <>
       <div className="modal-background">
          <div className="modal-container">
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
                    <label htmlFor="isbn">ISBN</label>
                    <input 
                        type="text" 
                        id='isbn'
                        value={values.isbn}
                        onChange={handleChange}
                        placeholder='Enter ISBN'
                      />
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="section">Section</label>
                    <input 
                        type="text" 
                        id='section'
                        value={values.section}
                        onChange={handleChange}
                        placeholder='Enter Section'
                      />
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="classificationno">Classification</label>
                    <input 
                        type="text" 
                        id='classificationno'
                        value={values.classificationno}
                        onChange={handleChange}
                        placeholder='Enter Classification'
                      />
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="subject">Subject</label>
                    <input 
                        type="text" 
                        id='subject'
                        value={values.subject}
                        onChange={handleChange}
                        placeholder='Enter Subject'
                      />
                  </div>
                  <button class="button-29" type='submit'>REGISTER</button>
              </form>
            </div>
          </div>
       </div>
    </>
  )
}

export default CatalogAdd 
