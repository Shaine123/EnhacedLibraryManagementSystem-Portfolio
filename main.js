const {app , BrowserWindow } = require('electron')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const eApp = express()

eApp.use(cors())
eApp.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/Library')

//Querry Code MongoDb

//APi call for the User Database ----
const userModel = require('./Schema/userSchema')

eApp.post('/newUser', (req, res) => {
     const {username , password, admincode, profile} = req.body
     console.log(req.body)
     const d = new Date()
     
     const day = d.getDate()
     const month = d.getMonth() + 1 
     const finMonth = month < 10 ? `0${month}` : month
     const year = d.getFullYear()
     userModel.create({
         username: username,
         password: password,
         date: `${year}-${finMonth}-${day}` ,
         image: profile,
         admincode: admincode
     }).then(result => res.json(result))
     .catch(error => res.json(error))
})

eApp.get('/findUser/:user', (req, res) => {
     const {user} = req.params

     userModel.findOne({username: user})
     .then(response => {
         return res.json(response)
     })
     .catch(error => res.json(error))
})
eApp.put('/updateUser', (req,res) => {
    const {id,username,password,date,image,newImage,admincode,status,accessLevel} = req.body
     console.log('userUpdates')
     console.log(req.body)
    userModel.findByIdAndUpdate({_id:id}, {
         username: username,
         password: password,
         date: date ,
         image: image,
         newImage:  newImage ,
         admincode: admincode,
         status: status,
         accessLevel: accessLevel
    }).then((result) => {res.json(result)})
    .catch((error) => {res.json(error)})
})

eApp.get('/getUsers', (req,res) => {
     userModel.find()
     .then(result => res.json(result))
     .catch(error => res.json(error))
})

//Api for User Database ends here -------

const studentModel = require('./Schema/studentsSchema')


eApp.post('/addStudent',(req,res)=> {
    const {studentname,studentid,course,yearlevel,gender,college,status,type} = req.body
    studentModel.create({
        studentname: studentname,
        studentid: studentid,
        course: course,
        yearlevel: yearlevel,
        gender: gender,
        college: college,
        status: status,
        type: type
    }).then(result => res.json(result))
    .catch(error => res.json(error))
})

eApp.get('/getStudent', (req,res) => {
    console.log('working get student')
     studentModel.find().limit(1)
     .then(result => res.json(result))
     .catch(error => res.json(error))
})
eApp.get('/getStudentSorted', (req,res) => {
     studentModel.find().sort({_id: -1})
     .then(result => res.json(result))
     .catch(error => res.json(error))
})

eApp.put('/updateStudent', (req,res) => {
    const {studentname,studentid,course,yearlevel,gender,college,status,_id} = req.body

     studentModel.findOneAndUpdate({_id: _id}, {
        studentname: studentname,
        studentid: studentid,
        course: course,
        yearlevel: yearlevel,
        gender: gender,
        college: college,
        status: status
    })
     .then(result => res.json(result))
     .catch(error => res.json(error))
})

eApp.delete('/deleteStudent/:id', (req,res) => {
     const {id} = req.params
     studentModel.findOneAndDelete({_id: id})
     .then(result => res.json(result))
     .catch(error => res.json(error))
})


//CRUD OPERATION FOR NEW TEACHER STARTS HERE
const teacherModel = require('./Schema/teacherSchema')
eApp.post('/addTeacher',(req,res)=> {
    const {name,id,contact,email,gender,position,status} = req.body
    teacherModel.create({
        name: name, 
        id: id, 
        contact: contact, 
        email: email, 
        gender: gender, 
        position: position, 
        status: status
    }).then(result => res.json(result))
    .catch(error => res.json(error))
})

eApp.get('/getTeacher', (req,res) => {
    teacherModel.find().sort({_id: -1})
    .then(result => res.json(result))
    .catch(error => res.json(error))
})

