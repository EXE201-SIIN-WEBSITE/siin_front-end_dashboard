import { yupResolver } from '@hookform/resolvers/yup'
import { AutoComplete, Col, Input, Modal, Row, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { Controller, FieldErrors, Resolver, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { getAccessory } from '../../../redux/actions/accessory.action'
import { getCategory } from '../../../redux/actions/category.action'
import { getMaterials } from '../../../redux/actions/material.action'
import { createProduct, updateProduct } from '../../../redux/actions/product.actions'
import { removeEditProduct } from '../../../redux/slices/product.slice.'
import { RootState, useAppDispatch } from '../../../redux/store'
import { defaultFormProductValue, productSchema, updateProductValuesType } from '../../../schema/product.schema'
import UploadCoverImage from '../../../utils/UploadCoverImage'
import UploadImage from '../../../utils/UpLoadImage'

export type FormProductModalProps = {
  isOpenModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ProductModal({ isOpenModal, setOpenModal }: FormProductModalProps) {
  const dispatch = useAppDispatch()

  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const { editProduct } = useSelector((state: RootState) => state.product)
  const { categories } = useSelector((state: RootState) => state.category)
  const { accessories } = useSelector((state: RootState) => state.accessory)
  const { materials } = useSelector((state: RootState) => state.materials)

  const { control, handleSubmit, reset, setValue } = useForm<updateProductValuesType>({
    resolver: yupResolver(productSchema) as unknown as Resolver<updateProductValuesType>,
    mode: 'onBlur',
    defaultValues: defaultFormProductValue
  })

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    dispatch(getCategory({ signal }))
    dispatch(getAccessory({ signal }))
    dispatch(getMaterials({ signal }))

    return () => {
      abortController.abort()
    }
  }, [dispatch])

  useEffect(() => {
    if (isOpenModal) {
      if (editProduct) {
        reset({
          id: editProduct.id,
          name: editProduct.name,
          coverImage: editProduct.coverImage,
          price: editProduct.price,
          status: editProduct.status,
          quantity: editProduct.quantity,
          categoryId: editProduct.categoryId,
          accessoryId: editProduct.accessoryId,
          materialId: editProduct.materialId
        })
      } else {
        reset(defaultFormProductValue)
      }
    }
  }, [editProduct, isOpenModal])

  const handleCancel = () => {
    setOpenModal(false)
    dispatch(removeEditProduct())
  }

  const handleCoverImageUpdate = (url: string) => {
    setValue('coverImage', url)
  }

  const onSubmit: SubmitHandler<updateProductValuesType> = async (data) => {
    setConfirmLoading(true)
    if (editProduct) {
      if (data.id) {
        const resultAction: any = await dispatch(updateProduct({ product: data }))
        if (updateProduct.fulfilled.match(resultAction)) {
          toast.success('Update Product Successfully!')
          reset(defaultFormProductValue)
          setConfirmLoading(false)
          setOpenModal(false)
        }
      }
    } else {
      const resultAction = await dispatch(createProduct({ product: data }))
      if (createProduct.fulfilled.match(resultAction)) {
        toast.success('Create Apartment Successfully!')
        reset(defaultFormProductValue)
        setConfirmLoading(false)
        setOpenModal(false)
      }
    }
    reset(defaultFormProductValue)
    setConfirmLoading(false)
    setOpenModal(false)
    handleCancel()
  }

  const onError: SubmitErrorHandler<updateProductValuesType> = (errors: FieldErrors<updateProductValuesType>) => {
    Object.entries(errors).forEach(([_field, error]) => {
      const errorMessage = error?.message
      errorMessage && toast.error(errorMessage)
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Modal
          title={editProduct ? 'Edit Product' : 'Add New Product'}
          open={isOpenModal}
          onOk={handleSubmit(onSubmit, onError)}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <Typography.Title level={5}>Name</Typography.Title>
          <Controller
            control={control}
            name='name'
            render={({ field }) => <Input value={field.value} onChange={field.onChange} placeholder='input name' />}
          />
          <Typography.Title level={5}>Cover Image</Typography.Title>
          <UploadCoverImage product={editProduct} onCoverImageUpdate={handleCoverImageUpdate} />{' '}
          {/* <Image width={200} src={editProduct?.coverImage} /> */}
          <Typography.Title level={5}>Quantity</Typography.Title>
          <Controller
            control={control}
            name='quantity'
            render={({ field }) => (
              <Input value={field.value} onChange={field.onChange} placeholder='input quantity' type='number' />
            )}
          />
          <Typography.Title level={5}>Price</Typography.Title>
          <Controller
            control={control}
            name='price'
            render={({ field }) => (
              <Input value={field.value} onChange={field.onChange} placeholder='input price' type='number' />
            )}
          />
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Typography.Title level={5}>Material</Typography.Title>
              <Controller
                control={control}
                name='materialId'
                render={({ field }) => (
                  <AutoComplete
                    style={{ width: '100%' }}
                    value={field.value}
                    onChange={field.onChange}
                    options={materials.map((material) => ({
                      value: material.id.toString(),
                      label: `${material.colorName} - ${material.size}`
                    }))}
                    placeholder='input material'
                  />
                )}
              />
            </Col>
            <Col span={8}>
              <Typography.Title level={5}>Accessory</Typography.Title>
              <Controller
                control={control}
                name='accessoryId'
                render={({ field }) => (
                  <AutoComplete
                    style={{ width: '100%' }}
                    value={field.value}
                    onChange={field.onChange}
                    options={accessories.map((acc) => ({ value: acc.id.toString(), label: acc.name }))}
                    placeholder='input accessory'
                  />
                )}
              />
            </Col>
            <Col span={8}>
              <Typography.Title level={5}>Category</Typography.Title>
              <Controller
                control={control}
                name='categoryId'
                render={({ field }) => (
                  <AutoComplete
                    style={{ width: '100%' }}
                    value={field.value}
                    onChange={field.onChange}
                    options={categories.map((cat) => ({ value: cat.id.toString(), label: cat.name }))}
                    placeholder='input category'
                  />
                )}
              />
            </Col>
          </Row>
          <UploadImage product={editProduct} />
        </Modal>
      </form>
    </>
  )
}
