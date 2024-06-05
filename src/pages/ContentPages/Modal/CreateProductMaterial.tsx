// import { yupResolver } from '@hookform/resolvers/yup'
// import { Modal, Checkbox, Typography, Button } from 'antd'
// import { useEffect, useState } from 'react'
// import { Controller, useForm } from 'react-hook-form'
// import { useSelector } from 'react-redux'
// import { RootState, useAppDispatch } from '../../../redux/store'
// import { createProductMaterial } from '../../../redux/slices/productMaterial.slice'
// import { getColors } from '../../../redux/actions/color.action'
// import { getSizes } from '../../../redux/actions/size.action'
// import {
//   defaultFormProductMaterialValue,
//   productMaterialSchema,
//   ProductMaterialFormValues
// } from '../../../schema/productMaterial.schema'

// export type FormProductMaterialModalProps = {
//   isOpenModal: boolean
//   setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
//   productId: number
// }

// export default function ProductMaterialModal({ isOpenModal, setOpenModal, productId }: FormProductMaterialModalProps) {
//   const dispatch = useAppDispatch()
//   const { colors } = useSelector((state: RootState) => state.color)
//   const { sizes } = useSelector((state: RootState) => state.size)
//   const { control, handleSubmit, reset } = useForm<ProductMaterialFormValues>({
//     resolver: yupResolver(productMaterialSchema),
//     defaultValues: defaultFormProductMaterialValue
//   })

//   const [selectedColors, setSelectedColors] = useState<number[]>([])
//   const [selectedSizes, setSelectedSizes] = useState<number[]>([])

//   useEffect(() => {
//     if (isOpenModal) {
//       dispatch(getColors())
//       dispatch(getSizes())
//     }
//   }, [dispatch, isOpenModal])

//   const handleCancel = () => {
//     setOpenModal(false)
//     reset()
//     setSelectedColors([])
//     setSelectedSizes([])
//   }

//   const onSubmit = async (data: ProductMaterialFormValues) => {
//     await dispatch(
//       createProductMaterial({
//         colors: selectedColors,
//         sizes: selectedSizes,
//         productId
//       })
//     )
//     handleCancel()
//   }

//   const handleColorChange = (checkedValue: number) => {
//     setSelectedColors((prevState) =>
//       prevState.includes(checkedValue)
//         ? prevState.filter((color) => color !== checkedValue)
//         : [...prevState, checkedValue]
//     )
//   }

//   const handleSizeChange = (checkedValue: number) => {
//     setSelectedSizes((prevState) =>
//       prevState.includes(checkedValue)
//         ? prevState.filter((size) => size !== checkedValue)
//         : [...prevState, checkedValue]
//     )
//   }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Modal title='Create Product Material' open={isOpenModal} onOk={handleSubmit(onSubmit)} onCancel={handleCancel}>
//         <Typography.Title level={5}>Colors</Typography.Title>
//         <Controller
//           control={control}
//           name='colors'
//           render={() => (
//             <Checkbox.Group style={{ width: '100%' }} value={selectedColors}>
//               {colors.map((color) => (
//                 <Checkbox key={color.id} value={color.id} onChange={() => handleColorChange(color.id)}>
//                   {color.name}
//                 </Checkbox>
//               ))}
//             </Checkbox.Group>
//           )}
//         />

//         <Typography.Title level={5}>Sizes</Typography.Title>
//         <Controller
//           control={control}
//           name='sizes'
//           render={() => (
//             <Checkbox.Group style={{ width: '100%' }} value={selectedSizes}>
//               {sizes.map((size) => (
//                 <Checkbox key={size.id} value={size.id} onChange={() => handleSizeChange(size.id)}>
//                   {size.name}
//                 </Checkbox>
//               ))}
//             </Checkbox.Group>
//           )}
//         />
//       </Modal>
//     </form>
//   )
// }
