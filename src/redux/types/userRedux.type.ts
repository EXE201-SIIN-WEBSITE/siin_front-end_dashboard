import { User } from '../../types/user.type'

interface UserState {
  user: User[]
  editUser: User | null
  loading: boolean
  error: null | any
  currentRequestId: undefined | string
}

const initialUserState: UserState = {
  user: [],
  editUser: null,
  loading: true,
  error: null,
  currentRequestId: undefined
}

export default initialUserState
