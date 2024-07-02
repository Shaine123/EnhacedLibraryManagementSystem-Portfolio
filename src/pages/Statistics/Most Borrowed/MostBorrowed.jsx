import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Carret1, Notification, Profile1, Profile2, Profile3, Profile4 } from '../../../asset/img'
import { Link } from 'react-router-dom'
import './mostBorrowed.css'
import axios from 'axios'
import StatMostBorrowTable from '../../../layout/table/StatMostBorrowTable'

const MostBorrowed = () => {

  const {loggedUser,tableInfo} = useSelector(state => state.universal)
  const [userLogs, setUserLogs] = useState([loggedUser])
  const [data,setData] = useState([])
  const [books,setBook] = useState([])
  const [newBook,setNewBook] = useState([])
  const [activeProfile, setActiveProfile] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:3002/getBook')
    .then(res => {
        setData(res.data)
    }).catch(err => console.log(err))

    axios.get('http://localhost:3002/getMostBorrowedBook')
    .then(res => {
        setBook(res.data)
        setNewBook(res.data)
    }).catch(err => console.log(err))
   
  },[])
 
  if(newBook.length > 0){
      console.log(newBook)
  }
  const [month,setMonth] = useState('All')
  const [open,setOpen] = useState(false)
  const handleClick = (month) => {
      setMonth(month)
      setOpen(item => !item)
  }

  const openDropdown = () => {
    setOpen(item => !item)
  }



  const bookInfo = books.map((item) => {
    let temp = data.filter((val) => {
      return val.title == item.name
   })
     if(temp.length > 0){
        return {
            ...temp[0],
            ...item
        }
     }
 })
console.log(bookInfo)

  
  return (
    <>
       <nav className='dash-container'> 
       <h1>List of Most Borrowed Book</h1>
        <div className='dash-control'>
             {/* <div className="notif-container">
               <img src={Notification} alt="notif" />
             </div> */}
           <div className={`profile-main ${activeProfile ? `min-bubble` : ''}`} onClick={()=>{setActiveProfile(item => !item)}}>
            <div className='profile-container '>
                <div className="img-container">
                {
                      userLogs.map((item) => {
                         return ( 
                          item.image === 'Profile1' ?
                          <img src={Profile1} alt="prof1" /> : 
                          item.image == 'Profile2' ? 
                          <img src={Profile2} alt="prof2" /> :
                           item.image == 'Profile3' ? 
                           <img src={Profile3} alt="prof3" /> :
                           item.image == 'Profile4' ? 
                           <img src={Profile4} alt="prof3" /> :
                                  ''
                         )
                      })
                  }
                </div>
             </div>
             <div className={`profile-control `}>
              <Link className='dash-opt'  to={'/main/account'}>Profile</Link>
              <Link className='dash-opt' to='/'>Logout</Link>
              {/* <Link className='dash-opt'>Help</Link> */}
             </div>
           </div>
          </div>
      </nav>
      <div className="title-header">
        {/* <h1>List of Most Borrowed Book</h1> */}
        <p>View the list of the most borrowed books</p>
      </div>
      <div className="statistics-control-container ">
          <div className="drop-down">
              <h3>Filter By</h3>
              <ul className={`menu  ${open ? 'active' : ''}`}>
                  <li>
                     <p onClick={openDropdown}>{month}</p>
                     <ul className={`sub-menu`}>
                        <li onClick={() => {handleClick('All')}}>All</li>
                        <li onClick={() => {handleClick('January')}}>January</li>
                        <li onClick={() => {handleClick('Febuary')}}>Febuary</li>
                        <li onClick={() => {handleClick('March')}}>March</li>
                        <li onClick={() => {handleClick('April')}}>April</li>
                        <li onClick={() => {handleClick('May')}}>May</li>
                        <li onClick={() => {handleClick('June')}}>June</li>
                        <li onClick={() => {handleClick('July')}}>July</li>
                        <li onClick={() => {handleClick('August')}}>August</li>
                        <li onClick={() => {handleClick('September')}}>September</li>
                        <li onClick={() => {handleClick('October')}}>October</li>
                        <li onClick={() => {handleClick('November')}}>November</li>
                        <li onClick={() => {handleClick('Decemeber')}}>Decemeber</li>
                     </ul>
                  </li>
                  <img src={Carret1} alt="carret"  className='carret-img'/>
              </ul>
              <button  className='filter-btn' >Filter</button>
          </div>
      </div>
      <div className="table-container">
      <h2>Most Borrowed</h2>
       <StatMostBorrowTable data = {bookInfo} month = {month}/>
      </div>
    </>
  )
}

export default MostBorrowed
