import { NO_CONTENT, TYPE_INDEXES } from '@/constants'
import { BoxType, type FileImage, type FileTypesData } from '@/models'

// The getUint32() method of DataView instances reads 4 bytes starting at the specified
// byte offset of this DataView and interprets them as a 32-bit unsigned integer.
// There is no alignment constraint; multi-byte values may be fetched from any offset within bounds.
export const getBoxSize = (view: DataView, offset: number): number => {
  return view.getUint32(offset)
}

// The getUint8() method of DataView instances reads 1 byte
// at the specified byte offset of this DataView and interprets it as an 8-bit unsigned integer.
const getCharCode = (view: DataView, offset: number): number => {
  return view.getUint8(offset)
}

// The String.fromCharCode() static method returns a string created
// from the specified sequence of UTF-16 code units.
export const getBoxType = (view: DataView, offset: number): BoxType => {
  const type = TYPE_INDEXES.map((item) =>
    String.fromCharCode(getCharCode(view, offset + item))
  ).join('')
  return type as BoxType
}

export const formatDate_YYYY_MM_DD_TIME = (formattedDate = new Date()) => {
  return formattedDate.toISOString().replace(/T|Z/g, (match) => (match === 'T' ? ' ' : ''))
}

export const getFileImageInfo = (tag: Element): FileImage => {
  const attributes = tag.attributes
  const id = attributes.getNamedItem('xml:id')?.nodeValue ?? ''
  const encoding = attributes.getNamedItem('encoding')?.nodeValue ?? ''
  const type = attributes.getNamedItem('imagetype')?.nodeValue ?? ''
  const textContent = tag.textContent ?? ''
  return { id, src: `data:image/${id};${type};${encoding},${textContent}` }
}

export const getFileImages = (fileData: string): FileImage[] => {
  const parser = new DOMParser()
  const xmlDataFormat = parser.parseFromString(fileData, 'text/xml')
  const imageTags = xmlDataFormat.getElementsByTagName('smpte:image')
  return [...imageTags].reduce((acc: FileImage[], item: Element) => {
    const { id, src } = getFileImageInfo(item)
    return [...acc, { id, src }]
  }, [])
}

export const generateIndex = (index: number, type: BoxType, size: number): number => {
  if (type === BoxType.MOOF || type === BoxType.TRAF) return index + 8
  else return index + size
}

export const getMdatInfo = (
  arrayBufferStoreData: ArrayBuffer | null,
  offset = 0,
  size = 0,
  chunkSize = 1024 * 1024 // 1 MB chunk size
): { mdatTypeData: string; fileImages: FileImage[] } => {
  const decoder = new TextDecoder('utf-8')
  let mdatContent = ''

  if (arrayBufferStoreData) {
    let start = offset + 8
    let end = start + chunkSize

    while (start < offset + size) {
      if (end > offset + size) {
        end = offset + size
      }

      const chunk = new Uint8Array(arrayBufferStoreData, start, end - start)
      mdatContent += decoder.decode(chunk)

      start = end
      end = start + chunkSize
    }
  } else {
    mdatContent = NO_CONTENT
  }

  const currentDate = formatDate_YYYY_MM_DD_TIME()
  return {
    mdatTypeData: `${currentDate} Content of mdat box is: ${mdatContent}`,
    fileImages: getFileImages(mdatContent)
  }
}

export const getTypeStringData = ({ currentDate, boxType, boxSize }: FileTypesData): string => {
  return `${currentDate} Found box of type ${boxType} and size ${boxSize}`
}
