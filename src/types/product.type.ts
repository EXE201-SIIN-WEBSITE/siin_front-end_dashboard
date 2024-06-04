export interface Product {
  id: number
  name: string
  coverImage: string
  price: number
  status: boolean
  categoryId: number
}

export interface SubImage {
  id: number
  url: string
  status: boolean
  productId: number
}
