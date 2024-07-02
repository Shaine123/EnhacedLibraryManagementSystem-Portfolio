import React from 'react'
import '../modaladd.css'
import { useFormik } from 'formik'
import { CloseBlack } from '../../../asset/img'
import { changeData, editUser, registerUser } from '../../../state/Modal/modalSlice'
import { useDispatch } from 'react-redux'
import { editBookCatalog, editStationaryDatabase } from '../../../state/MongoDB/MongoDBSLice'


const StationaryEdit = ({data}) => {

  const dispatch = useDispatch()
  const onSubmit = () => { 
       dispatch(editStationaryDatabase({data:values,_id:data[0]._id}))
       dispatch(editUser())
       dispatch(changeData())
  }
  console.log(data)

  const {values, handleSubmit, handleChange, touched, error} = useFormik({
      initialValues : {
         itemName: data[0].itemName,
         itemID: data[0].itemID,
         category: data[0].category,
         brand: data[0].brand,
         model: data[0].model,
         quantity: data[0].quantity,
         condition: data[0].condition,
         purchaseDate: data[0].purchaseDate,
         type: 'Stationary'
      },
      onSubmit
  })

  console.log(values)
  return (
    <>  
       <div className="modal-background">
          <div className="modal-container" style={{maxHeight: '500px'}}>
            <div className="title">
               <h2>NEW ITEM</h2>
                <button className="close" onClick={()=>{dispatch(editUser())}}>
                 <img src={CloseBlack} alt="closeIcon" />
                </button>
            </div>
            <div className="body">
              <form  className="modal-form" onSubmit={handleSubmit}>
                  <div className='modal-field'>
                    <label htmlFor="itemName">Item Name / Description</label>
                    <input 
                      value={values.itemName}
                      onChange={handleChange}
                      type="text" 
                      placeholder='Enter Item Name / Description'
                      id='itemName'
                      />
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="itemID">Item ID</label>
                     <input 
                        type="text" 
                        id='itemID'
                        value={values.itemID}
                        onChange={handleChange}
                        placeholder='Enter Item ID'
                      />
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="category">Category</label>
                      <select name="category" id="category" onChange={handleChange}>
                        <option value="">Select Category</option>
                        <option value="Machine">Machine</option>
                        <option value="Paper">Paper</option>
                        <option value="Others">Others</option>
                      </select>
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="brand">Brand</label>
                    <input 
                        type="text" 
                        id='brand'
                        value={values.brand}
                        onChange={handleChange}
                        placeholder='Enter Brand'
                      />
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="model">Model</label>
                    <input 
                        type="text" 
                        id='model'
                        value={values.model}
                        onChange={handleChange}
                        placeholder='Enter Model'
                      />
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="quantity">Quantity</label>
                    <input 
                        type="number" 
                        id='quantity'
                        value={values.quantity}
                        onChange={handleChange}
                        placeholder='Enter Quantity'
                      />
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="condition">Condition</label>
                      <select name="condition" id="condition" onChange={handleChange}>
                        <option value="">Select Condition</option>
                        <option value="New">New</option>
                        <option value="Refurbished">Refurbished</option>
                        <option value="Pre-Owned">Pre-Owned</option>
                        <option value="Damaged">Damaged</option>
                        <option value="Faulty">Faulty</option>
                        <option value="Missing Parts">Missing Parts</option>
                        <option value="Good">Good</option>
                        <option value="Poor">Poor</option>
                      </select>
                  </div>
                  <div className='modal-field'>
                    <label htmlFor="purchaseDate">Purchase Date</label>
                    <input 
                        type="date" 
                        id='purchaseDate'
                        value={values.purchaseDate}
                        onChange={handleChange}
                        placeholder='Enter Purchase Date'
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

export default StationaryEdit
