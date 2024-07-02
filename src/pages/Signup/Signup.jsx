import React, { useState } from 'react'
import './signup.css'
import { useFormik } from 'formik'
import { signupSchema } from '../../utils/formSchema'
import { controlAccount } from '../../state/Account/accountSlice'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { LeftArrow, Profile1, Profile2, Profile3, Profile4 } from '../../asset/img'
import { Link } from 'react-router-dom'
const Signup = () => {
 const dispatch = useDispatch()
 const [image,setImage] = useState({show: false, image: ''})
 const onSubmit = () => {

  axios.post('http://localhost:3002/newUser', {username : values.username, password: values.password,  admincode: values.admincode, profile:image.image } )
  .then((res) => console.log(res))
  .catch((err) => console.log(err))
  dispatch(controlAccount())

}
const [open,setOpen] = useState(false)
  const {values,handleSubmit, handleChange,touched,  errors} = useFormik({
     initialValues: {
       username: '',
       password: '',
       admincode: ''
     },
     validationSchema: signupSchema,
     onSubmit
  })

  const handleClick = () => {
     setOpen(item => !item)
  }


  const handleImage = (item) => {
    console.log(item.image)
      setImage({
         show: item.show,
         image: item.image
      })
  }

  return (
    <div className='form-container' style={{marginTop: '6rem', marginRight: '10 rem'}}>
      <div className="img-containerar" onClick={()=>{dispatch(controlAccount())}}>
          <img src={LeftArrow} alt="larrow" />
      </div>
      <h1>Please Sign Up</h1>
        <form className='signup-form' onSubmit={handleSubmit}>
            <label htmlFor='username'>Username</label>
            <input
              value={values.username}
              placeholder='Enter UserName'
              onChange={handleChange}
              type='text'
              id='username'
              className={ errors.username ? 'input-error' : 'input-passed'}
            />
            {errors.username ? <p className='error-msg'>{errors.username}</p> : ''}
            <label htmlFor='password'>Password</label>
            <input
              value={values.password}
              placeholder='Enter Password'
              onChange={handleChange}
              type='password'
              id='password'
              className={ errors.password ? 'input-error' : 'input-passed'}
            />
             {errors.password ? <p className='error-msg'>{errors.password}</p> : ''}
            <label htmlFor='admincode'>AdminCode</label>
            <input
              value={values.admincode}
              placeholder='Enter Admincode'
              onChange={handleChange}
              type='password'
              id='admincode'
              className={ errors.admincode ? 'input-error' : 'input-passed'}
            />
             {errors.admincode ? <p className='error-msg'>{errors.admincode}</p> : ''}
             <div className="defProfile-container">
                 <label htmlFor="">Profile</label>
                 <div className="custom-select" onClick={()=>{handleClick()}}>
                  {
                     image.show ? 
                     image.image === 'Profile1' ?
                     <img src={Profile1} alt="prof1" /> : 
                     image.image == 'Profile2' ? 
                     <img src={Profile2} alt="prof2" /> :
                     image.image == 'Profile3' ? 
                     <img src={Profile3} alt="prof3" /> :
                     image.image == 'Profile4' ? 
                     <img src={Profile4} alt="prof3" /> :
                     ''
                     : ''
                  }
                    {
                        image.image ? 
                        <p>{image.image}</p> :
                        <p>Select Profile</p>
                    }
                 </div>
                 <div className={`custom-dropmenu ${open ? 'openMenu' : ''}`}>
                     <ul style={open ? {height:'100px'} : {height:'10px'}}>
                        <li onClick={() => {
                           handleImage({image: 'Profile1' , show: true})
                           handleClick()
                        }}>
                            <img src={Profile1} alt="prof1" />
                            Profile 1
                        </li>
                        <li onClick={() => {
                           handleImage({image: 'Profile2' , show: true})
                           handleClick()
                        }}>
                            <img src={Profile2} alt="prof2" />
                            Profile 2
                        </li>
                        <li onClick={() => {
                           handleImage({image: 'Profile3' , show: true})
                           handleClick()
                        }}>
                            <img src={Profile3} alt="prof3" />
                            Profile 3
                        </li>
                        <li onClick={() => {
                           handleImage({image: 'Profile4' , show: true})
                           handleClick()
                        }}>
                            <img src={Profile4} alt="prof4" />
                            Profile 4 
                        </li>
                     </ul>
                 </div>
             </div>
            <button className='btn-form' type='submit'>Signup</button>
        </form>
    </div>
  )
}

export default Signup
