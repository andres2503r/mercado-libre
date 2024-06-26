import { NextPage } from 'next'
import { useCallback, useEffect } from 'react'
import { Image } from '@nextui-org/react'
import useReproductionModel from '@model/playback/PlaybackModel'
import Player from '@components/global/player/Player'
import Spinner from '@components/global/spinner/Spinner'
import ScreenStatus from '@components/page/screen-status/ScreenStatus'
import { ERROR_COUNTER } from '../data/constant/constant'
import useSpinnerModel from '@model/spinner/SpinnerModel'
import { IConfigFile, IConfiguration } from '@interfaces/model/configurations/Configurations'
import Page from '@components/global/page/Page'
import { IFile } from '@interfaces/model/files/Files'
import { Mosaic } from '@components/global/mosaic/Mosaic'

const DynamicPage: NextPage = () => {
  const { playbackStorage, updateSelected } = useReproductionModel()
  const { spinnerStorage } = useSpinnerModel()

  const getTimeInMilliseconds = useCallback((timeString: string): number => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number)
    return (hours * 60 * 60 + minutes * 60 + seconds) * 1000
  }, [])

  const Playback = () => {
    const data = Array.from(playbackStorage.list.values())

    if (playbackStorage.errorCounter === ERROR_COUNTER) return <ScreenStatus state='unauthorized'/>

    if (!playbackStorage.screenState) return <ScreenStatus state='inactive'/>

    if (data.length === 0 || playbackStorage.noData) return <ScreenStatus state='noData' />

    const config: IConfiguration | null = playbackStorage.selected

    if (config === null) return <ScreenStatus state='noData' />
    console.log('config', config)

    const file: IFile | null = config.configType === 'image/video' ? config.files[0].file : null

    const fileMosaic: Array<IConfigFile> | null = config.configType === 'mosaic' ? config.files : null

    return (
      <div className={` w-full h-full ${config.configType === 'page' ? 'bg-white' : 'bg-black'} flex items-center justify-center `} >
        {
          config.configType === 'mosaic'
            ? <Mosaic files={fileMosaic || []}/>
            : config.configType === 'page'
              ? <Page {...config}/>
              : file?.fileType === 'image'
                ? <Image className='!max-w-[99vw] imageFadeIn w-full max-h-[99vh]' alt={`${config.configTitle}`} src={file?.url}/>
                : file?.fileType === 'video'
                  ? <Player url={file?.url} onEnd={() => updateSelected(playbackStorage.index)}/>
                  : null
        }
      </div>
    )
  }

  useEffect(() => {
    const active: Array<IConfiguration> = Array.from(playbackStorage.list.values()).filter((conf) => conf.configStatus)
    const useTimeout: boolean = active.length > 1
    let timeout: any | undefined
    if (playbackStorage.selected && playbackStorage.selected.configTime !== null) {
      if (useTimeout) {
        const time: number = getTimeInMilliseconds(playbackStorage.selected.configTime)
        timeout = setTimeout(() => {
          updateSelected(playbackStorage.index)
        }, time)
      }
    }
    return () => {
      clearTimeout(timeout)
    }
  }, [
    getTimeInMilliseconds,
    playbackStorage.index,
    playbackStorage.list,
    playbackStorage.selected,
    updateSelected
  ])

  return (
    <div className='w-full max-w-[100vw] h-[100vh] max-h-[100vh]'>
      <Spinner open={spinnerStorage}/>
      <Playback/>
    </div>
  )
}

export default DynamicPage