eApp.put('/updateTeacher' , (req, res) => {
    const {name,id,contact,email,gender,position,status,type,_id} = req.body

    teachersModel.findOneAndUpdate({_id: _id}, {
        name: name, 
        id: id, 
        contact: contact, 
        email: email, 
        gender: gender, 
        position: position, 
        status: status,
        type: type
   })
    .then(result => res.json(result))
    .catch(error => res.json(error))
})

eApp.delete('/deleteTeacher/:id', (req, res) => {
     const {id} = req.params
     teacherModel.findOneAndDelete({_id:id})
     .then(result => res.json(result))
     .catch(error => res.json(error))
})
// CRUD OPERATION FOR NEW TEACHER ENDS HERE


//CRUD OPERATION FOR LOGS HISTORY STARTS HERE

const studentCurrentLogModel = require('./Schema/studentCurrentLogSchema')
const loginLogsModel = require('./Schema/loginLogsSchema')

eApp.post('/addLoginLogs', async (req,res) => { 
  
    const {yearinfo, data,status,purpose} = req.body
    
    const newData = await studentModel.findOne({_id:data.data})
    const exist = await loginLogsModel.find({'data.unid': data.data})

    const stillLogged = await studentCurrentLogModel.find({unid: data.data})


    let st = true
  
    if(exist.length == 0){
       console.log('work1')
        st = true
   }else if(stillLogged.length == 0){
      st = false
   } else if(exist !== null){ 
     try{
        if(exist[exist.length - 1].status === 'Login'){
            st = false
            console.log('work2')
         }else if(exist[exist.length - 1].status ===  'Logout'){
               console.log('work3')
               st = true
           }
     }catch{
        
     }
   }

    loginLogsModel.create({
        yearinfo: {
            day: yearinfo.day ,
            month: yearinfo.month,
            year: yearinfo.year,
            completeInfo: yearinfo.completeInfo
        },
        data: {
           unid:  newData._id,
           studentname: newData.studentname === undefined ? newData.name : newData.studentname ,
           studentid: newData.studentid === undefined ? newData.id : newData.studentid,
           course: newData.course === undefined ? 'N/A' : newData.course,
           yearlevel: newData.yearlevel === undefined ? 'N/A' : newData.yearlevel,
           gender: newData.gender,
           college: newData.college
        },
        status: st ? 'Login' : 'Logout',
        purpose: purpose
     }).then(result => res.json(result))
    .catch(error => res.json(error)) 
  
})

eApp.get('/logs', (req,res) => {
     loginLogsModel.find().sort({_id: -1})
     .then(result => res.json(result))
     .catch(error => res.json(error))
})

eApp.get('/getLoginLogs', (req,res) => {
     loginLogsModel.find()
     .then(result => res.json(result))
     .catch(error => res.json(error))
})

const teacherLogsModel = require('./Schema/teacherLogsSchema')

eApp.post('/addTeacherLogs', async (req,res) => {   
    console.log('teacherLogs')
    console.log(JSON.stringify(req.body.purpose))
    const {yearinfo, data,status,purpose} = req.body
    
    const newData = await teacherModel.findOne({_id:data.data})
    const exist = await teacherLogsModel.find({'data.unid': data.data})
    console.log('serv logs')
    console.log(newData)
    let st = true
  
    if(exist == null || exist == []){
       console.log('work1')
        st = true
   }else if(exist !== null){ 
     try{
        if(exist[exist.length - 1].status === 'Login'){
            st = false
            console.log('work2')
         }else if(exist[exist.length - 1].status ===  'Logout'){
               console.log('work3')
               st = true
           }
     }catch{
        
     }
   }
  
  teacherLogsModel.create({
    yearinfo: {
        day: yearinfo.day ,
        month: yearinfo.month,
        year: yearinfo.year,
        completeInfo: yearinfo.completeInfo
    },
    data: {
        unid: newData._id,
        name: newData.name,
        id: newData.id,
        contact: newData.contact,
        email: newData.email,
        gender: newData.gender,
        position: newData.position,
        category: newData.type,
    },
    status: st ? 'Login' : 'Logout',
    purpose: purpose
   }).then(result => res.json(result))
   .catch(error => res.json(error)) 



})

