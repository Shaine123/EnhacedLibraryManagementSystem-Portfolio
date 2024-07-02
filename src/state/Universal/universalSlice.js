import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useState } from "react";

const universalSlice = createSlice({
   name: 'universal',
   initialState: {
      minimize: false,
      page: 1,
      type: 'Student',
      scanned: false,
      purpose: 'Study',
      manualPrint: [],
      allInfo :  [],
      pageType: '',
      processFinished: false,
      loggedUser: [],
      tableInfo: '',
      newPrintData: [],
      pageLimit: 10,
      upRec: false,
      refresh: true,
      firstTime: true,
      bookScanned: false,
      accessControl: false  // if false  public access and if true admin access
   },
   reducers: {
       minimizeIcons : (state) => {
           state.minimize = !state.minimize
       },
       userLogin: (state , {payload}) =>{
          state.loggedUser = payload.data
       },
       resetPage: (state) => { 
          state.page = 1
       },
       changePage : (state, {payload}) => {
           const {pages, type} = payload
           if(type !== state.pageType){ 
            if(pages == 'next'){
                state.page = state.page + 1
               }else if(pages == 'prev'){
                state.page = state.page - 1
               }
           }else{
              state.pageType = type
              state.page = 1
              if(pages == 'next'){
                // console.log(state.page)
                state.page = state.page + 1
               }else if(pages == 'prev'){
                state.page = state.page - 1
               }
           }

           if(type === 'number'){
             state.page = pages
             state.type = type
           }
          
       },
     controlScanner: (state) => {
         state.scanned = !state.scanned
     },
     setPurpose : (state,{payload}) => { 
         state.purpose = payload.data
       
     },
     setDataBasis: (state, {payload}) => {
          const {data} = payload
          state.allInfo = [...data]
     },
     printInfo: (state,{payload}) => {
     const {check,data} = payload
         if(check === true){
            state.manualPrint.push(state.allInfo.find(item => item._id == data))
         }else if(check === false){
            if(data === 'delete'){
                state.manualPrint = []
            }else{
            state.manualPrint = state.manualPrint.filter(item => item._id != data)
            }
         }
     },
    clearPrintData: (state) => {
          state.manualPrint = []
    },
    processStatus: (state) =>{
         state.processFinished = !state.processFinished
    },
    newPrintTable: (state, {payload}) => {
        state.tableInfo = payload.data
    },
    setPageLimit: (state,{payload}) => {
         state.pageLimit = payload.limit
    },
    setUpRec: (state,{payload}) => {
         state.upRec = payload.update
    },
    setAccessControl: (state,{payload}) => {
        console.log('accc')
        console.log(payload.state)
       state.accessControl =  payload.state
    //    state.refresh = false
    },
    setFirstTime: (state) => {
         state.firstTime = !state.firstTime
    },
    setBookScanned: (state) => {
         state.bookScanned = !state.bookScanned
    }
   }
})
export const {
      minimizeIcons,
      changePage,
      controlScanner,
      setPurpose,
      printInfo,
      setDataBasis,
      clearPrintData,
      processStatus ,
      userLogin,
      newPrintTable,
      resetPage,
      setPageLimit,
      setUpRec,
      setAccessControl,
      setFirstTime,
      setBookScanned
    } = universalSlice.actions

export default universalSlice.reducer