export interface Product {
  id: number
  name: string
  coverImage: string
  price: number
  status: boolean
  quantity: number
  categoryId: number
  accessoryId: number
  materialId: number
  SubImages?: SubImage[] | null
}

export interface SubImage {
  id: number
  url: string
  status: boolean
  productId: number
}