eApp.get('/getTeacherLogs', (req,res) => {
    teacherLogsModel.find().sort({_id: -1})
    .then(result => res.json(result))
    .catch(error => res.json(error))
})


const bookAccessionModel = require('./Schema/bookAccessionSchema')
const materialLogsModel = require('./Schema/materialLogsSchema')
eApp.post('/addMaterialLogs', async (req,res) => {
    const {yearinfo, data,status, userData} = req.body

    const newData = await bookAccessionModel.findOne({_id:data})
    const exist = await materialLogsModel.find({'data.unid': data})
    const existUser = await loginLogsModel.findOne({'data.unid': userData})
    // console.log('testing user data')
    console.log('testing exist user')


    let st = true
  
    if(exist == null){
       console.log('work1')
        st = true
   }else if(exist !== null){ 
     try{
        if(exist[exist.length - 1].status === 'Borrowed'){
            st = false
            console.log('work2')
         }else if(exist[exist.length - 1].status ===  'Returned'){
               console.log('work3')
               st = true
           }
     }catch{
         
     }
   }
    console.log(newData.type)
        materialLogsModel.create({
            yearinfo: {
                day: yearinfo.day ,
                month: yearinfo.month,
                year: yearinfo.year,
                timeBorrowed: yearinfo.timeBorrowed,
                completeInfo: yearinfo.completeInfo
            },
            data: {
               unid: newData._id,
               title: newData.title,
               author: newData.author,
               accessionnum: newData.accessionnum,
               dateacquired: newData.dateacquired,
               isbn: newData.isbn,
               publisher: newData.publisher,
               year: newData.year,
               studentname: existUser.data.studentname,
               studentid: existUser.data.studentid
            },
            status: st ? 'Borrowed' : 'Returned',
            type: newData.type,
         }).then(result => res.json(result))
        .catch(error => res.json(error)) 
    
})

eApp.get('/getMaterialLogs' , (req,res) => {
     materialLogsModel.find().sort({_id: -1})
     .then(result => res.json(result))
     .catch(error => res.json(error))
})
//Logs API Ends Here
//Accession API Starts Here


eApp.post('/addBook', (req,res) => {

    const {title,author,accessionnum,dateacquired,isbn,publisher,type,year,typeOfMaterial} = req.body

     bookAccessionModel.create({
        title: title,
        author: author,
        accessionnum: accessionnum,
        dateacquired: dateacquired,
        isbn: isbn,
        publisher: publisher,
        year: year,
        typeOfMaterial: typeOfMaterial,
        type: type
     })
     .then(result => res.json(result))
     .catch(error => res.json(error))
})
eApp.put('/updateBook', (req,res) => {
    const {id,title,author,accessionnum,dateacquired,isbn,publisher,type,year,typeOfMaterial} = req.body
 
    bookAccessionModel.findOneAndUpdate({_id:id}, {
        title: title,
        author: author,
        accessionnum: accessionnum,
        dateacquired: dateacquired,
        isbn: isbn,
        publisher: publisher,
        year: year,
        typeOfMaterial: typeOfMaterial,
        type: type
    }).then(result => res.json(result))
    .catch(error => res.json(error))
})

eApp.delete('/deleteBook/:id', (req,res) => {
     
    const {id} = req.params
    bookAccessionModel.findOneAndDelete({_id:id})
    .then(result => res.json(result))
    .catch(error => res.json(error))
})

eApp.get('/getBook', (req,res) => {
     bookAccessionModel.find()
     .then(result => res.json(result))
     .catch(error => res.json(error))
})
//Accession API Stops HEre

//Catalog API Starts here
const bookCatalogModel = require('./Schema/bookCatalogSchema')

eApp.post('/addCatalog', (req,res) => {

    const {title,author,accessionnum,isbn,section,classificationno,subject,type} = req.body
    console.log(req.body)
     bookCatalogModel.create({
        title: title,
        author: author,
        accessionnum: accessionnum,
        isbn: isbn,
        section: section,
        classificationno: classificationno,
        subject: subject,
        type: type
     }).then(result => res.json(result))
     .catch(error => res.json(error))
})

