import * as yup from 'yup'

const loginSchema = yup.object().shape({
   name: yup.string('Please enter a valid name').required('Required'),
   password: yup.string().min(5).required('Required')
})
const signupSchema = yup.object().shape({
   username: yup.string('Please enter a valid name').min(5).required('Required'),
   password: yup.string().min(5).required('Required'),
   admincode: yup.number().min(3).required('Required')
})

export {
   loginSchema,
   signupSchema
}