import React, { ChangeEvent, FC, useMemo } from 'react'
import { generateId } from '../modal/tools/generateId'
import { IInputUpload } from '@interfaces/shared/components/input-upload/InputUpload'

interface IFileResult {
  name: string;
  size: number;
  data: string
}

const InputUpload: FC<IInputUpload> = ({ onChange, ...props }: IInputUpload) => {
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
    if (props.read && event.target.files) {
      readFileBlob(event.target.files[0], false)
        .then((result) => onChange(result))
        .catch((err) => {
          console.log('file read error', err)
          onChange('')
        })
    } else {
      onChange(event.target.files)
    }
  }

  const readFileBlob = (blob: File, image: boolean): Promise<IFileResult> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      image ? fileReader.readAsDataURL(blob) : fileReader.readAsText(blob)
      fileReader.onload = () => {
        const fileResult: IFileResult = {
          name: blob.name,
          size: blob.size,
          data: fileReader.result as string
        }

        resolve(fileResult)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  const elementId = useMemo<string>(
    () => {
      return props.id ?? generateId()
    }, [props.id]
  )

  return (
    <div className='flex flex-col w-full gap-1 text-center'>
      {props.label && <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-background" htmlFor={`file-input-${elementId}`}>{props.label}</label>}
      <input
        className="file:transition-all file:delay-150 block w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4 file:rounded-md
        file:border-0 file:text-sm file:font-semibold
        file:bg-gray-100 file:text-blue-600
        hover:file:bg-blue-700 hover:file:text-background cursor-pointer disabled:cursor-not-allowed"
        aria-describedby={`file-input-${elementId}-help`}
        id={`file-input-${elementId}`}
        type="file"
        onChange={(e) => {
          onChangeHandler(e, onChange)
        }}
        {...props}
      />
      <p
        className="mt-1 text-sm text-gray-500 dark:text-gray-300 text-start"
        id={`file-input-${elementId}-help`}>
        {props.helpText?.toUpperCase()}
      </p>
    </div>
  )
}

export default InputUpload
