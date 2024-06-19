import { GetProp, Modal, Upload, UploadFile, UploadProps } from 'antd'
import ImgCrop from 'antd-img-crop'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useAppDispatch } from '../redux/store'
import { Accessory } from '../types/accessory.type'
import { deleteAccessoryImage } from '../redux/actions/accessory.action'

type UploadImageProps = {
  product: Accessory
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const UploadAccessoryImage = ({ product }: UploadImageProps) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const dispatch = useAppDispatch()

  useEffect(() => {
    const uploadFileList: UploadFile[] =
      (product?.image && [
        {
          uid: String(product?.image),
          name: 'image.png',
          status: 'done',
          url: product?.image ?? null
        }
      ]) ||
      []

    setFileList(uploadFileList)
  }, [product?.image])

  const handleCancel = () => setPreviewOpen(false)

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      toast.error('You can only upload JPG/PNG file!')
    }
    return isJpgOrPng
  }

  const handleRemove = async () => {
    dispatch(deleteAccessoryImage({ id: product?.id }))
      .then((resultAction: any) => {
        if (deleteAccessoryImage.fulfilled.match(resultAction)) {
          setFileList([])
          toast.success('Delete Image Successfully!')
        } else {
          toast.error('Delete Image Fail!')
        }
      })
      .catch(() => {
        toast.error('Delete Image Fail!')
      })
  }

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList, file }) => {
    setFileList(newFileList.slice(-1)) // Ensure only one image is in the list
    if (file && file.status === 'done') {
      toast.success('Upload Image Post Successfully!')
    } else if (file && file.status === 'error') {
      toast.error(`${file.name} file upload failed.`)
    }
  }

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj as FileType)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  return (
    <>
      <ImgCrop rotationSlider aspectSlider cropShape='rect' modalWidth={600}>
        <Upload
          name='file'
          action={`https://exe201-backend.click/api/v1/accessory/create-image/${product?.id}`}
          listType='picture-card'
          beforeUpload={beforeUpload}
          fileList={fileList}
          onRemove={handleRemove}
          onChange={onChange}
          onPreview={onPreview}
        >
          {fileList.length < 1 && '+ Upload'}
        </Upload>
      </ImgCrop>
      <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
        <img alt='example' style={{ width: '100%' }} />
      </Modal>
    </>
  )
}

export default UploadAccessoryImage
