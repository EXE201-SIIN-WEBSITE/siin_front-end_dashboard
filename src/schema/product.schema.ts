import * as yup from 'yup'

export type updateProductValuesType = {
  id: number | null
  name: string
  coverImage: string | null
  price: number
  status: boolean
  categoryId: number | null
}

export const productSchema = yup.object().shape({
  name: yup.string().required('Please input name!'),
  price: yup.number().required('Please input price!').typeError(' must be a number'),
  status: yup.boolean().required('Please choose status!'),
  categoryId: yup.number().required('Please choose categoryId!')
})

export const defaultFormProductValue: updateProductValuesType = {
  id: null,
  name: '',
  coverImage: '',
  price: 0,
  status: false,
  categoryId: null
}