eApp.get('/getBookCatalog', (req,res) => {
     bookCatalogModel.find().sort({_id: -1})
     .then(result => res.json(result))
     .catch(error => res.json(error))
})


eApp.put('/editCatalog', (req,res) => {
     
    const {id,title,author,accessionnum,isbn,section,classificationno,subject,type} = req.body

    bookCatalogModel.findByIdAndUpdate({_id:id},{
        title: title,
        author: author,
        accessionnum: accessionnum,
        isbn: isbn,
        section: section,
        classificationno: classificationno,
        subject: subject,
        type: type
    }).then(result => res.json(result))
    .catch(error => res.json(error))
}),

eApp.delete('/deleteCatalog/:id',(req,res) => {
     const {id} = req.params
     bookCatalogModel.findByIdAndDelete({_id:id})
     .then(result => res.json(result))
     .catch(error => res.json(error))
})

//Catalog API Stops here
const loginYearlyModel = require('./Schema/yearlyLibraryLoginSchema')
eApp.post('/addLoginDbs' , (req,res) => {
   
    console.log('working add login')
    const {month,day,number,colleges,currentDay} = req.body
    const weekday = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
    const d = new Date()


    console.log(req.body)
    let newMonth = ''

    switch(JSON.parse(month)){
        case 1: 
            newMonth = "January"
            break;
        case 2: 
            newMonth = "Febuary"
            break;
        case 3: 
            newMonth = "March"
            break;
        case 4: 
            newMonth = "April"
            break;
        case 5: 
            newMonth = "May"
            break;
        case 6: 
            newMonth = "June"
            break;
        case 7: 
            newMonth = "July"
            break;
        case 8: 
            newMonth = "August"
            break;
        case 9: 
            newMonth = "September"
            break;
        case 10: 
            newMonth = "October"
            break;
        case 11: 
            newMonth = "November"
            break;
        case 12: 
            newMonth = "December"
            break;
    }
    loginYearlyModel.create({
        month: newMonth,
        currentDay: weekday[day],
        weeks: {
           monday: day == 1 ? number : 0,
           tuesday: day == 2 ? number : 0,
           wednesday: day == 3 ? number : 0,
           thursday: day == 4 ? number : 0,
           friday: day == 5 ? number : 0
        },
        weeklycollege: {
            cas: colleges.cas,
            cba: colleges.cba,
            caf: colleges.caf,
            cted: colleges.cted,
            ccje: colleges.ccje ,
            cit: colleges.cit
        },
        total: number,
    })
    .then((result) => res.json(result))
    .catch((error) => error.json(error))
})

eApp.put('/editLoginDb' , async (req,res) => {
    const {month,day,number,colleges,id,totalBooksBorrowed, start, currentDay,controlState,studentTotal,teacherTotal} = req.body
    console.log('editLogDb')
        const existingData = await loginYearlyModel.find({month: month})
        // const existGuest = await guestLogModel.findById({_id: guestTotal})
        const weekday = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
    
        console.log(req.body)

        let cont = false
        cont =  weekday[day] == 'monday' ? true : false
      if(existingData.length > 0) {

        console.log('if')
        console.log(existingData[0])
        loginYearlyModel.findByIdAndUpdate({_id:existingData[0]._id}, {
            month: month,
            currentDay: weekday[day],
            weeks: {
               monday: day == 1 ? existingData[0].weeks.monday + 1  :  existingData[0].weeks.monday,
               tuesday: day == 2 ? existingData[0].weeks.tuesday + 1 :  existingData[0].weeks.tuesday,
               wednesday: day == 3 ? existingData[0].weeks.wednesday + 1  :  existingData[0].weeks.wednesday,
               thursday: day == 4 ? existingData[0].weeks.thursday + 1  :  existingData[0].weeks.thursday,
               friday: day == 5 ? existingData[0].weeks.friday  + 1 :  existingData[0].weeks.friday,
            },
            weeklycollege: {
              cas:  existingData[0].weeklycollege.cas > colleges.cas ? existingData[0].weeklycollege.cas : colleges.cas   ,
              cba:  existingData[0].weeklycollege.cba > colleges.cba ? existingData[0].weeklycollege.cba : colleges.cba  ,
              caf:  existingData[0].weeklycollege.caf > colleges.caf ? existingData[0].weeklycollege.caf : colleges.caf ,
              cted:  existingData[0].weeklycollege.cted > colleges.cted ? existingData[0].weeklycollege.cted : colleges.cted    ,
              ccje:  existingData[0].weeklycollege.ccje > colleges.ccje ? existingData[0].weeklycollege.ccje : colleges.ccje   ,
              cit:  existingData[0].weeklycollege.cit > colleges.cit  ?  existingData[0].weeklycollege.cit : colleges.cit   
            },
            total: existingData[0].total + 1,
        })
        .then((result) => res.json(result))
        .catch((error) => res.json(error))
      }
  
   
})

