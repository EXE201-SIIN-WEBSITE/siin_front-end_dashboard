/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup'
import { Input, Modal, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { Controller, FieldErrors, Resolver, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../../redux/store'
import { defaultFormSizeValue, sizeSchema, updateSizeValuesType } from '../../../schema/size.schema'
import { removeColorEidt } from '../../../redux/slices/color.slice'
import { createColor, updateColor } from '../../../redux/actions/color.action'

export type FormSizeModalProps = {
  isOpenModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ColorModal({ isOpenModal, setOpenModal }: FormSizeModalProps) {
  const dispatch = useAppDispatch()

  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const { editColor } = useSelector((state: RootState) => state.color)

  const { control, handleSubmit, reset } = useForm<updateSizeValuesType>({
    resolver: yupResolver(sizeSchema) as unknown as Resolver<updateSizeValuesType>,
    mode: 'onBlur',
    defaultValues: defaultFormSizeValue
  })

  useEffect(() => {
    if (isOpenModal) {
      if (editColor) {
        reset({
          id: editColor.id,
          name: editColor.name,
          price: editColor.price
        })
      } else {
        reset(defaultFormSizeValue)
      }
    }
  }, [editColor, isOpenModal])

  const handleCancel = () => {
    setOpenModal(false)
    dispatch(removeColorEidt())
  }

  const onSubmit: SubmitHandler<updateSizeValuesType> = async (data) => {
    setConfirmLoading(true)
    if (editColor) {
      if (data.name) {
        const resultAction: any = await dispatch(updateColor({ data: data, signal: new AbortController().signal }))
        if (updateColor.fulfilled.match(resultAction)) {
          toast.success('Update Color Successfully!')
          reset(defaultFormSizeValue)
          setConfirmLoading(false)
          setOpenModal(false)
        }
      }
    } else {
      const resultAction = await dispatch(createColor({ color: data }))
      if (createColor.fulfilled.match(resultAction)) {
        toast.success('Create Color Successfully!')
        reset(defaultFormSizeValue)
        setConfirmLoading(false)
        setOpenModal(false)
      }
    }
    reset(defaultFormSizeValue)
    setConfirmLoading(false)
    setOpenModal(false)
    handleCancel()
  }

  const onError: SubmitErrorHandler<updateSizeValuesType> = (errors: FieldErrors<updateSizeValuesType>) => {
    Object.entries(errors).forEach(([, error]) => {
      const errorMessage = error?.message
      errorMessage && toast.error(errorMessage)
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Modal
          title={editColor ? 'Edit Color' : 'Add New Color'}
          open={isOpenModal}
          onOk={handleSubmit(onSubmit, onError)}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <Typography.Title level={5}>Name</Typography.Title>
          <Controller
            control={control}
            name='name'
            render={({ field }) => <Input value={field.value} onChange={field.onChange} placeholder='Input name' />}
          />
          <Typography.Title level={5}>Price</Typography.Title>
          <Controller
            control={control}
            name='price'
            render={({ field }) => <Input value={field.value} onChange={field.onChange} placeholder='Input price' />}
          />
        </Modal>
      </form>
    </>
  )
}
