import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useState } from "react";

const trackerSlice = createSlice({
   name: 'tracker',
   initialState: {
      recordLogins: 0,
      recordBooksBorrowed: 0,
      startDay: true,
      startDayBook: true,
      trackingData: [],
      timeLogs: [],
      itemType: '',
      students: [],
      studentDetails: [],
      studentStatus: true,
      studentPurpose: [],
      teacher: [],
      teacherPurpose: [],
      teacherDetails: [],
      guest: [],
      guestPurpose: [],
      guestDetails: [],
      materials: [],
      recorded: true,
      logsControllerMaterial: false,
      logsControllerStudent: false,
      logsControllerStationary: false,
      newDay: true,
   },
   reducers : {
      controlTracking : (state,{payload}) => {
        state.trackingData = [...state.trackingData,{time:payload.time, datas: payload.data}]
        state.timeLogs = [...state.timeLogs,{time: payload.time, type: payload.type}]
        state.itemType = payload.type
      },
      keepTrack:  (state,{payload}) => {
          console.log('keeptrack')
          console.log(payload.out)
         if(state.itemType == 'User'){

            if(state.students.includes(payload.out.data)){
               if(state.students.length <= 1) {
                  state.students = []
                  state.studentPurpose = []
               }else{
                  state.students = state.students.filter((value) => {
                   return value   !== payload.out.data
                })
                  state.studentPurpose = state.studentPurpose.filter((value) => {
                       return value.name !== payload.name
                  })
               }
             }else{
               // axios.post('http://localhost:3002/addCurrentLogStudent', {
               //    id: payload.out.data
               // }).then(res => console.log(res))
               // .catch(err => console.log(err))
                state.students = [...state.students, payload.out.data]
                state.studentPurpose = [...state.studentPurpose, {purpose: payload.purpose, name: payload.name}]
                state.recordLogins = state.recordLogins + 1
             }

         }else if(payload.out.type == 'Material'){
            console.log('material')
            if(state.materials.includes(payload.out.data)){
               if(state.materials.length <= 1) {
                  state.materials = []
               }else{
                 state.materials = state.materials.filter((value) => {
                   return value != payload.out.data
                })
               }
             }else{
                state.materials = [...state.materials, payload.out.data]
                state.recordBooksBorrowed = state.recordBooksBorrowed + 1
             }
         }else if(state.itemType == 'teacher'){
            if(state.teacher.includes(payload.out.data)){
               if(state.teacher.length <= 1) {
                  state.teacher = []
                  state.teacherPurpose = []
                  state.students = []
                  state.studentPurpose = []
               }else{
                  state.teacher = state.teacher.filter((value) => {
                   return value   !== payload.out.data
                })
                  state.teacherPurpose = state.teacherPurpose.filter((value) => {
                       return value.name !== payload.name
                  })

                  state.students = state.students.filter((value) => {
                     return value   !== payload.out.data
                  })
                    state.studentPurpose = state.studentPurpose.filter((value) => {
                         return value.name !== payload.name
                    })
               }
             }else{
               // axios.post('http://localhost:3002/addCurrentLogStudent', {
               //    id: payload.out.data
               // }).then(res => console.log(res))
               // .catch(err => console.log(err))
                state.teacher = [...state.teacher, payload.out.data]
                state.teacherPurpose = [...state.teacherPurpose, {purpose: payload.purpose, name: payload.name}]
                state.recordLogins = state.recordLogins + 1

                state.students = [...state.students, payload.out.data]
                state.studentPurpose = [...state.studentPurpose, {purpose: payload.purpose, name: payload.name}]
                state.recordLogins = state.recordLogins + 1
             }
         }else if(state.itemType == 'guest'){
            console.log('guest')

            if(state.guest.includes(payload.out.data)){
               if(state.guest.length <= 1) {
                  state.guest = []
                  state.guestPurpose = []

                  state.students = []
                  state.studentPurpose = []
               }else{
                  state.guest = state.guest.filter((value) => {
                   return value   !== payload.out.data
                })
                  state.guestPurpose = state.guestPurpose.filter((value) => {
                       return value.name !== payload.name
                  })

                  state.students = state.students.filter((value) => {
                     return value   !== payload.out.data
                  })
                    state.studentPurpose = state.studentPurpose.filter((value) => {
                         return value.name !== payload.name
                    })
               }
             }else{
                state.guest = [...state.guest, payload.out.data]
                state.guestPurpose = [...state.guestPurpose, {purpose: payload.purpose, name: payload.name}]
                state.recordLogins = state.recordLogins + 1

                
                state.students = [...state.students, payload.out.data]
                state.studentPurpose = [...state.studentPurpose, {purpose: payload.purpose, name: payload.name}]
                state.recordLogins = state.recordLogins + 1
             }
         }
  
      },
      deleteTracking: (state,{payload}) => {
          axios.delete(`http://localhost:3002/deleteCurrentLogStudent/${payload.id}`)
          .then(res => console.log(res))
          .catch(err => console.log(err))
      },
      logsCompletedMaterial: (state) => {
        state.logsControllerMaterial = !state.logsControllerMaterial
      },
      logsCompletedStudent: (state) => {
        state.logsControllerStudent = !state.logsControllerStudent
      },
      logsCompletedStationary: (state) => {
         state.logsControllerStationary = !state.logsControllerStationary
       },
      beginDay: (state) => {
          state.startDay = !state.startDay
      },
      beginBookDay: (state) => {
          state.startDayBook = !state.startDayBook
      },
      placeStudentDetails: (state,{payload}) => {
          const {name , course ,purpose, college, id} = payload

          state.studentDetails.push({
             id: id,
             name: name,
             course: course,
             purpose: purpose,
             college: college
          })
      },
      removeStudentDetails: (state,{payload}) => {
          state.studentDetails = state.studentDetails.filter((item)=>{
              return item.id !== payload.id
          })
      },
      setStudentStatus: (state,{payload}) => {
          state.studentStatus = payload.status
      },
      placeTeacherDetails: (state,{payload}) => {
         const {name , contact ,purpose, email, id} = payload
        console.log(payload)
         state.teacherDetails.push({
            id: id,
            name: name,
            phone: contact,
            email: email,
            purpose: purpose
         })
      },
      placeGuestDetails: (state,{payload}) => {
         const {name , phone ,purpose, email, id} = payload

         state.guestDetails.push({
            id: id,
            name: name,
            phone: phone,
            purpose: purpose,
            email: email
         })
      },
      removeGuestDetails: (state, {payload}) => {
         state.guestDetails = state.guestDetails.filter((item)=>{
            return item.id !== payload.id
        })
      },
      removeTeacherDetails: (state,{payload}) => {
         state.teacherDetails = state.teacherDetails.filter((item)=>{
            return item.id !== payload.id
        })
      },
      newRecord: (state) => {
          state.recorded = !state.recorded
      },
      setNewDay: (state, {payload}) => {
          state.newDay =  payload.status
      }
   }
})

export const {
       controlTracking , 
       keepTrack,
       deleteTracking,
       userGetData,
       logsCompletedMaterial,
       logsCompletedStudent,
       beginDay,
       beginBookDay,
       placeStudentDetails,
       removeStudentDetails,
       placeTeacherDetails,
       removeTeacherDetails,
       placeGuestDetails,
       removeGuestDetails,
       setStudentStatus,
       newRecord,
       setNewDay,
       logsCompletedStationary
      } = trackerSlice.actions
export default trackerSlice.reducer