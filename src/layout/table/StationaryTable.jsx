import React, { useState } from 'react'
import { Edit, Delete, QR, UP, DOWN, SortIcon, ActionIcon, ViewIcon } from '../../asset/img';
import './tablelayout.css'
import {  useDispatch, useSelector } from 'react-redux';
import { deleteBookAccession, deleteStationaryDatabase} from '../../state/MongoDB/MongoDBSLice';
import { changeData, generateQR } from '../../state/Modal/modalSlice';
import { printInfo, printTable, setDataBasis } from '../../state/Universal/universalSlice';
// import { listIndexes } from '../../../../server/Schema/bookStationarySchema';

const StationaryTable = ({search, data, onEdit,createQR, selectAll}) => {


const dispatch = useDispatch()
const [datas,setDatas] = useState([...data])
const [order,setOrder] = useState('ASC')


const sorting = (col) => {  
    if(order === 'ASC'){
       const sorted = data.sort((a,b)=>{
        return a[col].toString().toLowerCase() > b[col].toString().toLowerCase() ? 1 : -1
       }) 
       setDatas(sorted)
       setOrder('DSC')
    }else if(order === 'DSC'){
       const sorted = data.sort((a,b)=>{
        return a[col].toString().toLowerCase() < b[col].toString().toLowerCase() ? 1 : -1
       }) 
       setDatas(sorted)
       setOrder('ASC')
    }
    
}

const {page} = useSelector(state => state.universal)

let currentPage = page
const [dataPerPage, setDataPerPage] = useState(10)

const lastDataIndex = currentPage * dataPerPage
const firstDataIndex = lastDataIndex - dataPerPage
const currentData = search === '' ?  data.slice(firstDataIndex,lastDataIndex) : data

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
               <tr>
               <th>
              <div className="th-title">
              <input type="checkbox" value={'checkAll'} id='printItem' onChange={handleChangeAll}   />
                Item ID
                <div className="sort-btn" onClick={() => {sorting('itemID')}}>
                       <img src={SortIcon} alt="sort" />
                 </div>
               </div>
                </th>
               <th>
                <div className="th-title">
                 Item Name/Description
                <div className="sort-btn" onClick={() => {sorting('itemName')}}>
                       <img src={SortIcon} alt="sort" />
                 </div> 
                </div>
               </th>
               <th>Category</th>
               <th>
                <div className="th-title">
                Brand
                <div className="sort-btn" onClick={() => {sorting('brand')}}>
                      <img src={SortIcon} alt="sort" />
                 </div>
               </div> 
               </th>
               <th>Model</th>
               <th>Quantity</th>
               <th>Condition</th>
               <th>Purchase Date</th>
               <th>ACTIONS</th>
            </tr>
        </thead>
        <tbody>
           {
            currentData.filter((item)=> {
               return search.toLowerCase() === '' ?
                item : item.itemName.toLowerCase().includes(search) 
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
                          <input type="checkbox" checked onChange={()=>{}}/>
                           :
                          <input 
                            type="checkbox" 
                            key={item._id} 
                            onChange={handleChangeOne}
                            id={item._id} 
                            value={item._id} 
                           />
                     }
                     {item.itemID}
                  </td>
                   <td>{item.itemName}</td>
                   <td>{item.category}</td>
                   <td>{item.brand}</td>
                   <td>{item.model}</td>
                   <td>{item.quantity}</td>
                   <td>{item.condition}</td>
                   <td>{item.purchaseDate}</td>
                   <td>
                    <button className="action-btn" onClick={()=>{handleAction(item._id)}}>  
                       <img src={ActionIcon} alt="action" />
                    </button>
                   {/* <button className='edit-btn' onClick={()=>{
                        dispatch(generateQR())
                        createQR(item._id)
                        }} >
                        <img
                           src={QR}
                           alt='Qr'
                        />
                      </button>
                      <button className='view-btn' onClick={()=>{onEdit(item._id)}}>
                         <img
                           src={Edit}
                           alt='pencila'
                         />
                      </button>
                      <button className='delete-btn' onClick = {()=>{
                          dispatch(deleteBookAccession({data : item._id}))
                          dispatch(changeData())
                      }}>
                          <img
                             src={Delete}
                             alt='pencila'
                          />
                      </button> */}
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
                                    dispatch(deleteStationaryDatabase({data : item._id}))
                                    setTimeout(() =>{
                                       dispatch(changeData())
                                    },[500])
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

export default StationaryTable
