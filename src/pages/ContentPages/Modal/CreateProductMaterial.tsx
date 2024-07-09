/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup'
import { Modal, Checkbox, Typography, Input } from 'antd'
import { useEffect, useState } from 'react'
import { Controller, FieldErrors, Resolver, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../../redux/store'

import { createProductMaterial, getProductMaterial } from '../../../redux/actions/productmaterial.action'
import {
  ProductMaterialCreateSchema,
  defaultFormProductMaterialCreateValue,
  updateProductMaterialCreateValue
} from '../../../schema/createProductMaterial.schema'
import { getAllColor } from '../../../redux/actions/color.action'
import { getAllSize } from '../../../redux/actions/size.action'
import toast from 'react-hot-toast'

export type FormProductMaterialModalProps = {
  isOpenModalCreate: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  productId: number
}

export default function CreateProductMaterialModal({
  isOpenModalCreate,
  setOpenModal,
  productId
}: FormProductMaterialModalProps) {
  const dispatch = useAppDispatch()
  const { colors } = useSelector((state: RootState) => state.color)
  const { sizes } = useSelector((state: RootState) => state.size)
  const { control, handleSubmit, reset } = useForm<updateProductMaterialCreateValue>({
    resolver: yupResolver(ProductMaterialCreateSchema) as unknown as Resolver<updateProductMaterialCreateValue>,
    defaultValues: defaultFormProductMaterialCreateValue
  })

  const [selectedColors, setSelectedColors] = useState<number[]>([])
  const [selectedSizes, setSelectedSizes] = useState<number[]>([])

  useEffect(() => {
    if (isOpenModalCreate) {
      const abortController = new AbortController()
      const signal = abortController.signal
      dispatch(getAllColor(signal))
      dispatch(getAllSize({ signal }))
      return () => abortController.abort()
    }
  }, [dispatch, isOpenModalCreate])

  const handleCancel = () => {
    setOpenModal(false)
    reset()
    setSelectedColors([])
    setSelectedSizes([])
  }

  const onSubmit: SubmitHandler<updateProductMaterialCreateValue> = async (data: updateProductMaterialCreateValue) => {
    if (selectedColors.length === 0 || selectedSizes.length === 0) {
      toast.error('At least one color and one size must be selected')
      return
    }
    const create = await dispatch(
      createProductMaterial({
        listColor: selectedColors,
        listSize: selectedSizes,
        product: { ...data, productId }
      })
    )
    if (create.meta.requestStatus === 'fulfilled') {
      dispatch(getProductMaterial({ signal: new AbortController().signal }) as any)
      handleCancel()
    }
  }

  const handleColorChange = (checkedValue: number) => {
    setSelectedColors((prevState) =>
      prevState.includes(checkedValue)
        ? prevState.filter((color) => color !== checkedValue)
        : [...prevState, checkedValue]
    )
  }

  const handleSizeChange = (checkedValue: number) => {
    setSelectedSizes((prevState) =>
      prevState.includes(checkedValue)
        ? prevState.filter((size) => size !== checkedValue)
        : [...prevState, checkedValue]
    )
  }

  const onError: SubmitErrorHandler<updateProductMaterialCreateValue> = (
    errors: FieldErrors<updateProductMaterialCreateValue>
  ) => {
    Object.entries(errors).forEach(([, error]) => {
      const errorMessage = error?.message
      errorMessage && toast.error(errorMessage)
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Modal
        title={'Create Product Material'}
        open={isOpenModalCreate}
        onOk={handleSubmit(onSubmit, onError)}
        onCancel={handleCancel}
      >
        <Typography.Title level={5}>Colors</Typography.Title>
        <Controller
          control={control}
          name='listColor'
          render={() => (
            <Checkbox.Group style={{ width: '100%' }} value={selectedColors}>
              {colors.map((color) => (
                <Checkbox key={color.id} value={color.id} onChange={() => handleColorChange(color.id)}>
                  {color.name}
                </Checkbox>
              ))}
            </Checkbox.Group>
          )}
        />

        <Typography.Title level={5}>Sizes</Typography.Title>
        <Controller
          control={control}
          name='listSize'
          render={() => (
            <Checkbox.Group style={{ width: '100%' }} value={selectedSizes}>
              {sizes.map((size) => (
                <Checkbox key={size.id} value={size.id} onChange={() => handleSizeChange(size.id)}>
                  {size.name}
                </Checkbox>
              ))}
            </Checkbox.Group>
          )}
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
      </Modal>
    </form>
  )
}
