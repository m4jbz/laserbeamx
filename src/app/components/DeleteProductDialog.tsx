import { Loader2, AlertTriangle } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from './ui/alert-dialog'

import type { Product } from '../../api/products'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: Product | null
  onConfirm: () => void
  isDeleting: boolean
}

export function DeleteProductDialog({ 
  open, 
  onOpenChange, 
  product, 
  onConfirm, 
  isDeleting 
}: Props) {
  if (!product) return null

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-[#111827] border-gray-800 text-white">
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-900/30 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <AlertDialogTitle className="text-xl">
              Eliminar Producto
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-gray-400 pt-2">
            ¿Estás seguro de que deseas eliminar{' '}
            <span className="text-white font-semibold">"{product.name}"</span>?
            <br />
            <span className="text-red-400 text-sm mt-2 block">
              Esta acción no se puede deshacer.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Preview del producto a eliminar */}
        <div className="flex items-center gap-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
          <img
            src={product.imagePath}
            alt={product.name}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <div>
            <p className="font-semibold">{product.name}</p>
            <p className="text-green-500 font-bold">${product.price.toFixed(2)}</p>
          </div>
        </div>

        <AlertDialogFooter className="gap-2 sm:gap-0">
          <AlertDialogCancel 
            disabled={isDeleting}
            className="bg-transparent border-gray-600 text-white hover:bg-gray-800"
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              onConfirm()
            }}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Eliminando...
              </>
            ) : (
              'Sí, Eliminar'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
