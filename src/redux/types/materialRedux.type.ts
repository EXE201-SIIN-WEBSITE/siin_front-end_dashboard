/* eslint-disable @typescript-eslint/no-explicit-any */
import { Material } from '../../types/material.type'

interface MaterialState {
  materials: Material[]
  editMaterial: Material | null
  loading: boolean
  error: null | any
  currentRequestId: undefined | string
}

const initialMaterialState: MaterialState = {
  materials: [],
  editMaterial: null,
  loading: true,
  error: null,
  currentRequestId: undefined
}

export default initialMaterialState
