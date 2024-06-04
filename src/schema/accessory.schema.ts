import * as yup from 'yup'

export type updateAccessoryValuesType = {
  id: number | null
  name: string
  image: string
  status: boolean
}

export const accessorySchema = yup.object().shape({
  name: yup.string().required('Please input name!')
})

export const defaultFormAccessoryValue: updateAccessoryValuesType = {
  id: null,
  name: '',
  image: '',
  status: false
}
