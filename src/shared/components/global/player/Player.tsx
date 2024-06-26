import React, { useCallback, useState } from 'react'
import ReactPlayer from 'react-player'
import { IPlayer } from '@interfaces/shared/components/player/Player'
import showToast from '../toast/Toast'
import { LuFileWarning } from 'react-icons/lu'

const Player: React.FC<IPlayer> = ({ url, onEnd }) => {
  const [error, setError] = useState(false)
  const [fileName, setFileName] = useState('')

  const handlePlayerError = useCallback((e: React.ReactElement) => {
    if (e && e.type === 'error') {
      const fileNameFromUrl = url.split('/').pop()
      const fileName = fileNameFromUrl ?? 'Unknown File'
      setFileName(fileName)
      showToast('error', `Error reproducing file: ${fileName}`)
      setError(true)
    }
  }, [url])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative">
        {error
          ? (
            <div className='flex flex-col gap-6 justify-center items-center'>
              <LuFileWarning color='white' size={80}/>
              <h1 className='text-white font-bold max-w-screen-lg text-center overflow-wrap-break-word text-6xl'>{`Corrupt file `}<span className='text-red-600 font-bold'>{fileName}</span></h1>
            </div>

          )
          : (
            <ReactPlayer
              url={url}
              width="100vw"
              height="100vh"
              playing={true}
              controls={false}
              loop={false}
              onEnded={onEnd}
              onError={handlePlayerError}
            />
          )}
      </div>
    </div>
  )
}

export default Player
