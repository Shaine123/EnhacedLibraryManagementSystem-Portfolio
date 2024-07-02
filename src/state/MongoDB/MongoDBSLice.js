import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const mongoDBSlice = createSlice({
   name: 'mongoDBSlice',
   initialState: {
      data: [],
      timeLogs: [],
      recordLogins: 0,
      recordBooksBorrowed: 0,
      dataProcessed: false,
      test: false,
      colleges: {
          cas: 0,
          cba: 0,
          caf: 0,
          cted: 0,
          ccje: 0,
          cit: 0
      },
      status: false
   },
   reducers: {
      addStudent : (state,{payload}) => {
          const {name,studentid,course,gender,college,status,yearlevel,type} = payload.data
        
          axios.post('http://localhost:3002/addStudent',{
            studentname: name, 
            studentid: studentid, 
            course: course, 
            yearlevel: yearlevel, 
            gender: gender, 
            college: college, 
            status: status,
            type: type
          })
          .then(res => {
            state.status = 'value'
          })
          .catch(err => console.log(err))
      },
      editStudent: (state,{payload}) => {
        const {name,studentid,course,gender,college,status,yearlevel} = payload.data
        console.log(payload.identifier)
        axios.put('http://localhost:3002/updateStudent',{
            _id: payload.identifier,
            studentname: name, 
            studentid: studentid, 
            course: course, 
            yearlevel: yearlevel, 
            gender: gender, 
            college: college, 
            status: status
      }).then(res => console.log(res))
      .catch(err => console.log(err))    
    },
    deleteStudent : (state,{payload}) => {
        axios.delete(`http://localhost:3002/deleteStudent/${payload.data}`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    },
    addTeacher : (state,{payload}) => {
      const {name,id,contact,email,gender,position,status} = payload.data
      console.log(payload.data)
      axios.post('http://localhost:3002/addTeacher',{
        name: name, 
        id: id, 
        contact: contact, 
        email: email, 
        gender: gender, 
        position: position, 
        status: status
      })
      .then(res => console.log(res))
      .catch(err => console.log(err))
    },
    editTeacher : (state,{payload}) => {
      const {name,id,contact,email,gender,position,status} = payload.data
      console.log(payload.identifier)
      axios.put('http://localhost:3002/updateTeacher',{
        _id : payload.identifier,
        name: name, 
        id: id, 
        contact: contact, 
        email: email, 
        gender: gender, 
        position: position, 
        status: status
      })
      .then(res => console.log(res))
      .catch(err => console.log(err))
    },
    deleteTeacher : (state,{payload}) => {
      axios.delete(`http://localhost:3002/deleteTeacher/${payload.data}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  },
   addLoginLogs : (state,{payload}) => {
      state.timeLogs = [...state.timeLogs,{yearinfo:payload.yearinfo,datas:payload.data}]
      // console.log(payload.data)
      axios.post('http://localhost:3002/addLoginLogs', {
          yearinfo: payload.yearinfo,
          data: payload.data,
          status: payload.status,
          purpose: payload.purpose
      }).then(res => console.log(res))
      .catch(err => console.log(err))
   },
   addTeacherLog: (state,{payload}) => {
    state.timeLogs = [...state.timeLogs,{yearinfo:payload.yearinfo,datas:payload.data}]
    // console.log(payload.data)
    axios.post('http://localhost:3002/addTeacherLogs', {
        yearinfo: payload.yearinfo,
        data: payload.data,
        status: payload.status,
        purpose: payload.purpose
    }).then(res => console.log(res))
    .catch(err => console.log(err))
 },
   addMaterialLogs: (state,{payload}) => {
      console.log('material Logs new data')
      console.log(payload)
      axios.post('http://localhost:3002/addMaterialLogs', {
      yearinfo: payload.yearinfo,
      data: payload.data,
      userData: payload.userData,
      status: payload.status,
  }).then(res => {
    state.timeLogs = [...state.timeLogs,{yearinfo:payload.yearinfo,datas:payload.data}]
    console.log(res)
  })
  .catch(err => console.log(err))
   },
   addBookAccession: (state,{payload}) => {
      const {title,author,accessionnum,dateacquired,isbn,publisher,type,year,typeOfMaterial} = payload.data
      axios.post('http://localhost:3002/addBook', { 
         title: title,
         author: author,
         accessionnum: accessionnum,
         dateacquired: dateacquired,
         isbn: isbn,
         publisher: publisher,
         year: year,
         typeOfMaterial: typeOfMaterial,
         type: type
      }).then(res => console.log(res))
      .catch(err => console.log(err)) 
   },
   editBookAccession: (state,{payload}) => {
    const {title,author,accessionnum,dateacquired,isbn,publisher,type,year,typeOfMaterial} = payload.data

    axios.put('http://localhost:3002/updateBook', { 
       title: title,
       author: author,
       accessionnum: accessionnum,
       dateacquired: dateacquired,
       isbn: isbn,
       publisher: publisher,
       year: year,
       typeOfMaterial: typeOfMaterial,
       type: type,
       id: payload._id,
    }).then(res => console.log(res))
    .catch(err => console.log(err))
   },
   deleteBookAccession: (state,{payload}) => {
      axios.delete(`http://localhost:3002/deleteBook/${payload.data}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
   },
   addBookCatalog: (state,{payload}) => {

   const {title,author,accessionnum,isbn,section,classificationno,subject,type} = payload.data
   console.log(payload.data)
    axios.post('http://localhost:3002/addCatalog', {
      title: title,
      author: author,
      accessionnum: accessionnum,
      isbn: isbn,
      section: section,
      classificationno: classificationno,
      subject: subject,
      type: type
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
   },
   editBookCatalog: (state,{payload}) => {
    const {title,author,accessionnum,isbn,section,classificationno,subject,type} = payload.data
     axios.put('http://localhost:3002/editCatalog', {
       title: title,
       author: author,
       accessionnum: accessionnum,
       isbn: isbn,
       section: section,
       classificationno: classificationno,
       subject: subject,
       type: type,
       id: payload._id
     })
     .then(res => console.log(res))
     .catch(err => console.log(err))
   },
   deleteBookCatalog: (state,{payload}) => {
    axios.delete(`http://localhost:3002/deleteCatalog/${payload.data}`)
    .then(res => console.log(res))
    .catch(err => console.log(err))
   },
   controlYearlyData: (state,{payload}) => {
      if(payload.type == 'User'){
         state.recordLogins = state.recordLogins + 1
      }else if(payload.type == 'Material'){
         state.recordBooksBorrowed = state.recordBooksBorrowed + 1
      } 
   },
   collegesWeeklyData: (state,{payload}) => {
    console.log('college weekly data')
    console.log(payload.college)
    console.log(state.test)
 
   //   state.colleges = {
   //    cas: payload.college == 'CAS' ? state.colleges.cas + 1 : state.colleges.cas,
   //    cba: payload.college == 'CBA' ? state.colleges.cba + 1 : state.colleges.cba,
   //    caf: payload.college == 'CAF' ? state.colleges.caf + 1 : state.colleges.caf,
   //    cted: payload.college == 'CTED' ? state.colleges.cted + 1 : state.colleges.cted,
   //    ccje:payload.college == 'CCJE' ? state.colleges.ccje + 1 : state.colleges.ccje,
   //    cit:payload.college == 'CIT' ? state.colleges.cit + 1 : state.colleges.cit,
   //   }
   },
   dataProccessState: (state) => {
     state.dataProcessed = !state.dataProcessed
   },
   addLoginDatabase:(state)=>{
    // console.log('addLoginDb')
     const d = new Date()
     const weekday = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
     const day = weekday[d.getDay()]
     axios.post('http://localhost:3002/addLoginDbs', {
        month: d.getMonth() + 1,
        day: d.getDay(),
        number: state.recordLogins, 
        colleges: state.colleges,
        currentDay: day
     })
     .then(res => console.log(res))
     .catch(err => console.log(err))
   },
   editLoginDatabase: (state,{payload}) => {

   console.log('editLoginDatabase')
   console.log(payload)
   console.log(payload.college)
    const d = new Date()
    const weekday = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
    const day = weekday[d.getDay()]
    let addCollege = {
      cas: payload.college == 'CAS' ? state.colleges.cas + 1 : state.colleges.cas,
      cba: payload.college == 'CBA' ? state.colleges.cba + 1 : state.colleges.cba,
      caf: payload.college == 'CAF' ? state.colleges.caf + 1 : state.colleges.caf,
      cted: payload.college == 'CTED' ? state.colleges.cted + 1 : state.colleges.cted,
      ccje:payload.college == 'CCJE' ? state.colleges.ccje + 1 : state.colleges.ccje,
      cit:payload.college == 'CIT' ? state.colleges.cit + 1 : state.colleges.cit,
     }
      state.colleges = {
      cas: payload.college == 'CAS' ? state.colleges.cas + 1 : state.colleges.cas,
      cba: payload.college == 'CBA' ? state.colleges.cba + 1 : state.colleges.cba,
      caf: payload.college == 'CAF' ? state.colleges.caf + 1 : state.colleges.caf,
      cted: payload.college == 'CTED' ? state.colleges.cted + 1 : state.colleges.cted,
      ccje:payload.college == 'CCJE' ? state.colleges.ccje + 1 : state.colleges.ccje,
      cit:payload.college == 'CIT' ? state.colleges.cit + 1 : state.colleges.cit,
     }

     console.log(addCollege)
    axios.put('http://localhost:3002/editLoginDb', {
       id: payload.id,
       month: payload.month,
       day: d.getDay(),
       number: state.recordLogins,
       colleges: addCollege,
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
   },
   addBookDatabase:(state) => {
    const d = new Date()
    console.log(state.recordBooksBorrowed)

        axios.post('http://localhost:3002/addBookDbs', {
          month: d.getMonth() + 1,
          day: d.getDay(),
          number: state.recordBooksBorrowed, 
       })
       .then(res => console.log(res))
       .catch(err => console.log(err))
   },
   editBookDatabase: (state,{payload}) => {
    const d = new Date()

    console.log('editBookDatabase')
 
    axios.put('http://localhost:3002/editBookDbs', {
       id: payload.id,
       month: payload.month,
       day: d.getDay(),
       number: state.recordBooksBorrowed,
       newId: payload.newId
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
   },
    addStationaryDatabase: (state,{payload}) => {

       const {itemName,itemID,category,brand,model,quantity,condition,purchaseDate,type} = payload.data
 
       axios.post('http://localhost:3002/addStationaryDbs', {
          itemName: itemName,
          itemID: itemID,
          category: category,
          brand: brand,
          model: model,
          quantity: quantity,
          condition: condition,
          purchaseDate: purchaseDate,
          type: type
       }).then(res => console.log(res))
       .catch(err => console.log(err))
     },
     editStationaryDatabase: (state,{payload}) => {
       const {itemName,itemID,category,brand,model,quantity,condition,purchaseDate,type} = payload.data
       axios.put('http://localhost:3002/editStationaryDbs', {
        itemName: itemName,
        itemID: itemID,
        category: category,
        brand: brand,
        model: model,
        quantity: quantity,
        condition: condition,
        purchaseDate: purchaseDate,
        type: type,
        id: payload._id
       })
       .then(result => console.log(result))
       .catch(error => console.log(error))
     },
     deleteStationaryDatabase: (state,{payload}) => {
        axios.delete(`http://localhost:3002/deleteStationaryDbs/${payload.data}`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
     },
     addTodaysRecord: (state,{payload}) => {
        axios.post('http://localhost:3002/addTodaysRecord', {
          totalStudents: payload.totalStudents,
          totalTeachers: payload.totalTeachers,
          totalBooksBorrowed: payload.totalBooksBorrowed,
          guest: payload.guest,
          start: payload.start,
          currentDay: payload.day
         }).then(res => console.log(res))
         .catch(err => console.log(err))
     },
     updateTodayRecord: (state, {payload} ) => {
        console.log('updateRecord')
        console.log(payload)
         axios.put('http://localhost:3002/updateTodaysRecord', {
          id: payload.id,
          totalStudents: payload.totalStudents,
          totalTeachers: payload.totalTeachers,
          totalBooksBorrowed: payload.totalBooksBorrowed,
          guest: payload.guest,
          start: payload.start,
          currentDay: payload.day
         }).then((res) => {console.log(res)})
         .catch((err) => {console.log(err)})
     },
     addGuest: (state,{payload}) => {

      const {name,age,email,phoneNumber,status} = payload.data
      console.log(payload.data)
        axios.post('http://localhost:3002/addNewGuest', {
           guestName: name,
           guestAge: age,
           guestPhone: phoneNumber,
           guestEmail: email,
           guestStatus: status
        }).then((res) => {console.log(res)})
        .catch((err) => {console.log(err)})
     },
     editGuest: (state,{payload}) => {
      axios.put('http://localhost:3002/updateGuest', {
         id: payload._id,
         guestName: payload.name,
         guestAge: payload.age,
         guestPhone: payload.phoneNumber,
         guestEmail: payload.email
      }).then((res) => {console.log(res)})
      .catch((err) => {console.log(err)})
     },
     deleteGuest: (state, {payload}) => {
        axios.delete(`http://localhost:3002/deleteGuest/${payload.id}`)
        .then((res) => {console.log(res)})
        .catch((err) => {console.log(err)})
     },
     addGuestLog: (state,{payload}) => {
      state.timeLogs = [...state.timeLogs,{yearinfo:payload.yearinfo,datas:payload.data}]
      console.log(payload.data)
      console.log(payload.data)
      axios.post('http://localhost:3002/addGuestLogs', {
          yearinfo: payload.yearinfo,
          data: payload.data,
          status: payload.status,
          purpose: payload.purpose
      }).then(res => console.log(res))
      .catch(err => console.log(err))
     },
     updateUser: (state, {payload}) => {
      // id: loggedUser._id,
      // username: values.name ,
      // password: values.password ,
      // date:  values.dateRegistered,
      // image: loggedUser.image ,
      // newImage: image ,
      // admincode: loggedUser.admincode ,
      const {id,username,password,date,image,newImage,admincode} = payload.data
       console.log(payload.data)
      axios.put('http://localhost:3002/updateUser', {
         id: id,
         username: username ,
         password: password ,
         date:  date,
         image: image ,
         newImage: newImage ,
         admincode: admincode ,
      }).then((res) => console.log(res))
      .catch((err) => console.log(err))
     },
     addMostBorrowedBook: (state,{payload}) => {
       const newMonth = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        console.log('add most borrowed book')
        console.log(payload)
        axios.post('http://localhost:3002/addMostBorrowedBook', {
           month: newMonth[payload.month],
           name: payload.name,
           count: payload.count
        }).then(res => console.log(res))
        .catch(err => console.log(err))
     },
     addMostLoggedUser: (state,{payload}) => {
      const newMonth = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      console.log('mostloggedUser')
      console.log(payload)
      axios.post('http://localhost:3002/addMostLoggedUser', {
         month: newMonth[payload.month],
         name: payload.name,
         count: payload.count
      }).then(res => console.log(res))
      .catch(err => console.log(err))
     }
   },
})

export const {
              addStudent,
              editStudent,
              deleteStudent,
              addTeacher,
              editTeacher,
              deleteTeacher, 
              addLoginLogs,
              addTeacherLog,
              addBookAccession, 
              editBookAccession,
              deleteBookAccession,
              addBookCatalog,
              editBookCatalog,
              deleteBookCatalog,
              addMaterialLogs,
              controlYearlyData,
              collegesWeeklyData,
              addLoginDatabase,
              editLoginDatabase,
              addBookDatabase,
              editBookDatabase,
              addStationaryDatabase,
              editStationaryDatabase,
              deleteStationaryDatabase,
              dataProccessState,
              addTodaysRecord,
              updateTodayRecord,
              addGuest,
              editGuest,
              deleteGuest,
              addGuestLog,
              updateUser,
              addMostBorrowedBook,
              addMostLoggedUser
            } = mongoDBSlice.actions

export default mongoDBSlice.reducer