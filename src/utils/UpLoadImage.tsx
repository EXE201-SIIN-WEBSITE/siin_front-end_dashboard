import { GetProp, Modal, Upload, UploadFile, UploadProps } from 'antd'
import ImgCrop from 'antd-img-crop'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { deleteProductSubImage } from '../redux/actions/product.actions'
import { useAppDispatch } from '../redux/store'
import { Product } from '../types/product.type'

type UploadImageProps = {
  product: Product | null
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const UploadImage = ({ product }: UploadImageProps) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const dispatch = useAppDispatch()

  useEffect(() => {
    const uploadFileList: UploadFile[] =
      (product?.SubImages &&
        product?.SubImages.map((img) => ({
          uid: String(img.id),
          name: 'image.png',
          status: 'done',
          url: img.url ?? img.id
        }))) ||
      []

    setFileList(uploadFileList)
  }, [product?.SubImages])

  const handleCancel = () => setPreviewOpen(false)

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      toast.error('You can only upload JPG/PNG file!')
    }
    return isJpgOrPng
  }

  const handleRemove = async (file: UploadFile) => {
    try {
      const resultAction = await dispatch(deleteProductSubImage(Number(file.uid)))
      if (deleteProductSubImage.fulfilled.match(resultAction)) {
        setFileList((prevFileList) => prevFileList.filter((item) => item.uid !== file.uid))
        toast.success('Delete Image Successfully!')
      } else {
        toast.error('Delete Image Fail!')
      }
    } catch (error) {
      toast.error('Delete Image Fail!')
    }
  }

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList, file }) => {
    setFileList(newFileList)
    if (file && file.status === 'done') {
      toast.success('Upload Image Successfully!')
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
    setPreviewImage(src)
    setPreviewOpen(true)
  }

  return (
    <>
      <ImgCrop rotationSlider aspectSlider cropShape='rect' modalWidth={600}>
        <Upload
          name='file'
          action={`http://172.171.207.227:8080/api/v1/product-sub-image/${product?.id}`}
          listType='picture-card'
          beforeUpload={beforeUpload}
          fileList={fileList}
          onRemove={handleRemove}
          onChange={onChange}
          onPreview={onPreview}
          multiple
        >
          {fileList.length < 4 && '+ Upload'}
        </Upload>
      </ImgCrop>
      <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
        <img alt='example' style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  )
}

export default UploadImage