eApp.get('/getLoginDb', (req,res) => {
     loginYearlyModel.find()
     .then(result => res.json(result))
     .catch(error => res.json(error))
})

const bookBorrowedModel = require('./Schema/yearlyLibraryBooksSchema')
eApp.post('/addBookDbs', (req,res) => {
    const {month,day,number} = req.body
    console.log('bookDBLogin')
    console.log(req.body)
    let newMonth = ''

    switch(JSON.parse(month)){
        case 1: 
            newMonth = "January"
            break;
        case 2: 
            newMonth = "Febuary"
            break;
        case 3: 
            newMonth = "March"
            break;
        case 4: 
            newMonth = "April"
            break;
        case 5: 
            newMonth = "May"
            break;
        case 6: 
            newMonth = "June"
            break;
        case 7: 
            newMonth = "July"
            break;
        case 8: 
            newMonth = "August"
            break;
        case 9: 
            newMonth = "September"
            break;
        case 10: 
            newMonth = "October"
            break;
        case 11: 
            newMonth = "November"
            break;
        case 12: 
            newMonth = "December"
            break;
    }
    const weekday = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
    const d = new Date()
    const days = weekday[d.getDay()]

    bookBorrowedModel.create({
        month: newMonth,
        weeks: {
           monday: day == 1 ? number : '',
           tuesday: day == 2 ? number : '',
           wednesday: day == 3 ? number : '',
           thursday: day == 4 ? number : '',
           friday: day == 5 ? number : ''
        },
        currentDay: days,
        bookBorrowed: 0,
        total: number
    })
    .then((result) => res.json(result))
    .catch((error) => error.json(error))
})
eApp.put('/editBookDbs' , async (req,res) => {
    const {month,day,number,id,newId} = req.body
   
  
     const weekday = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
     const d = new Date()
     const days = weekday[d.getDay()]

     const exist = await bookBorrowedModel.findById({_id: id})
     const bookState = await materialLogsModel.findById({_id:newId})
      
     let st = false

     if(days == 'friday'  && d.getHours == 16){
         st = true
     }else{
         st = false
     }
     
     let mark = 0
     if(bookState.status == 'Borrowed'){
         mark = 1
     }else{
         mark = 0
     }

     bookBorrowedModel.findByIdAndUpdate({_id:id}, {
        month: month,
        weeks: {
           monday: day == 1 ? st == true ? 0 : exist.weeks.monday + mark :  exist.weeks.monday,
           tuesday: day == 2 ? st == true ? 0 : exist.weeks.tuesday + mark  : exist.weeks.tuesday,
           wednesday: day == 3 ? st == true ? 0 : exist.weeks.wednesday + mark : exist.weeks.wednesday,
           thursday: day == 4 ? st == true ? 0 : exist.weeks.thursday + mark :  exist.weeks.thursday,
           friday: day == 5 ? st == true ? 0 : exist.weeks.friday + mark : exist.weeks.friday
        },
        currentDay: days,
        bookBorrowed: exist.currentDay == days ? mark == 1 ? exist.bookBorrowed + 1 : exist.bookBorrowed - 1 < 0 ? 0 : exist.bookBorrowed - 1 : 0,
        total: exist.total + 1
    })
    .then((result) => res.json(result))
    .catch((error) => error.json(error))
})
eApp.get('/getBookDb', (req,res) => {
    bookBorrowedModel.find()
    .then(result => res.json(result))
    .catch(error => res.json(error))
})

