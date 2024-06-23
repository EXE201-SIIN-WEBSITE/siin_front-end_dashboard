import * as yup from 'yup'

export type updateSizeValuesType = {
  id: number | null
  name: string
  price: number
}

export const sizeSchema = yup.object().shape({
  name: yup.string().required('Please input name!'),
  price: yup.number().required('Please input price!').min(0, 'Price must be greater than 0!').typeError('Number only')
})

export const defaultFormSizeValue: updateSizeValuesType = {
  id: null,
  name: '',
  price: 0
}
