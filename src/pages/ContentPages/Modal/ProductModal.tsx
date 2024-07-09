/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup'
import { AutoComplete, Input, Modal, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { Controller, FieldErrors, Resolver, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { getCategory } from '../../../redux/actions/category.action'
import { createProduct, updateProduct } from '../../../redux/actions/product.actions'
import { removeEditProduct } from '../../../redux/slices/product.slice.'
import { RootState, useAppDispatch } from '../../../redux/store'
import { defaultFormProductValue, productSchema, updateProductValuesType } from '../../../schema/product.schema'
import UploadCoverImage from '../../../utils/UploadCoverImage'

export type FormProductModalProps = {
  isOpenModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ProductModal({ isOpenModal, setOpenModal }: FormProductModalProps) {
  const dispatch = useAppDispatch()

  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const { editProduct } = useSelector((state: RootState) => state.product)
  const { categories } = useSelector((state: RootState) => state.category)
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>('')

  const { control, handleSubmit, reset, setValue } = useForm<updateProductValuesType>({
    resolver: yupResolver(productSchema) as unknown as Resolver<updateProductValuesType>,
    mode: 'onBlur',
    defaultValues: defaultFormProductValue
  })

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    dispatch(getCategory({ signal }))

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
          categoryId: editProduct.categoryId
        })
        const selectedCategory = categories.find((cat) => cat.id === editProduct.categoryId)
        setSelectedCategoryName(selectedCategory?.name || '')
      } else {
        reset(defaultFormProductValue)
        setSelectedCategoryName('')
      }
    }
  }, [editProduct, isOpenModal, categories, reset])

  const handleCancel = () => {
    setOpenModal(false)
    dispatch(removeEditProduct())
  }

  const handleCoverImageUpdate = (url: string) => {
    setValue('coverImage', url)
  }

  const handleCategoryChange = (_value: string, option: any) => {
    setValue('categoryId', option.value)
    setSelectedCategoryName(option.label)
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
        toast.success('Create Product Successfully!')
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
    Object.entries(errors).forEach(([, error]) => {
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
          <Typography.Title level={5}>Price</Typography.Title>
          <Controller
            control={control}
            name='price'
            render={({ field }) => (
              <Input value={field.value} onChange={field.onChange} placeholder='input price' type='number' />
            )}
          />
          <Typography.Title level={5}>Category</Typography.Title>
          <Controller
            control={control}
            name='categoryId'
            render={() => (
              <AutoComplete
                style={{ width: '100%' }}
                value={selectedCategoryName}
                onChange={handleCategoryChange}
                options={categories.map((cat) => ({ value: cat.id.toString(), label: cat.name }))}
                placeholder='input category'
              />
            )}
          />
        </Modal>
      </form>
    </>
  )
}
