import * as yup from 'yup'

export type updateSizeValuesType = {
  id: number | null
  name: string
  price: number
}

export const sizeSchema = yup.object().shape({
  name: yup.string().required('Please input name!'),
  price: yup.number().required('Please input price!')
})

export const defaultFormSizeValue: updateSizeValuesType = {
  id: null,
  name: '',
  price: 0
}
