import * as yup from 'yup'

export type updateProductValuesType = {
  id: number | null
  name: string
  coverImage: string
  price: number
  status: boolean
  quantity: number
  categoryId?: number | null
  accessoryId?: number | null
  materialId?: number | null
}

export const productSchema = yup.object().shape({
  name: yup.string().required('Please input name!'),
  price: yup.number().required('Please input price!').typeError(' must be a number'),
  status: yup.boolean().required('Please choose status!'),
  quantity: yup.number().required('Please input quantity!'),
  categoryId: yup.number().required('Please choose categoryId!'),
  accessoryId: yup.number().typeError(' must be a number'),
  materialId: yup.number().typeError(' must be a number')
})

export const defaultFormProductValue: updateProductValuesType = {
  id: null,
  name: '',
  coverImage: '',
  price: 0,
  status: false,
  quantity: 0,
  categoryId: null,
  accessoryId: null,
  materialId: null
}
