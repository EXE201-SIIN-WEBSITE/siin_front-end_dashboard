import { Modal } from 'antd'
import { useState } from 'react'
import { Product } from '../../../types/product.type'

export type FormProductModalProps = {
  isOpenModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ProductModal({ isOpenModal, setOpenModal }: FormProductModalProps) {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [modalText, setModalText] = useState<string>('Content of the modal')

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds')
    setConfirmLoading(true)
    setTimeout(() => {
      setOpenModal(false)
      setConfirmLoading(false)
    }, 2000)
  }

  return (
    <>
      <Modal title='Title' open={isOpenModal} onOk={handleOk} confirmLoading={confirmLoading}>
        <p>{modalText}</p>
      </Modal>
    </>
  )
}
