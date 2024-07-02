import React, { useState } from 'react'
import {  UP, DOWN, SortIcon } from '../../asset/img';
import './tablelayout.css'
import {  useDispatch, useSelector } from 'react-redux';

const TrackerTable = ({header,search, data}) => {


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


  return (
       <table className='content-table'>
        <thead>
           {header.map((item) => (
               <tr>
               <th>
              <div className="th-title">
                {item.name}
                <div className="sort-btn" onClick={() => {sorting('name')}}>
                         <img src={SortIcon} alt="sort" />
                 </div>
               </div>
                </th>
               <th>
                <div className="th-title">
                 {item.id}
                <div className="sort-btn" onClick={() => {sorting('id')}}>
                         <img src={SortIcon} alt="sort" />
                 </div> 
                </div>
               </th>
               <th>{item.course}</th>
               <th>
                <div className="th-title">
                {item.yearlevel}
                <div className="sort-btn" onClick={() => {sorting('email')}}>
                    <img src={SortIcon} alt="sort" />
                 </div>
               </div> 
               </th>
               <th>{item.gender}</th>
               <th>{item.type}</th>
               <th>Purpose</th>
               <th>{item.login}</th>
               <th>{item.date}</th>
            </tr>
           ))}
        </thead>
        <tbody>
           { 
            currentData.filter((item)=> {
               return search.toLowerCase() === '' ?
                item : item.data.studentname.toLowerCase().includes(search) 
            }).map((item) => (
                <tr key={item.data._id}>
                   {item.data.studentname === '' ?    <td>{item.data.name }</td> :  <td>{item.data.studentname }</td>}  
                   <td>{item.data.studentid}</td>
                   <td>{item.data.course}</td> 
                   <td>{item.data.yearlevel}</td>
                   <td>{item.data.gender}</td>
                   <td>User</td>
                   <td>{item.purpose}</td>
                   <td>{item.status}</td>
                   <td>{item.yearinfo.completeInfo}</td>
                </tr>
            ))
           }
        </tbody>
       </table>
  )
}

export default TrackerTable
