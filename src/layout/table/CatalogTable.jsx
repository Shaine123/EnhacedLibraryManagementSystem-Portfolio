import React, { useState } from 'react'
import { Edit, Delete, QR, UP, DOWN, SortIcon, ActionIcon } from '../../asset/img';
import './tablelayout.css'
import {  useDispatch, useSelector } from 'react-redux';
import { deleteBookAccession, deleteBookCatalog} from '../../state/MongoDB/MongoDBSLice';
import { changeData, generateQR } from '../../state/Modal/modalSlice';

const CatalogTable = ({header,search, data, onEdit,createQR}) => {


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

//  console.log(datas)

const [action,setAction] = useState(true)

const handleAction = (value) => {
   if(action === value){
      setAction('')
   }else{
     setAction(value)
   }
  
}
  return (
       <table className='content-table'>
        <thead>
               <tr>
               <th>
              <div className="th-title">
                Acc. No.
                <div className="sort-btn" onClick={() => {sorting('accessionnum')}}>
                        <img src={SortIcon} alt="sort" />
                 </div>
               </div>
                </th>
               <th>
                <div className="th-title">
                 ISBN
                <div className="sort-btn" onClick={() => {sorting('isbn')}}>
                        <img src={SortIcon} alt="sort" />
                 </div> 
                </div>
               </th>
               <th>Title</th>
               <th>
                <div className="th-title">
                Author
                <div className="sort-btn" onClick={() => {sorting('author')}}>
                      <img src={SortIcon} alt="sort" />
                 </div>
               </div> 
               </th>
               <th>Section</th>
               <th>Classification No.</th>
               <th>Subject</th>
               <th>Action</th>
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
                 >
                   <td>{item.accessionnum}</td>
                   <td>{item.isbn}</td>
                   <td>{item.title}</td>
                   <td>{item.author}</td>
                   <td>{item.section}</td>
                   <td>{item.classificationno}</td>
                   <td>{item.subject}</td>
                   <td>
                     <button className="action-btn" onClick={()=>{handleAction(item._id)}}>  
                        <img src={ActionIcon } alt="action" />
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
                                    dispatch(deleteBookCatalog({data : item._id}))
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

export default CatalogTable
