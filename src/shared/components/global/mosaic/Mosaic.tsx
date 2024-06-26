import React from 'react'
import { IConfigFile } from '@interfaces/model/configurations/Configurations'

export function Mosaic ({ files }: {files: Array<IConfigFile>}) {
  const sortedFiles = files.sort((a, b) => a.fileOrder - b.fileOrder).map(e => e.file)
  const gridCols = sortedFiles.length < 2 ? 'grid-cols-1' : sortedFiles.length < 5 ? 'grid-cols-2' : sortedFiles.length < 10 ? 'grid-cols-3' : sortedFiles.length < 13 ? 'grid-cols-4' : 'grid-cols-6'
  return (
    <div className={`w-screen max-h-screen h-screen max-w-screen bg-slate-800 grid ${gridCols}`}>
      {
        sortedFiles.map(file => (
          <div className='flex items-center justify-center w-full h-full border border-black border-solid' key={file.fileId}>
            <section className="w-[100%] h-[100%] bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url('${file.url}')` }}>
            </section>
          </div>
        ))
      }
    </div>
  )
}
