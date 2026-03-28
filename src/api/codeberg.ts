/// <reference types="vite/client" />

const CODEBERG_TOKEN = import.meta.env.VITE_CODEBERG_TOKEN
const CODEBERG_REPO = import.meta.env.VITE_CODEBERG_REPO // formato: "usuario/repo"

type CodebergUploadResponse = {
  content: {
    name: string
    path: string
    sha: string
    download_url: string
  }
}

/**
 * Sube una imagen al repositorio de Codeberg
 * @param file - Archivo a subir
 * @param filename - Nombre del archivo (opcional, usa el nombre original si no se especifica)
 * @returns URL de la imagen subida
 */
export const uploadImageToCodeberg = async (
  file: File,
  filename?: string
): Promise<string> => {
  if (!CODEBERG_TOKEN || !CODEBERG_REPO) {
    throw new Error('Faltan variables de entorno: VITE_CODEBERG_TOKEN y/o VITE_CODEBERG_REPO')
  }

  // Generar nombre único para evitar colisiones
  const timestamp = Date.now()
  const sanitizedName = (filename || file.name)
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .toLowerCase()
  const finalFilename = `${timestamp}_${sanitizedName}`

  // Convertir archivo a base64
  const base64Content = await fileToBase64(file)

  const apiUrl = `https://codeberg.org/api/v1/repos/${CODEBERG_REPO}/contents/${finalFilename}`

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `token ${CODEBERG_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `Upload: ${finalFilename}`,
      content: base64Content,
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    console.error('Codeberg upload error:', error)
    throw new Error(error.message || `Error al subir imagen: ${response.status}`)
  }

  const data: CodebergUploadResponse = await response.json()
  
  // Construir URL raw para acceder a la imagen
  // Formato: https://codeberg.org/usuario/repo/raw/branch/main/filename
  const rawUrl = `https://codeberg.org/${CODEBERG_REPO}/raw/branch/main/${finalFilename}`
  
  return rawUrl
}

/**
 * Elimina una imagen del repositorio de Codeberg
 * @param filename - Nombre del archivo a eliminar
 */
export const deleteImageFromCodeberg = async (filename: string): Promise<void> => {
  if (!CODEBERG_TOKEN || !CODEBERG_REPO) {
    throw new Error('Faltan variables de entorno: VITE_CODEBERG_TOKEN y/o VITE_CODEBERG_REPO')
  }

  // Primero obtener el SHA del archivo
  const getUrl = `https://codeberg.org/api/v1/repos/${CODEBERG_REPO}/contents/${filename}`
  
  const getResponse = await fetch(getUrl, {
    headers: {
      'Authorization': `token ${CODEBERG_TOKEN}`,
    },
  })

  if (!getResponse.ok) {
    if (getResponse.status === 404) {
      console.warn(`Archivo no encontrado en Codeberg: ${filename}`)
      return
    }
    throw new Error(`Error al obtener info del archivo: ${getResponse.status}`)
  }

  const fileInfo = await getResponse.json()

  // Eliminar el archivo
  const deleteResponse = await fetch(getUrl, {
    method: 'DELETE',
    headers: {
      'Authorization': `token ${CODEBERG_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `Delete: ${filename}`,
      sha: fileInfo.sha,
    }),
  })

  if (!deleteResponse.ok) {
    const error = await deleteResponse.json().catch(() => ({}))
    throw new Error(error.message || `Error al eliminar imagen: ${deleteResponse.status}`)
  }
}

/**
 * Extrae el nombre del archivo de una URL de Codeberg
 */
export const getFilenameFromCodebergUrl = (url: string): string | null => {
  try {
    // URL formato: https://codeberg.org/usuario/repo/raw/branch/main/filename
    const parts = url.split('/raw/branch/main/')
    return parts[1] || null
  } catch {
    return null
  }
}

// Helper: convertir File a base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      // Remover el prefijo "data:image/xxx;base64,"
      const base64 = result.split(',')[1]
      resolve(base64)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