const bookStationaryModel = require('./Schema/bookStationarySchema')
eApp.post('/addStationaryDbs' , (req,res) => {
    const {itemName,itemID,category,brand,model,quantity,condition,purchaseDate,type} = req.body

     bookStationaryModel.create({
        itemName: itemName,
        itemID: itemID,
        category: category,
        brand: brand,
        model: model,
        quantity: quantity,
        condition: condition,
        purchaseDate: purchaseDate,
        type: type
     })
     .then(result => res.json(result))
     .catch(error => res.json(error))
})

eApp.put('/editStationaryDbs' , (req,res) => {
    const {itemName,itemID,category,brand,model,quantity,condition,purchaseDate,type,id} = req.body

    bookStationaryModel.findByIdAndUpdate({_id:id}, {
        itemName: itemName,
        itemID: itemID,
        category: category,
        brand: brand,
        model: model,
        quantity: quantity,
        condition: condition,
        purchaseDate: purchaseDate,
        type: type
    })
    .then(result => res.json(result))
    .catch(error => res.json(error))
})

eApp.delete('/deleteStationaryDbs/:id', (req,res) => {
     const {id} = req.params
     bookStationaryModel.findByIdAndDelete({_id:id})
     .then(result => res.json(result))
     .catch(error => res.json(error))
})

eApp.get('/getStationaryData', (req,res) => {
     bookStationaryModel.find().sort({_id: -1})
     .then(result => res.json(result))
     .catch(error => res.json(error))
})

const todaysRecordModel = require('./Schema/todaysRecordSchema')

eApp.post('/addTodaysRecord', (req,res) => {

     const {totalStudents,totalTeachers,totalBooksBorrowed,guest, start,currentDay} = req.body
     console.log('todaysRecord')
     console.log(req.body)
     todaysRecordModel.create({
        totalStudents: totalStudents,
        totalTeachers: totalTeachers,
        totalBooksBorrowed: totalBooksBorrowed,
        guest: guest,
        start: start,
        newDay: currentDay
     }).then(result => res.json(result))
     .catch(error => res.json(error))
})

eApp.put('/updateTodaysRecord', async (req,res) => {
    const {totalStudents,totalTeachers,totalBooksBorrowed,guest, id, start,day, currentDay} = req.body
    const existData = await todaysRecordModel.find({newDay:currentDay})

    if(existData.length > 0) {
        todaysRecordModel.findByIdAndUpdate({_id: id}, {
            totalStudents: totalStudents,
            totalTeachers: totalTeachers,
            totalBooksBorrowed: totalBooksBorrowed,
            guest: guest,
            start: start,
            newDay: currentDay
        }).then((result) => {res.json(result)})
        .catch((error) => {res.json(error)})
    }else{
        todaysRecordModel.findByIdAndUpdate({_id: id}, {
            totalStudents: 0,
            totalTeachers: 0,
            totalBooksBorrowed: 0,
            guest: 0,
            start: start,
            newDay: currentDay
        }).then((result) => {res.json(result)})
        .catch((error) => {res.json(error)})
    }
    
}) 

eApp.get('/getTodaysRecord', (req,res) => {
    console.log('getTodays Record')
     todaysRecordModel.find()
     .then(result => res.json(result))
     .catch(error => res.json(error))
})

