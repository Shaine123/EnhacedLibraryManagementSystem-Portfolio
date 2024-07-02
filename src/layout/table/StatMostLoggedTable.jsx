import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newPrintTable, printInfo, setDataBasis } from '../../state/Universal/universalSlice'

const StatMostLoggedTable = ({data, month}) => {
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
  // const currentData = search === '' ?  data.slice(firstDataIndex,lastDataIndex) :  data
  const sortedData = month == 'All' ? data : data.filter((item) => {return item.month == month})
  const newSortedData = sortedData.sort((a, b) => b.count - a.count)
  
  useEffect(()=>{
    dispatch(newPrintTable({data:datas}))
  },[sortData])
  
  const [checkPromp,setCheckedPromp] = useState('')
  const [checkedAll,setCheckedAll] = useState(false)
  const handleChangeAll = (e) => {
      // selectAll()
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
    
  }
  
  const [checked,setChecked] = useState([])
  const handleClick = (id) => {
     const newId = document.getElementById(id)
     const row  = document.getElementById(id + 1)
     if(checked.includes(id)){
       
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
              Name
            </div>
             </th>
            <th>
             <div className="th-title">
              Student ID
             </div>
            </th>
            <th>Course</th>
            <th>
             <div className="th-title">
             Year Level
            </div> 
            </th>
            <th>Gender</th>
            <th>College</th>
            <th>Borrow Count</th>
            <th>Month</th>
         </tr>
     </thead>
     <tbody>
        {
          sortedData.length > 0 ? 
          newSortedData.map((item) => (
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
                  {item.studentname}
               </td>
                <td>{item.studentid}</td>
                <td>{item.course}</td>
                <td>{item.yearlevel}</td>
                <td>{item.gender}</td>
                <td>{item.college}</td>
                <td style={{paddingLeft: '60px'}}>{item.count}</td>
                <td>{item.month}</td>
              
             </tr>
         ))
            : ''
 
        }
     </tbody>
    </table>
)
}

export default StatMostLoggedTable
