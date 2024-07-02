import React from 'react'
import '../modaladd.css'
import { useFormik } from 'formik'
import { CloseBlack } from '../../../asset/img'
import { changeData, editUser } from '../../../state/Modal/modalSlice'
import { useDispatch } from 'react-redux'
import { editBookCatalog } from '../../../state/MongoDB/MongoDBSLice'


const CatalogEdit = ({data}) => {

  const dispatch = useDispatch()
  const onSubmit = () => { 
       dispatch(editBookCatalog({data:values,_id:data[0]._id}))
       dispatch(editUser())
       dispatch(changeData())
  }

  const {values, handleSubmit, handleChange, touched, error} = useFormik({
      initialValues : {
         title: `${data[0].title}`,
         author: `${data[0].author}`,
         accessionnum: `${data[0].accessionnum}`,
         isbn: `${data[0].isbn}`,
         section: `${data[0].section}`,
         classificationno: `${data[0].classificationno}`,
         subject: `${data[0].subject}`,
         type: 'Material'
      },
      onSubmit
  })

  console.log(values)
  return (
    <>
       <div className="modal-background">
          <div className="modal-container">
            <div className="title">
               <h2>EDIT CATALOG</h2>
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
                    <label htmlFor="isbn">Publisher</label>
                    <input 
                        type="text" 
                        id='isbn'
                        value={values.isbn}
                        onChange={handleChange}
                        placeholder='Enter Publisher'
                      />
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="section">Year</label>
                    <input 
                        type="text" 
                        id='section'
                        value={values.section}
                        onChange={handleChange}
                        placeholder='Enter Year'
                      />
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="classificationno">Date AQ</label>
                    <input 
                        type="text" 
                        id='classificationno'
                        value={values.classificationno}
                        onChange={handleChange}
                        placeholder='Enter Date Acquired'
                      />
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="subject">ISBN</label>
                    <input 
                        type="text" 
                        id='subject'
                        value={values.subject}
                        onChange={handleChange}
                        placeholder='Enter ISBN No.'
                      />
                  </div>
                  <button class="button-29" style={{paddingLeft: '30px', paddingRight: '30px'}} type='submit'>EDIT</button>
              </form>
            </div>
          </div>
       </div>
    </>
  )
}

export default CatalogEdit
