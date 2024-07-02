import { createSlice } from "@reduxjs/toolkit";

const AccountSlice = createSlice({
   name: 'accounts',
   initialState: {
     accountExist: false,
     accountMessage: {
        message: '',
        error: false
     },
   },
   reducers:{
     controlAccount : (state) =>{
       state.accountExist = !state.accountExist
     },
     newMessage : (state, {payload}) => {
        state.accountMessage.message = payload.message
        state.accountMessage.error = payload.error
     }
   }
})

export const {controlAccount, newMessage } = AccountSlice.actions

export default AccountSlice.reducer