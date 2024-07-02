import React, { useState } from 'react'
import './mainpage.css'
import { LogoLib, Dashboard,Carret, Book , Borrowers , LoginManagerIcon , Scanner, Account ,Setting, MinimizaeArr, BookIlus, TimeManagement, DashboardColor, BookstackColor, PeopleColor, TimemanagementColor, ScannerColor, AccountColor, SettingColor, CaretWhite, BookStack, MinimizeIcon, ListIconColored, ListIcon } from '../../asset/img'
import {Link, Outlet } from 'react-router-dom'
import { clearPrintData, resetPage } from '../../state/Universal/universalSlice'
import { useDispatch, useSelector } from 'react-redux'
import { newRecord } from '../../state/Tracking/trackerSlice'
import { changeData } from '../../state/Modal/modalSlice'
const MainPage = () => {

   const [active, setActive] = useState(null)
   const [minInfo, setMinInfo] = useState(false)
   const [minimize, setMinimize] = useState(false)
   const { accessControl } = useSelector((state) => state.universal)
   
   const [mounseOver,setMouseOver] = useState(false)
   const [selected,setSelected] = useState()
   const dispatch = useDispatch()
   const handleHover = (val) => {
       setMouseOver(item => !item)
       setSelected(val)
   }
   const handleClick = (index) => {
     if(index === active){
      setActive(null)
     }
     else{
      setActive(index)
     }
   }
   const minClick = () => {
       setMinimize(val => !val)
   }
  return (
     <>
        <div className="container">
          <div className="sidebar" style={minimize ? {width : '92px'} : {width : '250px'}}>
            <div className="head">
              <div className="logo">
                <img src ={LogoLib} alt='liblogo'/>  
              </div> 
              { minimize ? '' :
                  <div className="system-detail">
                     <p className="title" >Library System</p>  
                  </div>  
              }
              <div className="min-box-container">
                <div className="min-box">
                  <img className='min-btn' src = {MinimizeIcon} alt='mini' onClick={minClick}/>
                </div>
              </div>
            </div>  
            <div className="nav">
               <div className="menu">
                 <ul>
                    {
                      accessControl ? <li className={`${active === 0 ? 'active' : ''} ${minimize ? 'minimized' : ''}`} onMouseEnter={()=>{handleHover(0)}} onMouseLeave={()=>{handleHover(0)}} 
                      onClick={()=> {handleClick(0) 
                                   //   dispatch(newRecord())
                       }}>
                         <Link className='option' to= '/main'>
                           {
                              mounseOver && selected === 0 || active === 0 ? 
                              <img src={DashboardColor} alt='dashboard'/>
                               :
                              <img src={Dashboard} alt='dashboard'/>
                           }
                            <span className={`text ${minimize ? 'minimize' : ''}`}>Dashboard</span>
                         </Link>
                         <div className="detail-box">Dashboard</div>
                      </li>
                       : ''
                    }
                    <li className={`${active === 1 && minimize === false ? 'active' : ''} ${minimize && active === 1 ? 'mini-active' : ''}  ${minimize ? 'minimized ' : ''}`} onMouseEnter={()=>{handleHover(1)}} onMouseLeave={()=>{handleHover(1)}} onClick={()=> {handleClick(1)}}>
                       <Link className='option'>
                        {
                            mounseOver && selected === 1 || active === 1  ? 
                            <img src={BookstackColor} alt='b'/>
                             :
                            <img src={BookStack} alt='b'/>
                         }
                          <span className={`text ${minimize ? 'minimize' : ''}`}>Material</span>
                          {
                            mounseOver && selected === 1 || active === 1 ?  
                            <img className='arrow' src={Carret} alt='carret' style={{marginLeft: '3.7rem'}}/>
                              :
                              <img className='arrow' src={CaretWhite} alt='carret' style={{marginLeft: '3.7rem'}}/>
                          }
                       </Link>
                       <div className={`detail-box ${minInfo ? 'sub-info sm-sub-info' : ''}`} style={minInfo ? {width: '120px' } : {width : '70px' }} onClick={()=>{setMinInfo(val => !val)}}>Material
                        <ul className= 'sub-menu'>
                         <li>
                              <Link className='option' >
                                    <span className="text">Accession</span> 
                              </Link>
                          </li>
                          <li>
                              <Link className='option'>
                                    <span className="text">Catalog</span> 
                              </Link>
                          </li>
                          {
                            accessControl ? 
                            <li>
                            <Link className='option'>
                                  <span className="text">Stationary</span> 
                             </Link>
                            </li>
                            : ''
                          }
                     
                        </ul>
                       </div>
                       <ul className= {`${accessControl ? 'sub-menu' : 'userSm'} `}>
                          <li onClick={()=>{
                             dispatch(clearPrintData())
                             dispatch(resetPage())
                             }}>
                              <Link className='option' to='/main/material/accession' >
                                    <span className="text">Accession</span> 
                              </Link>
                          </li>
                          <li onClick={()=>{
                             dispatch(clearPrintData())
                             dispatch(resetPage())
                             }}>
                              <Link className='option' to='/main/material/catalog'>
                                    <span className="text">Catalog</span> 
                              </Link>
                          </li>
                           {
                               accessControl ? 
                             <li>
                               <Link className='option' to = '/main/material/stationary'>
                                     <span className="text">Stationary</span> 
                               </Link>
                              </li>
                              : ''
                           }
                       </ul>
                    </li>
                    {
                      accessControl ?   <li className={`${active === 2 && minimize === false ? 'active' : ''} ${minimize && active === 2 ? 'mini-active' : ''}  ${minimize ? 'minimized ' : ''}`} onMouseEnter={()=>{handleHover(2)}} onMouseLeave={()=>{handleHover(2)}}  onClick={()=> {handleClick(2)}}>
                      <Link className='option'>
                       {
                           mounseOver && selected === 2 || active === 2  ? 
                           <img src={PeopleColor} alt='borrw'/>
                            :
                           <img src={Borrowers} alt='borrow'/>
                        }
                         <span className={`text ${minimize ? 'minimize' : ''}`}>Borrowers</span>
                         {
                           mounseOver && selected === 2 || active === 2 ?  
                            <img className='arrow' src={Carret} alt='carret' style={{marginLeft: '2.9rem'}}/>
                             :
                            <img className='arrow' src={CaretWhite} alt='carret' style={{marginLeft: '2.9rem'}}/>
                         }
                        
                      </Link>
                      <div className={`detail-box ${minInfo ? 'sub-info' : ''}`} style={minInfo ? {width: '120px'} : {width : '70px' }} onClick={()=>{setMinInfo(val => !val)}}>Borrowers
                       <ul className= 'sub-menu'>
                        <li>
                             <Link className='option' to= '/main/borrower/student'>
                                   <span className="text">Student</span> 
                             </Link>
                         </li>
                         <li >
                             <Link className='option' to= '/main/borrower/teacher'>
                                   <span className="text">Teacher</span> 
                             </Link>
                         </li>
                         <li>
                             <Link className='option'>
                                   <span className="text">Guess</span> 
                             </Link>
                         </li>
                       </ul>
                      </div>
                      <ul className= 'sub-menu'>
                      <li onClick={()=>{
                        dispatch(clearPrintData())
                        dispatch(resetPage())
                        dispatch(changeData())
                        }}>
                             <Link className='option' to= '/main/borrower/student'>
                                   <span className="text">Student</span> 
                             </Link>
                         </li>
                         <li onClick={()=>{
                           dispatch(clearPrintData())
                           dispatch(resetPage())
                           }}>
                             <Link className='option'  to= '/main/borrower/teacher'>
                                   <span className="text">Teacher</span> 
                             </Link>
                         </li>
                         <li onClick={()=>{
                           dispatch(clearPrintData())
                           dispatch(resetPage())
                           }}>
                             <Link className='option' to = '/main/borrower/guest'>
                                   <span className="text">Guess</span> 
                             </Link>
                         </li>
                      </ul>
                   </li>
                     : 
                     ''
                    }
                    {
                       accessControl ?          <li className={`${active === 3 && minimize === false ? 'active' : ''} ${minimize && active === 3 ? 'mini-active' : ''}  ${minimize ? 'minimized ' : ''}`} onMouseEnter={()=>{handleHover(3)}} onMouseLeave={()=>{handleHover(3)}} onClick={()=> {handleClick(3)}}>
                       <Link className='option'>
                        {
                            mounseOver && selected === 3 || active === 3  ? 
                            <img src={TimemanagementColor} alt='b'/>
                             :
                            <img src={TimeManagement} alt='b'/>
                         }
                          <span className={`text ${minimize ? 'minimize' : ''}`}>Tracker</span>
                          {
                            mounseOver && selected === 3 || active === 3 ?  
                            <img className='arrow' src={Carret} alt='carret' style={{marginLeft: '4rem'}}/>
                              :
                              <img className='arrow' src={CaretWhite} alt='carret' style={{marginLeft: '4rem'}}/>
                          }
                       </Link>
                       <div className={`detail-box ${minInfo ? 'sub-info sm-sub-info' : ''}`} style={minInfo ? {width: '120px' } : {width : '70px' }} onClick={()=>{setMinInfo(val => !val)}}>Tracker
                        <ul className= 'sm'>
                         <li>
                              <Link className='option' >
                                    <span className="text">Logins</span> 
                              </Link>
                          </li>
                          <li>
                              <Link className='option'>
                                    <span className="text">Material</span> 
                              </Link>
                          </li>
                        </ul>
                       </div>
                       <ul className= 'xl'>
                          <li onClick={()=>{
                             dispatch(resetPage())
                             }}>
                              <Link className='option' to='/main/tracker/logins' >
                                    <span className="text">Logins</span> 
                              </Link>
                          </li>
                          <li onClick={()=>{
                             dispatch(resetPage())
                             }}>
                              <Link className='option' to = '/main/tracker/material'>
                                    <span className="text">Material</span> 
                              </Link>
                          </li>
                          <li onClick={()=>{
                             dispatch(resetPage())
                             }}>
                              <Link className='option' to = '/main/tracker/teacher'>
                                    <span className="text">Logins Teacher</span> 
                              </Link>
                          </li>
                          <li onClick={()=>{
                             dispatch(resetPage())
                             }}>
                              <Link className='option' to = '/main/tracker/guest'>
                                    <span className="text">Logins Guest</span> 
                              </Link>
                          </li>
                       </ul>
                    </li>
                      : ''
                    }
                    <li className={`${active === 4 ? 'active' : ''}  ${minimize ? 'minimized' : ''}`} onMouseEnter={()=>{handleHover(4)}} onMouseLeave={()=>{handleHover(4)}} onClick={()=> {handleClick(4)}}>
                       <Link className='option' to={'/main/scanner'}>
                        {
                            mounseOver && selected === 4 || active === 4  ? 
                            <img src={ScannerColor} alt='scanner'/>
                             :
                            <img src={Scanner} alt='scanner'/>
                         }
                          <span className={`text ${minimize ? 'minimize' : ''}`}>Scanner</span>
                       </Link>
                       <div className="detail-box">Scanner</div>
                    </li>
                     {
                         accessControl ? 
                           <li className={`${active === 5 ? 'active' : ''}  ${minimize ? 'minimized' : ''}`} onMouseEnter={()=>{handleHover(5)}} onMouseLeave={()=>{handleHover(5)}} onClick={()=> {handleClick(5)}}>
                       <Link className='option' to={'/main/account'}>
                       {
                            mounseOver && selected === 5 || active === 5  ? 
                            <img src={AccountColor} alt='acc'/>
                             :
                            <img src={Account} alt='acc'/>
                         }
                          <span className={`text ${minimize ? 'minimize' : ''}`}>Account</span>
                       </Link>
                       <div className="detail-box">Account</div>
                    </li> 
                    : ''
                     }
                      {
                          accessControl ? 
                          <li className={`${active === 6 && minimize === false ? 'active' : ''} ${minimize && active === 6 ? 'mini-active' : ''}  ${minimize ? 'minimized ' : ''}`} onMouseEnter={()=>{handleHover(6)}} onMouseLeave={()=>{handleHover(6)}} onClick={()=> {handleClick(6)}}>
                          <Link className='option'>
                           {
                               mounseOver && selected === 6 || active === 6  ? 
                               <img src={ListIconColored} alt='b'/>
                                :
                               <img src={ListIcon} alt='b'/>
                            }
                             <span className={`text ${minimize ? 'minimize' : ''}`}>Statistics</span>
                             {
                               mounseOver && selected === 6 || active === 6 ?  
                               <img className='arrow' src={Carret} alt='carret' style={{marginLeft: '3.2rem'}}/>
                                 :
                                 <img className='arrow' src={CaretWhite} alt='carret' style={{marginLeft: '3.2rem'}}/>
                             }
                          </Link>
                          <div className={`detail-box ${minInfo ? 'sub-info sm-sub-info' : ''}`} style={minInfo ? {width: '120px' } : {width : '70px' }} onClick={()=>{setMinInfo(val => !val)}}>Tracker
                           <ul className= 'sub-menu'>
                            <li>
                                 <Link className='option' >
                                       <span className="text">Logins</span> 
                                 </Link>
                             </li>
                             <li>
                                 <Link className='option'>
                                       <span className="text">Material</span> 
                                 </Link>
                             </li>
                           </ul>
                          </div>
                          <ul className= 'sub-menu'>
                             {/* <li onClick={()=>{
                                dispatch(resetPage())
                                }}>
                                 <Link className='option' to='/main/statistics/activeBorrower' >
                                       <span className="text">Active Borrower</span> 
                                 </Link>
                             </li> */}
                             <li onClick={()=>{
                                dispatch(resetPage())
                                }}>
                                 <Link className='option' to = '/main/statistics/mostLogged'>
                                       <span className="text">Most Logged Student</span> 
                                 </Link>
                             </li>
                             <li onClick={()=>{
                                dispatch(resetPage())
                                }}>
                                 <Link className='option' to = '/main/statistics/mostBorrowed'>
                                       <span className="text">Most Borrowed Material</span> 
                                 </Link>
                             </li>
                          </ul>
                       </li>
                       : ''
                      }
                    {/* <li className={`${active === 7 ? 'active' : ''}  ${minimize ? 'minimized' : ''}`} onMouseEnter={()=>{handleHover(7)}} onMouseLeave={()=>{handleHover(7)}} onClick={()=> {handleClick(7)}}>
                       <Link className='option' to={'/main/setting'}>
                        {
                            mounseOver && selected === 7 || active === 7  ? 
                            <img src={SettingColor} alt='sett'/>
                             :
                            <img src={Setting} alt='sett'/>
                         }
                          <span className={`text ${minimize ? 'minimize' : ''}`}>Settings</span>
                       </Link>
                       <div className="detail-box">Scanner</div>
                    </li> */}
                 </ul>
               </div>
            </div>
          </div>  
          <div className="container-output">
            <Outlet/>
          </div>
        </div>  
     </>
  )
}

export default MainPage
