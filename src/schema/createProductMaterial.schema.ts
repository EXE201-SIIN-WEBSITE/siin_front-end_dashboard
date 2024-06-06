import * as yup from 'yup'

export type updateProductMaterialCreateValue = {
  id?: number
  productId: number
  accessoryId: number | null
  quantity: number
  price: number
  status: boolean
  listColor?: number[]
  listSize?: number[]
}

export const ProductMaterialCreateSchema = yup.object().shape({
  productId: yup.number().required(),
  accessoryId: yup.number().nullable(),
  quantity: yup.number().required('pls input quantity').min(0, 'quantity greate than 0'),
  price: yup.number().required().min(0, 'price greate than 0'),
  status: yup.boolean().required()
})

export const defaultFormProductMaterialCreateValue: updateProductMaterialCreateValue = {
  productId: 0,
  accessoryId: null,
  quantity: 0,
  price: 0,
  status: true
}
