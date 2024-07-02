import React, { useState } from 'react'
import { Edit, Delete, QR, UP, DOWN, SortIcon, ActionIcon, EyeIcon2 } from '../../asset/img';
import './tablelayout.css'
import {  useDispatch, useSelector } from 'react-redux';
import { deleteBookAccession} from '../../state/MongoDB/MongoDBSLice';
import { changeData, generateQR, showBookDetails } from '../../state/Modal/modalSlice';
import { printInfo, setDataBasis } from '../../state/Universal/universalSlice';

const AccessionTable = ({search, data, onEdit,createQR, selectAll, onView}) => {


const dispatch = useDispatch()
const [datas,setDatas] = useState([...data])
const {pageLimit} = useSelector(state => state.universal)
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

const lastDataIndex = currentPage * pageLimit
const firstDataIndex = lastDataIndex - pageLimit
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
                Acc. No.
                <div className="sort-btn" onClick={() => {sorting('accessionnum')}}>
                       <img src={SortIcon} alt="sort" />
                 </div>
               </div>
                </th>
               <th>
                <div className="th-title">
                 Title
                <div className="sort-btn" onClick={() => {sorting('title')}}>
                       <img src={SortIcon} alt="sort" />
                 </div> 
                </div>
               </th>
               <th>Author</th>
               <th>
                <div className="th-title">
                Publisher
                <div className="sort-btn" onClick={() => {sorting('publisher')}}>
                      <img src={SortIcon} alt="sort" />
                 </div>
               </div> 
               </th>
               <th>Year</th>
               <th>Date Acquired</th>
               <th>ISBN</th>
               <th>TYPE</th>
               <th>ACTIONS</th>
            </tr>
        </thead>
        <tbody>
           {
            currentData.filter((item)=> {
               return search.toLowerCase() === '' ?
                item : item.title.toLowerCase().includes(search) 
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
                     {item.accessionnum}
                  </td>
                   <td>{item.title}</td>
                   <td>{item.author}</td>
                   <td>{item.publisher}</td>
                   <td>{item.year}</td>
                   <td>{item.dateacquired}</td>
                   <td>{item.isbn}</td>
                   <td>{item.typeOfMaterial}</td>
                   <td>
                   <button className="action-btn" onClick={()=>{handleAction(item._id)}}>  
                       <img src={ActionIcon } alt="action" />
                    </button>
                    {
                         item._id == action ?
                         <div className="action-container" style={{height: '150px'}}>
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
                                  dispatch(deleteBookAccession({data : item._id}))
                                 setTimeout(() =>{
                                    dispatch(changeData())
                                 },[500])
                              }}>
                               <img src={Delete} alt="" />
                                  <p>Delete</p>
                              </li>
                              <li onClick={() => {
                                   dispatch(showBookDetails())
                                   onView(item._id)
                              }}>
                                 <img src={EyeIcon2} alt="eye" />
                                  <p>View</p>
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

export default AccessionTable
