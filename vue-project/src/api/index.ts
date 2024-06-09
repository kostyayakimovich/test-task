import { DEMO_CASTLABS_URL } from '@/constants'

export const getArrayBuffer = async (): Promise<ArrayBuffer | null> => {
  try {
    const response = await fetch(DEMO_CASTLABS_URL)
    const arrayBufferData = await response.arrayBuffer()
    if (arrayBufferData) {
      console.log(`Successfully loaded file ${DEMO_CASTLABS_URL}`)
      return arrayBufferData
    }
  } catch (error) {
    console.error(error)
  }
  return null
}
