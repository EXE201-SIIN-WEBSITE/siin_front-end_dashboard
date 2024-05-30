import { Input, Modal, Typography } from 'antd'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { removeEditProduct } from '../../../redux/slices/product.slice.'

export type FormProductModalProps = {
  isOpenModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

import { Image } from 'antd' // Import the Image component from antd library

export default function ProductModal({ isOpenModal, setOpenModal }: FormProductModalProps) {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const dispatch = useDispatch()
  const { editProduct } = useSelector((state: RootState) => state.product)

  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setOpenModal(false)
      setConfirmLoading(false)
    }, 2000)
  }

  const handleCancel = () => {
    setOpenModal(false)
    dispatch(removeEditProduct())
  }

  return (
    <>
      <Modal
        title={editProduct ? 'Edit Product' : 'Add New Product'}
        open={isOpenModal}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {editProduct ? <Typography.Title level={5}>ID</Typography.Title> : ''}
        <Typography.Title level={5}>Name</Typography.Title>
        <Input placeholder='input name' />
        <Typography.Title level={5}>img</Typography.Title>
        <Image width={200} src={editProduct?.coverImage} />
        <Typography.Title level={5}>Quantity</Typography.Title>
        <Input placeholder='input quantity' type='number' />
        <Typography.Title level={5}>Price</Typography.Title>
        <Input placeholder='input price' type='number' />
      </Modal>
    </>
  )
}
