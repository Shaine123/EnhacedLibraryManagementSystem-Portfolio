import React, { useEffect, useState } from 'react'
import {useFormik } from 'formik'
import { loginSchema } from '../../utils/formSchema'
import { LeftArrow, NorsuLogo, Worm } from '../../asset/img'
import './login.css'
import Signup from '../Signup/Signup'
import { controlAccount, newMessage } from '../../state/Account/accountSlice'
import {useDispatch , useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { setAccessControl, userLogin } from '../../state/Universal/universalSlice'
import MainCard from '../../components/ModalUI/Card/MainCard'
const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate() 

  const { accountExist, accountMessage } = useSelector((state)=> state.account)
  const { accessControl } = useSelector((state) => state.universal)
  const [userData,setUserData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3002/getUsers')
    .then(res => {
        setUserData(res.data)
    })
  },[])

  const onSubmit = () => {

    axios.put('http://localhost:3002/updateCurrentAccess', {
      name: 'admin',
      id: 'default',
      uri: 0,
      accessLevel: true
   })
   .then((res) => {console.log(res)})
   .catch((err) => {console.log(err)})

    const exist = userData.filter((item) => {
        return item.username == values.name
    })
    
    if(exist.length > 0) {
      axios.put('http://localhost:3002/updateUser', {
        id: exist[0]._id,
        username: exist[0].username ,
        password: exist[0].password ,
        date:  exist[0].date,
        image: exist[0].image ,
        newImage: exist[0].newImage ,
        admincode: exist[0].admincode ,
        accessLevel: exist[0].accessLevel,
        status: true
     }).then((res) => console.log(res))
     .catch((err) => console.log(err))
    }
    axios.get(`http://localhost:3002/findUser/${values.name}`)
    .then(res => {
      if(res.data === null){  
        console.log('value null')
       }else if(res.data.password == values.password){
         dispatch(newMessage({message: '',error: false}))
         dispatch(userLogin({data: res.data}))
          navigate('/main')
       }else{
        dispatch(newMessage({message: 'Password is Incorrect',error: true}))
       }
      
      } 
    
    )
    .catch(err => console.log(err))
    
 
  }
  const {values,errors, handleChange, handleSubmit} = useFormik({
     initialValues: {
        name: "",
        password: ""
     },
     validationSchema: loginSchema,
     onSubmit
  })
  

  const buttonClick = () => {

  }
 

  
  return (
    <div className="login-page">
        <div className="login-details-container">
        <div className='login-illustration'>
          
          </div>
          <div className="login-details">
              <div className="logo-title">
                <div className='logo-container'>
                  <img src={Worm} alt='worm'/>
                </div>
                <h2>Library System</h2>
              </div>
              <h1>Welcome Back!</h1>
              <p>Welcome to our library , a sancatuary for curious minds and avid readers. Within these walls, the scent of knowledge mingles with the hushed whispers of stories waiting to be explored. Here, every book is a portal to adventure, elightment , and new perspectives. Whether you seek the thrill of fiction or the wisdom of non-fiction, our shelves hold a treasure trove of posibilities.</p>
              <div className="norsu-container">
                  <img src = {NorsuLogo} alt='norsulogo'/>
              </div>
          </div>
        </div>
        <div className="login-main">
          { accessControl == true ? accountExist ?
             <Signup haveAccount = {buttonClick}/> : <div className="form-container">
                <div className='backBtn' onClick={() => {dispatch(setAccessControl({state: false}))}}> 
                   <img src={LeftArrow} alt='arr'/>
                </div>
            <h1>Please Enter Your Login Details</h1>
              <form className='login-form' onSubmit={handleSubmit}>
                  <label htmlFor='name'>Account</label>
                  <input
                    value={values.name}
                    onChange={handleChange}
                    type='text'
                    id='name'
                    placeholder='Enter Name'
                    className={errors.name ? "input-error" : "input-passsed"}
                  />
                  {errors.name ? <p className='error-msg'>{errors.name}</p> : '' }
                  <label htmlFor='password'>Password</label>
                  <input
                    value={values.password}
                    onChange={handleChange}
                    type='password'
                    id='password'
                    placeholder='Enter Password'
                    className={errors.password ? "input-error" : "input-passsed"}
                  />
                  {errors.password ? <p className='error-msg'>{errors.password}</p> : ''}
                  {accountMessage.error ? <p className='error-msg'>{accountMessage.message}</p>  : ''}     
                
                   <button type='submit' className='btn-form'> Login </button>
                </form>
                <div className="sign-up">
                    <p>Don't have an account</p>
                    <button onClick={()=>{dispatch(controlAccount())}}>Register</button>
                </div>
           </div> 
             : <MainCard/>
          }
       
        </div>
    </div>
  )
}

export default Login
