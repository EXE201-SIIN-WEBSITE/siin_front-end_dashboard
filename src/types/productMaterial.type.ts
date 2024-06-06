export interface ProductMaterial {
  id: number
  colorId: number
  sizeId: number
  productId: number
  accessoryId: number
  quantity: number
  image: string
  price: number
  status: boolean
}

export interface ProductMaterialCreate {
  id: number
  productId: number
  accessoryId: number | null
  quantity: number
  price: number
  status: boolean
}
