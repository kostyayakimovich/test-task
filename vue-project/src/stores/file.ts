import { defineStore } from 'pinia'
import { getArrayBuffer } from '@/api'
import {
  formatDate_YYYY_MM_DD_TIME,
  generateIndex,
  getBoxSize,
  getBoxType,
  getMdatInfo
} from '@/utils'
import { BoxType, type BoxData } from '@/models'

export type FileState = {
  arrayBufferStoreData: ArrayBuffer | null
  boxStoreData: BoxData
}

export const useFileStore = defineStore('file', {
  state: (): FileState => ({
    arrayBufferStoreData: null,
    boxStoreData: { mdatTypeData: '', fileTypesData: [], fileImages: [] }
  }),
  actions: {
    async setArrayBufferData() {
      try {
        const result = await getArrayBuffer()
        if (result) this.arrayBufferStoreData = result
      } catch (error) {
        console.error(error)
      }
    }
  },
  getters: {
    boxData: ({ arrayBufferStoreData, boxStoreData }): BoxData => {
      const view = arrayBufferStoreData ? new DataView(arrayBufferStoreData) : null
      let index = 0
      const currentDate = formatDate_YYYY_MM_DD_TIME()
      while (view && arrayBufferStoreData?.byteLength && index < arrayBufferStoreData.byteLength) {
        const boxType = getBoxType(view, index)
        const boxSize = getBoxSize(view, index)

        if (boxType === BoxType.MDAT) {
          const { mdatTypeData, fileImages } = getMdatInfo(arrayBufferStoreData, index, boxSize)
          boxStoreData.fileImages = fileImages
          boxStoreData.mdatTypeData = mdatTypeData
        }
        boxStoreData.fileTypesData.push({
          currentDate,
          boxType,
          boxSize
        })

        index = generateIndex(index, boxType, boxSize)
      }
      return boxStoreData
    },

    fileImages: ({ boxStoreData }) => boxStoreData.fileImages,
    mdatTypeData: ({ boxStoreData }) => boxStoreData.mdatTypeData,
    fileTypesData: ({ boxStoreData }) => boxStoreData.fileTypesData
  }
})
