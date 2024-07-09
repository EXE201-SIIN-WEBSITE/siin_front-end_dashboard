import * as yup from 'yup'

export type updateProductDetailValuesType = {
  id: number | null
  productId: number | null
  accessoryId: number | null
  quantity: number
  price: number
  status: boolean
  colorID: number | null
  sizeID: number | null
}

export const defaultFormProductDetailValue: updateProductDetailValuesType = {
  id: null,
  productId: null,
  accessoryId: null,
  quantity: 0,
  price: 0,
  status: true,
  colorID: null,
  sizeID: null
}

export const productDetailSchema = yup.object().shape({
  quantity: yup
    .number()
    .required('Please input quantity!')
    .min(1, 'Quantity must be greater than 0!')
    .typeError('Number only'),
  price: yup.number().required('Please input price!').min(1, 'Price must be greater than 0!').typeError('Number only')
})
