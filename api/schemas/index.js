const yup = require('yup')

const projectSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('name is required'),
  description: yup
    .string()
    .trim()
    .required('description is required'),
  completed: yup
    .boolean()
})

const actionSchema = yup.object().shape({
  project_id: yup
    .number()
    .required(),
  description: yup
    .string()
    .trim()
    .max(100, 'cannot be longer than 100 chars')
    .required('description is required'),
  notes: yup
    .string()
    .trim()
    .required('notes are required'),
  completed: yup
    .boolean()
})

module.exports = {
  projectSchema,
  actionSchema,
}
