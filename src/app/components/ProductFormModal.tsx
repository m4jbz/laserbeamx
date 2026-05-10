import { useState, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Upload, X, Loader2, Image as ImageIcon, RefreshCw } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'

import { 
  createProduct, 
  updateProduct, 
  type Product, 
  type CreateProductDto 
} from '../../api/products'
import { uploadImageToCodeberg } from '../../api/codeberg'
import { useAuth } from '../context/AuthContext'

type FormData = {
  name: string
  description: string
  price: string // string para el input, se parsea después
}

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  product?: Product | null // null = crear nuevo, Product = editar
}

export function ProductFormModal({ open, onOpenChange, product }: Props) {
  const queryClient = useQueryClient()
  const isEditing = !!product
  const { token } = useAuth()

  // Estado para la imagen
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imageError, setImageError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      description: '',
      price: '',
    },
  })

  // Resetear form cuando cambia el producto o se abre el modal
  useEffect(() => {
    if (open) {
      if (product) {
        reset({
          name: product.name,
          description: product.description || '',
          price: product.price.toString(),
        })
        setImagePreview(product.imagePath)
        setImageFile(null)
      } else {
        reset({ name: '', description: '', price: '' })
        setImagePreview(null)
        setImageFile(null)
      }
      setImageError(null)
    }
  }, [open, product, reset])

  // Dropzone config
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      // Validar tamaño (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setImageError('La imagen no debe superar 5MB')
        return
      }
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
      setImageError(null)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif'],
    },
    maxFiles: 1,
  })

  const removeImage = () => {
    setImageFile(null)
    if (!isEditing) {
      setImagePreview(null)
    } else {
      // En edición, volver a la imagen original
      setImagePreview(product?.imagePath || null)
    }
  }

  // Mutation para crear
  const createMutation = useMutation({
    mutationFn: (data: CreateProductDto) => {
      if (!token) {
        throw new Error('No authenticated')
      }
      return createProduct(data, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      onOpenChange(false)
    },
  })

  // Mutation para actualizar
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateProductDto> }) => {
      if (!token) {
        throw new Error('No authenticated')
      }
      return updateProduct(id, data, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      onOpenChange(false)
    },
  })

  const isSubmitting = createMutation.isPending || updateMutation.isPending || uploadingImage

  const onSubmit = async (data: FormData) => {
    try {
      let imagePath = product?.imagePath || ''

      // Si hay nueva imagen, subirla a Codeberg
      if (imageFile) {
        setUploadingImage(true)
        try {
          imagePath = await uploadImageToCodeberg(imageFile)
        } catch (err) {
          setImageError(err instanceof Error ? err.message : 'Error al subir imagen')
          setUploadingImage(false)
          return
        }
        setUploadingImage(false)
      }

      // Validar que haya imagen
      if (!imagePath && !imageFile) {
        setImageError('Debes seleccionar una imagen')
        return
      }

      const productData: CreateProductDto = {
        name: data.name.trim(),
        description: data.description.trim() || undefined,
        price: parseFloat(data.price),
        imagePath,
      }

      if (isEditing && product) {
        // Solo enviar campos que cambiaron
        const updates: Partial<CreateProductDto> = {}
        if (productData.name !== product.name) updates.name = productData.name
        if (productData.description !== product.description) updates.description = productData.description
        if (productData.price !== product.price) updates.price = productData.price
        if (imagePath !== product.imagePath) updates.imagePath = imagePath

        if (Object.keys(updates).length > 0) {
          updateMutation.mutate({ id: product.id, data: updates })
        } else {
          onOpenChange(false) // No hay cambios
        }
      } else {
        createMutation.mutate(productData)
      }
    } catch (err) {
      console.error('Error en submit:', err)
    }
  }

  const mutationError = createMutation.error || updateMutation.error

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-[#111827] border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {isEditing 
              ? `Editando: ${product?.name}` 
              : 'Completa los campos para crear un nuevo producto'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Imagen Dropzone */}
          <div className="space-y-2">
            <Label>Imagen del producto</Label>
            {imagePreview && !imageFile ? (
              // Imagen existente (en modo edición) - permite hacer clic para cambiar
              <div
                {...getRootProps()}
                className="relative cursor-pointer group"
              >
                <input {...getInputProps()} />
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg border border-gray-700 group-hover:opacity-70 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black/70 px-4 py-2 rounded-lg flex items-center gap-2">
                    <RefreshCw className="h-5 w-5" />
                    <span>Cambiar imagen</span>
                  </div>
                </div>
              </div>
            ) : imagePreview && imageFile ? (
              // Nueva imagen seleccionada (preview del archivo nuevo)
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg border border-green-600"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={removeImage}
                  title={isEditing ? "Volver a imagen original" : "Quitar imagen"}
                >
                  <X className="h-4 w-4" />
                </Button>
                <span className="absolute bottom-2 left-2 bg-green-900/90 text-green-300 text-xs px-2 py-1 rounded">
                  Nueva: {imageFile.name}
                </span>
              </div>
            ) : (
              // Sin imagen - mostrar dropzone
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                  ${isDragActive 
                    ? 'border-green-500 bg-green-500/10' 
                    : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
                  }`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-2">
                  {isDragActive ? (
                    <>
                      <Upload className="h-10 w-10 text-green-500" />
                      <p className="text-green-500">Suelta la imagen aquí</p>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="h-10 w-10 text-gray-500" />
                      <p className="text-gray-400">
                        Arrastra una imagen o haz clic para seleccionar
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, WEBP (max 5MB)</p>
                    </>
                  )}
                </div>
              </div>
            )}
            {imageError && (
              <p className="text-red-500 text-sm">{imageError}</p>
            )}
          </div>

          {/* Nombre */}
          <div className="space-y-2">
            <Label htmlFor="name">Nombre *</Label>
            <Input
              id="name"
              placeholder="Nombre del producto"
              className="bg-gray-800 border-gray-700"
              {...register('name', { 
                required: 'El nombre es requerido',
                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Descripción del producto (opcional)"
              className="bg-gray-800 border-gray-700 min-h-[80px]"
              {...register('description')}
            />
          </div>

          {/* Precio */}
          <div className="space-y-2">
            <Label htmlFor="price">Precio (MXN) *</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              className="bg-gray-800 border-gray-700"
              {...register('price', { 
                required: 'El precio es requerido',
                min: { value: 0.01, message: 'El precio debe ser mayor a 0' },
                validate: (v) => !isNaN(parseFloat(v)) || 'Ingresa un número válido'
              })}
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>

          {/* Error general */}
          {mutationError && (
            <div className="bg-red-900/30 border border-red-700 text-red-400 px-4 py-2 rounded-lg text-sm">
              {mutationError instanceof Error ? mutationError.message : 'Error al guardar'}
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="bg-[#dd0000]"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#065F46] hover:bg-[#047857]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {uploadingImage ? 'Subiendo imagen...' : 'Guardando...'}
                </>
              ) : (
                isEditing ? 'Guardar Cambios' : 'Crear Producto'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
