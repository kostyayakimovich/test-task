export enum BoxType {
  MDAT = 'mdat',
  MOOF = 'moof',
  TRAF = 'traf'
}

export type FileTypesData = {
  currentDate: string
  boxType: string
  boxSize: number
}

export type FileImage = {
  id: string
  src: string
}

export type BoxData = {
  mdatTypeData: string
  fileTypesData: FileTypesData[]
  fileImages: FileImage[]
}
