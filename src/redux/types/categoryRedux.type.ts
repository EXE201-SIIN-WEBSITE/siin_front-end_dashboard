import { Category } from '../../types/category.type'

interface CategoryState {
  categories: Category[]
  editCategory: Category | null
  loading: boolean
  error: null | any
  currentRequestId: undefined | string
}

const initialCategoryState: CategoryState = {
  categories: [],
  editCategory: null,
  loading: true,
  error: null,
  currentRequestId: undefined
}

export default initialCategoryState
