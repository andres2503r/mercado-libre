import { FC } from 'react'
import { Controller } from 'react-hook-form'
import InputUpload from '../../../input-upload/InputUpload'
import { useFieldRender } from '../../hooks/fieldRender'
import { IMakeUploadProps } from '../../interfaces/MakeUpload'

const MakeUpload: FC<IMakeUploadProps> = (props) => {
  const { render, enable } = useFieldRender(props)

  return (
    render
      ? <Controller
        control={props.control}
        name={props.element.name}
        rules={{
          required: props.element.validation.required,
          pattern: {
            value: props.element.validation.regex as RegExp ?? /(.*)/,
            message: props.element.validation.message ?? ''
          }
        }}
        render={({ field: { onChange } }) => (
          <InputUpload
            id={props.element.id}
            name={props.element.name}
            disabled={props.element.disabled ?? !enable}
            onChange={onChange}
            label={props.element.label}
            helpText={props.element.helpText}
            style={props.element.styles}
            accept="image/jpeg,image/png,image/gif,image/bmp,image/tiff,image/webp,image/svg+xml,video/mp4,video/avi,video/mov,video/wmv,video/mkv,video/flv,video/webm,video/mpeg,video/3gp"
            read={props.element.read}
          />
        )}
      />
      : null
  )
}

export default MakeUpload
