import React, { useEffect, useState } from 'react'
import { Edit, Delete, QR, UP, DOWN, SortIcon, ActionIcon, EyeIcon2 } from '../../asset/img';
import './tablelayout.css'
import {  useDispatch, useSelector } from 'react-redux';
import { deleteStudent } from '../../state/MongoDB/MongoDBSLice';
import { changeData, generateQR, showBookDetails } from '../../state/Modal/modalSlice';
import { newPrintTable, printInfo, printTable, setDataBasis } from '../../state/Universal/universalSlice';
import { useRef } from 'react';

const TableLayout = ({header,search, data, onEdit, createQR,selectAll, perPage}) => {

const dispatch = useDispatch()
const [datas,setDatas] = useState([...data])
const [order,setOrder] = useState('ASC')
const [sortData,setSortData] = useState(false)
const {pageLimit} = useSelector(state => state.universal)


const sorting = (col) => {  
   if(order === 'ASC'){
      let sorted = data.sort((a,b)=>{
       return a[col].toString().toLowerCase() > b[col].toString().toLowerCase() ? 1 : -1
      }) 
      setDatas(sorted)
      setSortData(true)
      setOrder('DSC')
   }else if(order === 'DSC'){
      let sorted = data.sort((a,b)=>{
       return a[col].toString().toLowerCase() < b[col].toString().toLowerCase() ? 1 : -1
      }) 
      setDatas(sorted)
      setSortData(true)
      setOrder('ASC')
   }
}


const {page} = useSelector(state => state.universal)

let currentPage = page
const [dataPerPage, setDataPerPage] = useState(pageLimit)
const lastDataIndex = currentPage * pageLimit
const firstDataIndex = lastDataIndex - pageLimit
const currentData = search === '' ?  data.slice(firstDataIndex,lastDataIndex) :  data
useEffect(()=>{
  dispatch(newPrintTable({data:datas}))
},[sortData])

const [checkPromp,setCheckedPromp] = useState('')
const [checkedAll,setCheckedAll] = useState(false)
const handleChangeAll = (e) => {
    selectAll()
    dispatch(printInfo({check: false, data: 'delete'}))
    const {value,checked} = e.target
    if(checked == true){
      setCheckedPromp(value)
      setCheckedAll(true)
      if(value == 'checkAll'){   
         //  dispatch(changeData())
      }
    }else{
      setCheckedAll(false)
      if(value == 'checkAll'){   
         // dispatch(changeData())
         setCheckedPromp('')
     }
    }
}

const handleChangeOne = (e) => {
    const {value,checked} = e.target
     dispatch(setDataBasis({data: data}))
     dispatch(printInfo({check: checked, data: value}))
}

const [action,setAction] = useState(true)

const handleAction = (value) => {
   if(action === value){
      setAction('')
   }else{
     setAction(value)
   }
   console.log(value)
}

const [checked,setChecked] = useState([])
const handleClick = (id) => {
   const newId = document.getElementById(id)
   const row  = document.getElementById(id + 1)
   if(checked.includes(id)){
       console.log('true')
       setChecked((item) => {
           return item.filter((val) => {
              return val !== id
           })
       })
       row.classList.remove('checkedBox')
       newId.checked = false
       dispatch(setDataBasis({data: data}))
       dispatch(printInfo({check: false, data: id}))
   }else{
      newId.checked = true
      dispatch(setDataBasis({data: data}))
      dispatch(printInfo({check: true, data: id}))
      setChecked((item) => {
           return [...item,id]
      })
      row.classList.add('checkedBox')
   }
   console.log(checked)
}  

  return (
       <table className='content-table'>
        <thead>
           {header.map((item) => (
               <tr>
               <th>
              <div className="th-title">
               <input type="checkbox" value={'checkAll'} id='printItem' onChange={handleChangeAll}   />
                {item.name}
                <div className="sort-btn" onClick={() => {sorting('studentname')}}>
                        <img src={SortIcon} alt="sort" />
                 </div>
               </div>
                </th>
               <th>
                <div className="th-title">
                 {item.studentid}
                <div className="sort-btn" onClick={() => {sorting('studentid')}}>
                     <img src={SortIcon} alt="sort" />
                 </div> 
                </div>
               </th>
               <th>
               <div className="th-title">
                {item.course}
                <div className="sort-btn" onClick={() => {sorting('course')}}>
                      <img src={SortIcon} alt="sort" />
                 </div>
               </div>
               </th>
               <th>{item.yearlevel}</th>
               <th>{item.gender}</th>
               <th>{item.college}</th>
               <th>{item.status}</th>
               <th>ACTIONS</th>
            </tr>
           ))}
        </thead>
        <tbody>
           {
             currentData.filter((item)=> {
               return search.toLowerCase() === '' ?
                item : item.studentname.toLowerCase().includes(search) 
            }).map((item) => (
                <tr  
                   key={item._id} 
                   onClick={() => { handleClick(item._id)}}  
                   id={item._id + 1}
                   className={`${checkedAll ? 'checkedBox' : ''}`}
                   >
                  <td style={{display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px'}}>
                     {
                        checkPromp == 'checkAll' ? 
                          <input type="checkbox"  checked onChange={()=>{}}/>
                           :
                          <input 
                            type="checkbox" 
                            key={item._id} 
                            id={item._id} 
                            onChange={handleChangeOne}
                           //  checked = {checked == item._id ? true : false}
                            value={item._id} />
                     }
                     {item.studentname}
                  </td>
                   <td>
                     {item.studentid}
                   </td>
                   <td>{item.course}</td>
                   <td>{item.yearlevel}</td>
                   <td>{item.gender}</td>
                   <td>{item.college}</td>
                   <td>{item.status}</td>
                   <td>
                   <button className="action-btn" onClick={()=>{handleAction(item._id)}}>  
                       <img src={ActionIcon} alt="action" />
                    </button>
                    {
                         item._id == action ?
                         <div className="action-container">
                           <ul>
                              <li onClick={()=>{
                                 dispatch(generateQR())
                                 createQR(item._id)
                              }}>
                                 <img src={QR} alt="" />
                                  <p>Gen QR</p>
                              </li>
                              <li onClick={()=>{onEdit(item._id)}}>
                                 <img src={Edit} alt="" />
                                  <p>Edit</p>
                              </li>
                              <li onClick = {()=>{
                                 dispatch(deleteStudent({data : item._id}))
                                 dispatch(changeData())
                              }}>
                               <img src={Delete} alt="" />
                                  <p>Delete</p>
                              </li>
                           </ul>
                         </div>
                         :
                         ''
                      }
                     </td>
                </tr>
            ))
   
           }
        </tbody>
       </table>
  )
}

export default TableLayout
