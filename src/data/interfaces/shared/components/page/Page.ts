import { IConfiguration } from '@interfaces/model/configurations/Configurations'

export interface IPage extends Pick<IConfiguration, 'configId'
  | 'configHeight'
  | 'configTitle'
  | 'configUrl'
  | 'configWidth'>{}