const guestModel = require('./Schema/guestSchema')
eApp.post('/addNewGuest', (req,res) => {

     const {guestName,guestAge,guestPhone,guestEmail,guestStatus} = req.body

     guestModel.create({
        name: guestName,
        guestAge: guestAge, 
        guestPhone: guestPhone ,
        guestEmail: guestEmail ,
        status: guestStatus,
        type: 'User'
     })
     .then((result) => {res.json(result)})
     .catch((error) => {res.json(error)})
})

eApp.put('/updateGuest',(req,res) => {
       const {guestName,guestAge,guestPhone,guestEmail,guestStatus,id} = req.body

    guestModel.findByIdAndUpdate({_id:id},{
        name: guestName,
        guestAge: guestAge, 
        guestPhone: guestPhone ,
        guestEmail: guestEmail ,
        status: guestStatus
    })
    .then((result) => {res.json(result)})
    .catch((error) => {res.json(error)})
})
eApp.delete('/deleteGuest/:id', (req,res) => {
     const {id} = req.params
   
     console.log(id)
     guestModel.findByIdAndDelete({_id :id})
     .then((result) => {res.json(result)})
    .catch((error) => {res.json(error)})
})
eApp.get('/getGuest', (req,res) => {
     guestModel.find().sort({_id: -1})
     .then((result) => {res.json(result)})
    .catch((error) => {res.json(error)})
})

const guestLogModel = require('./Schema/guestLogSchema')

eApp.post('/addGuestLogs', async (req,res) => {
 
    const {yearinfo, data,status,purpose} = req.body
    console.log('guestLog')
    console.log(data)
    const newData = await guestModel.findOne({_id:data.data})
    const exist = await guestLogModel.find({'data.unid': data.data})
    console.log('serv logs')
    console.log(newData)
    let st = true
  
    if(exist == null || exist == []){
       console.log('work1')
        st = true
   }else if(exist !== null){ 
     try{
        if(exist[exist.length - 1].status === 'Login'){
            st = false
            console.log('work2')
         }else if(exist[exist.length - 1].status ===  'Logout'){
               console.log('work3')
               st = true
           }
     }catch{
        
     }
   }
  
  guestLogModel.create({
    yearinfo: {
        day: yearinfo.day ,
        month: yearinfo.month,
        year: yearinfo.year,
        completeInfo: yearinfo.completeInfo
    },
    data: {
        unid: newData._id,
        name: newData.name,
        guestAge: newData.guestAge, 
        guestPhone:newData.guestPhone ,
        guestEmail: newData.guestEmail,
        status: newData.status,
        category: newData.type
      },
    status: st ? 'Login' : 'Logout',
    purpose: purpose
   }).then(result => res.json(result))
   .catch(error => res.json(error)) 

})

eApp.get('/getGuestLogs', (req,res) => {
    guestLogModel.find().sort({_id: -1})
    .then(result => res.json(result))
    .catch(error => res.json(error)) 
})

const mostBorrowedModel = require('./Schema/mostBorrowedSchema')

eApp.post('/addMostBorrowedBook',async (req,res) => {
    const {month,name,count} = req.body
     
    const booksBorrowed = await mostBorrowedModel.find({month:month})
    const exist  = await mostBorrowedModel.find({name:name})
    const replaceBook = booksBorrowed.filter((item) => {
        return count > item.count
   })
 
       if(exist.length > 0){
           mostBorrowedModel.findByIdAndUpdate({_id:exist[0]._id},{
                month: month,
                name: exist[0].name,
                count: exist[0].count + count
        }).then((result) => {res.json(result)})
        .catch((error) => {res.json(error)})
       }else{
        mostBorrowedModel.create({
            month: month,
            name: name,
            count: count
        }).then((result) => {res.json(result)})
        .catch((error) => {res.json(error)})
    }
    
})

eApp.get('/getMostBorrowedBook', (req,res) => {
     mostBorrowedModel.find()
     .then((result) => {res.json(result)})
    .catch((error) => {res.json(error)})
})

const mostLoggedModel = require('./Schema/mostLoggedSchema')

