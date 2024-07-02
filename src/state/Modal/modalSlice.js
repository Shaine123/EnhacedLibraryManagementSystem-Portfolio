import {createSlice } from "@reduxjs/toolkit";


const modalSlice = createSlice({
   name: 'modal',
   initialState: {
      isRegistering: false,
      isEditing: false,
      openQR: false,
      dataChange: false,
      bookDetails: false
   },
   reducers: {
       registerUser: (state) =>{
          state.isRegistering = !state.isRegistering
       },
       editUser: (state) => {
          state.isEditing = !state.isEditing
       },
       generateQR: (state) => {
          state.openQR = !state.openQR
       },
       changeData: (state) => {
          state.dataChange = !state.dataChange
       },
       showBookDetails: (state) => {
          state.bookDetails = !state.bookDetails
       }
   }
})

export const {registerUser,editUser,generateQR,changeData, showBookDetails} = modalSlice.actions

export default modalSlice.reducer