import React, { useState } from 'react'
import {  UP, DOWN, SortIcon } from '../../asset/img';
import './tablelayout.css'
import {  useDispatch, useSelector } from 'react-redux';

const TrackerMaterialTable = ({data,search}) => {

const dispatch = useDispatch()
// const [datas,setDatas] = useState([...data])
const {pageLimit} = useSelector(state => state.universal)
const [order,setOrder] = useState('ASC')

const sorting = (col) => {  
    if(order === 'ASC'){
       const sorted = data.sort((a,b)=>{
        return a[col].toString().toLowerCase() > b[col].toString().toLowerCase() ? 1 : -1
       }) 
      //  setDatas(sorted)
       setOrder('DSC')
    }else if(order === 'DSC'){
       const sorted = data.sort((a,b)=>{
        return a[col].toString().toLowerCase() < b[col].toString().toLowerCase() ? 1 : -1
       }) 
      //  setDatas(sorted)
       setOrder('ASC')
    }
    
}

const {page} = useSelector(state => state.universal)

let currentPage = page
const [dataPerPage, setDataPerPage] = useState(10)

const lastDataIndex = currentPage * pageLimit
const firstDataIndex = lastDataIndex - pageLimit
const currentData = search === '' ?  data.slice(firstDataIndex,lastDataIndex) : data

return (
  <table className='content-table'>
   <thead>
          <tr>
          <th>
         <div className="th-title">
           ACC. NO
           <div className="sort-btn" onClick={() => {sorting('name')}}>
               <img src={SortIcon} alt="sort" />
            </div>
          </div>
           </th>
          <th>
           <div className="th-title">
            TITLE
           <div className="sort-btn" onClick={() => {sorting('id')}}>
                  <img src={SortIcon} alt="sort" />
            </div> 
           </div>
          </th>
          <th>AUTHOR</th>
          <th>
           <div className="th-title">
           PUBLISHER
           <div className="sort-btn" onClick={() => {sorting('email')}}>
                     <img src={SortIcon} alt="sort" />
            </div>
          </div> 
          </th>
          <th>YEAR</th>
          <th>DATE ACQUIRED</th>
          <th>ISBN</th>
          <th>TYPE</th>
          <th>STATUS</th>
          <th>DATE</th>
       </tr>
   </thead>
   <tbody>
   { 
            currentData.filter((item)=> {
               return search.toLowerCase() === '' ?
                item : item.data.title.toLowerCase().includes(search) 
            }).map((item) => (
                <tr key={item.data._id}>
                   <td>{item.data.accessionnum}</td>  
                   <td>{item.data.title}</td>
                   <td>{item.data.author}</td> 
                   <td>{item.data.publisher}</td>
                   <td>{item.data.year}</td>
                   <td>{item.data.dateacquired}</td>
                   <td>{item.data.isbn}</td>
                   <td>{item.type}</td>
                   <td>{item.status}</td>
                   <td>{item.yearinfo.completeInfo}</td>
                </tr>
            ))
           }
   </tbody>
  </table>
)
}

export default TrackerMaterialTable
