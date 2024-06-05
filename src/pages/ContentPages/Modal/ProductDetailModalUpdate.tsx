import { yupResolver } from '@hookform/resolvers/yup'
import { Input, Modal, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { Controller, FieldErrors, Resolver, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { updateProduct } from '../../../redux/actions/product.actions'
import { getProductMaterialSubImage } from '../../../redux/actions/productMaterialSubImage.action'
import { updateProductMaterial } from '../../../redux/actions/productmaterial.action'
import { RootState, useAppDispatch } from '../../../redux/store'
import {
  defaultFormProductDetailValue,
  productDetailSchema,
  updateProductDetailValuesType
} from '../../../schema/productDetail.schema'
import UploadImage from '../../../utils/UpLoadImage'

export type FormProductModalProps = {
  isOpenModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ProductDetailModalUpdate({ isOpenModal, setOpenModal }: FormProductModalProps) {
  const dispatch = useAppDispatch()
  const propSize = useSelector((state: RootState) => state.size)
  const propColor = useSelector((state: RootState) => state.color)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const { editproductMaterial } = useSelector((state: RootState) => state.productMaterial)
  const { productMaterialSubImage } = useSelector((state: RootState) => state.productMaterialSubImage)

  const { control, handleSubmit, reset } = useForm<updateProductDetailValuesType>({
    resolver: yupResolver(productDetailSchema) as unknown as Resolver<updateProductDetailValuesType>,
    mode: 'onBlur',
    defaultValues: defaultFormProductDetailValue
  })

  const abortController = new AbortController()
  const signal = abortController.signal

  useEffect(() => {
    if (isOpenModal && editproductMaterial) {
      dispatch(getProductMaterialSubImage({ id: editproductMaterial.id, signal }))
    }

    return () => {
      abortController.abort()
    }
  }, [isOpenModal, editproductMaterial])

  useEffect(() => {
    if (isOpenModal) {
      if (editproductMaterial) {
        reset({
          id: editproductMaterial.id,
          productId: editproductMaterial.productId,
          accessoryId: editproductMaterial.accessoryId,
          quantity: editproductMaterial.quantity,
          price: editproductMaterial.price,
          status: editproductMaterial.status,
          colorID: editproductMaterial.colorId,
          sizeID: editproductMaterial.sizeId
        })
      } else {
        reset(defaultFormProductDetailValue)
      }
    }
  }, [editproductMaterial, isOpenModal])

  const handleCancel = () => {
    setOpenModal(false)
  }

  const getColorNameById = (id: number) => {
    const color = propColor.colors.find((color) => color.id === id)
    return color ? color.name : ''
  }

  const getSizeNameById = (id: number) => {
    const size = propSize.sizes.find((size) => size.id === id)
    return size ? size.name : ''
  }

  const onSubmit: SubmitHandler<updateProductDetailValuesType> = async (productMaterial) => {
    setConfirmLoading(true)
    if (editproductMaterial) {
      if (productMaterial.id) {
        const resultAction: any = await dispatch(updateProductMaterial({ productMaterial, signal }))
        if (updateProduct.fulfilled.match(resultAction)) {
          toast.success('Update Product Successfully!')
          reset(defaultFormProductDetailValue)
          setConfirmLoading(false)
          setOpenModal(false)
        }
      }
    }

    reset(defaultFormProductDetailValue)
    setConfirmLoading(false)
    setOpenModal(false)
    handleCancel()
  }

  const onError: SubmitErrorHandler<updateProductDetailValuesType> = (
    errors: FieldErrors<updateProductDetailValuesType>
  ) => {
    Object.entries(errors).forEach(([_field, error]) => {
      const errorMessage = error?.message
      errorMessage && toast.error(errorMessage)
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Modal
          title={'Edit Product Detail'}
          open={isOpenModal}
          onOk={handleSubmit(onSubmit, onError)}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <Typography.Title level={5}>ColorName</Typography.Title>
          <Controller
            control={control}
            name='colorID'
            render={({ field }) => <Input value={getColorNameById(field?.value || NaN)} disabled />}
          />
          <Typography.Title level={5}>Size Name</Typography.Title>
          <Controller
            control={control}
            name='sizeID'
            render={({ field }) => <Input value={getSizeNameById(field?.value || NaN)} disabled />}
          />
          <Typography.Title level={5}>Accessory Name</Typography.Title>
          <Controller
            control={control}
            name='accessoryId'
            render={({ field }) => <Input value={field.value || 'khong co'} disabled />}
          />
          <Typography.Title level={5}>Quantity</Typography.Title>
          <Controller
            control={control}
            name='quantity'
            render={({ field }) => <Input value={field.value} onChange={field.onChange} />}
          />
          <Typography.Title level={5}>Price</Typography.Title>
          <Controller
            control={control}
            name='price'
            render={({ field }) => <Input value={field.value} onChange={field.onChange} />}
          />
          <UploadImage productMaterialSubImage={productMaterialSubImage} id={editproductMaterial?.id || 0} />
        </Modal>
      </form>
    </>
  )
}
