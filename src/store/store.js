import {configureStore} from '@reduxjs/toolkit'
import accountReducer from '../state/Account/accountSlice'
import universalReducer from '../state/Universal/universalSlice'
import modalReducer from '../state/Modal/modalSlice'
import mongoDBReducer from '../state/MongoDB/MongoDBSLice'
import trackerReducer from '../state/Tracking/trackerSlice' 

const Store = configureStore({
    reducer: {
       account: accountReducer,
       universal: universalReducer,
       modal: modalReducer,
       mongoDB: mongoDBReducer,
       tracker: trackerReducer
    }
})

export default Store