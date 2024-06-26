export type screenState = 'unauthorized' | 'inactive' | 'noData'
type images = 'unauthorized.svg' | 'inactive.svg' | 'nodata.jpg'

export interface IScreenStatus {
  state: screenState
}

export interface IConfigStatus {
  imageName: images;
  title: string;
  description: string;
}

export interface IConfig {
  unauthorized: IConfigStatus,
  noData: IConfigStatus,
  inactive: IConfigStatus,
}
