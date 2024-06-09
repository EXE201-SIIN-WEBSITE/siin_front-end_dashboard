import * as yup from 'yup'

export type updateAccessoryValuesType = {
  id: number | null
  name: string
  image: string
  price: number
  status: boolean
}

export const accessorySchema = yup.object().shape({
  name: yup.string().required('Please input name!'),
  price: yup.number().required('Please input price!')
})

export const defaultFormAccessoryValue: updateAccessoryValuesType = {
  id: null,
  name: '',
  image: '',
  price: 0,
  status: false
}
