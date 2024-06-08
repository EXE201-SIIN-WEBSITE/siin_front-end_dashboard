import { Button, Modal } from 'antd'
import { useState } from 'react'

interface OrderItemModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  onCancel: () => void
  OrderDetailId: number
}

const OrderItem = ({ open, setOpen, onCancel, OrderDetailId }: OrderItemModalProps) => {
  const [loading, setLoading] = useState(false)
  const showLoading = () => {
    setOpen(true)
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  console.log(OrderDetailId)

  return (
    <>
      <Button type='primary' onClick={showLoading}>
        Open Modal
      </Button>
      <Modal
        title={<p>Loading Modal</p>}
        footer={
          <Button type='primary' onClick={showLoading}>
            Reload
          </Button>
        }
        loading={loading}
        open={open}
        onCancel={() => setOpen(false)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  )
}
