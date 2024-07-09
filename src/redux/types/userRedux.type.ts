import { User } from '../../types/user.type'

interface UserState {
  user: User[]
  editUser: User | null
  loading: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
