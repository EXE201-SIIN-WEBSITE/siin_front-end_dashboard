/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup'
import { Input, Modal, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { Controller, FieldErrors, Resolver, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { createSize, updateSize } from '../../../redux/actions/size.action'
import { removeEditSize } from '../../../redux/slices/size.slice'
import { RootState, useAppDispatch } from '../../../redux/store'
import { defaultFormSizeValue, sizeSchema, updateSizeValuesType } from '../../../schema/size.schema'

export type FormSizeModalProps = {
  isOpenModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SizeModal({ isOpenModal, setOpenModal }: FormSizeModalProps) {
  const dispatch = useAppDispatch()

  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const { editSize } = useSelector((state: RootState) => state.size)

  const { control, handleSubmit, reset } = useForm<updateSizeValuesType>({
    resolver: yupResolver(sizeSchema) as unknown as Resolver<updateSizeValuesType>,
    mode: 'onBlur',
    defaultValues: defaultFormSizeValue
  })

  useEffect(() => {
    if (isOpenModal) {
      if (editSize) {
        reset({
          id: editSize.id,
          name: editSize.name,
          price: editSize.price
        })
      } else {
        reset(defaultFormSizeValue)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editSize, isOpenModal])

  const handleCancel = () => {
    setOpenModal(false)
    dispatch(removeEditSize())
  }

  const onSubmit: SubmitHandler<updateSizeValuesType> = async (data) => {
    setConfirmLoading(true)
    if (editSize) {
      if (data.name) {
        const resultAction: any = await dispatch(updateSize({ data: data, signal: new AbortController().signal }))
        if (updateSize.fulfilled.match(resultAction)) {
          toast.success('Update Size Successfully!')
          reset(defaultFormSizeValue)
          setConfirmLoading(false)
          setOpenModal(false)
        }
      }
    } else {
      const resultAction = await dispatch(createSize({ size: data }))
      if (createSize.fulfilled.match(resultAction)) {
        toast.success('Create Size Successfully!')
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
          title={editSize ? 'Edit Size' : 'Add New Size'}
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
