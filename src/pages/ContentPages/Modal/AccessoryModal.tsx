import { yupResolver } from '@hookform/resolvers/yup'
import { Input, Modal, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { Controller, FieldErrors, Resolver, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { createAccessory, updateAccessory } from '../../../redux/actions/accessory.action'
import { removeEditAccessory } from '../../../redux/slices/accessory.slice'
import { RootState, useAppDispatch } from '../../../redux/store'
import { defaultFormAccessoryValue, accessorySchema, updateAccessoryValuesType } from '../../../schema/accessory.schema'

export type FormAccessoryModalProps = {
  isOpenModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AccessoryModal({ isOpenModal, setOpenModal }: FormAccessoryModalProps) {
  const dispatch = useAppDispatch()

  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const { editAccessory } = useSelector((state: RootState) => state.accessory)

  const { control, handleSubmit, reset } = useForm<updateAccessoryValuesType>({
    resolver: yupResolver(accessorySchema) as unknown as Resolver<updateAccessoryValuesType>,
    mode: 'onBlur',
    defaultValues: defaultFormAccessoryValue
  })

  useEffect(() => {
    if (isOpenModal) {
      if (editAccessory) {
        reset({
          id: editAccessory.id,
          name: editAccessory.name,
          image: editAccessory.image,
          status: editAccessory.status
        })
      } else {
        reset(defaultFormAccessoryValue)
      }
    }
  }, [editAccessory, isOpenModal])

  const handleCancel = () => {
    setOpenModal(false)
    dispatch(removeEditAccessory())
  }

  const onSubmit: SubmitHandler<updateAccessoryValuesType> = async (data) => {
    setConfirmLoading(true)
    if (editAccessory) {
      if (data.name) {
        const resultAction: any = await dispatch(updateAccessory({ accessory: data }))
        if (updateAccessory.fulfilled.match(resultAction)) {
          toast.success('Update Accessory Successfully!')
          reset(defaultFormAccessoryValue)
          setConfirmLoading(false)
          setOpenModal(false)
        }
      }
    } else {
      const resultAction = await dispatch(createAccessory({ accessory: data }))
      if (createAccessory.fulfilled.match(resultAction)) {
        toast.success('Create Accessory Successfully!')
        reset(defaultFormAccessoryValue)
        setConfirmLoading(false)
        setOpenModal(false)
      }
    }
    reset(defaultFormAccessoryValue)
    setConfirmLoading(false)
    setOpenModal(false)
    handleCancel()
  }

  const onError: SubmitErrorHandler<updateAccessoryValuesType> = (errors: FieldErrors<updateAccessoryValuesType>) => {
    Object.entries(errors).forEach(([_field, error]) => {
      const errorMessage = error?.message
      errorMessage && toast.error(errorMessage)
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Modal
          title={editAccessory ? 'Edit Accessory' : 'Add New Accessory'}
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
