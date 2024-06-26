import { IPage } from '@interfaces/shared/components/page/Page'
import { FC } from 'react'

const Page: FC<IPage> = ({ configId, configTitle, configUrl, configHeight, configWidth }) => {
  return (
    <iframe
      id={configId}
      title={configTitle}
      src ={configUrl}
      width={configWidth ?? '100%'}
      height={configHeight ?? '100%'}
    />
  )
}

export default Page