eApp.post('/addMostLoggedUser', async (req,res) => {
    const {month,name,count} = req.body
    console.log('mostlogged')
    console.log(name)
    const loggedUsers = await mostLoggedModel.find({month:month})
    const exist  = await mostLoggedModel.find({logName:name})
    const replaceBook = loggedUsers.filter((item) => {
        return count > item.count
   })

       if(exist.length > 0){
        mostLoggedModel.findByIdAndUpdate({_id:exist[0]._id},{
                month: month,
                logName: exist[0].name,
                count: exist[0].count + count
        }).then((result) => {res.json(result)})
        .catch((error) => {res.json(error)})
       }else{
        mostLoggedModel.create({
            month: month,
            logName: name,
            count: count
        }).then((result) => {res.json(result)})
        .catch((error) => {res.json(error)})
    }
    
})

eApp.get('/getMostLoggedUser', (req,res) => {
     mostLoggedModel.find().sort({_id: -1})
     .then(result => res.json(result))
    .catch(error => res.json(error)) 
} )



eApp.post('/addCurrentLogStudent', async (req,res) => {
     const {id} = req.body
    console.log(JSON.stringify(id))
     const exist = await studentCurrentLogModel.find({unid: id})

     console.log('exist test')
     console.log(exist[0])
     
     
     if(exist.length > 0){
        studentCurrentLogModel.findByIdAndDelete({_id: exist[0]._id})
     }else{
        studentCurrentLogModel.create({
            unid: id
         })
         .then((result => res.json(result)))
         .catch((error => res.json(error)))
     }
})
eApp.delete('/deleteCurrentLogStudent/:id' , async (req,res) => {
     const {id} = req.params
     try{
        const existData = await studentCurrentLogModel.find({unid: id})
     studentCurrentLogModel.findByIdAndDelete({_id: existData[0]._id})
     .then((result => res.json(result)))
     .catch((error => res.json(error)))
     }catch(error){

     }
     
})
eApp.get('/getCurrentLogStudent' , (req,res) => {

     studentCurrentLogModel.find()
     .then((result => res.json(result)))
     .catch((error => res.json(error)))
})

const currentAccessModel = require('./Schema/currentAccessSchema')

eApp.post('/addCurrentAccess', async(req,res) => {
      const {name,id,uri,accessLevel} = req.body
            currentAccessModel.create({
                name: name,
                id: id,
                accessLevel: accessLevel,
                uri: uri
            })  
            .then((result => res.json(result)))
            .catch((error => res.json(error)))
      
    
})
eApp.put('/updateCurrentAccess' , (req,res) => {
    const {name,id,uri,accessLevel} = req.body

    currentAccessModel.findOneAndUpdate({id: id},{
      name: name,
      id: id,
      accessLevel: accessLevel,
      uri: uri
    })  
    .then((result => res.json(result)))
    .catch((error => res.json(error)))
})

eApp.get('/getCurrentAccess', (req,res) => {
    currentAccessModel.find()
    .then((result => res.json(result)))
    .catch((error => res.json(error)))
})
const url = require('url')
const path = require('path')
const teachersModel = require('./Schema/teacherSchema')


const createMainWindow = () => {
   const mainWindow = new BrowserWindow(
    {
      title: 'Library Management System',
      width: 6000,
      height: 2400,
      webPreferences:{ 
        nodeIntegration: true, // or false based on your requirement
        allowFileAccess: true, // Allow access to files outside of the app's sandbox
      }
   }

)

//addLoginYearlyData

//    mainWindow.webContents.openDevTools()
//    pathname: path.join(__dirname,'../my-app/build/index.html'),
    //   pathname: path.join(__dirname,'build/index.html'),
      //    protocol: 'file:',
  const startUrl = url.format({
    pathname: path.join(__dirname,'index.html'),
    //   pathname: path.join('index.html'),
      protocol: 'file:',
      
  })

  mainWindow.loadURL(startUrl)


}

eApp.listen(3002,()=>{
    console.log('Server Running')
})
app.whenReady().then(createMainWindow) 

