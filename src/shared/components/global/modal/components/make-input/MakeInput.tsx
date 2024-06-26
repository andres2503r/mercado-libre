import React, { FC, useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { Input } from '@nextui-org/react'
import { generateId } from '../../tools/generateId'
import { useFieldRender } from '../../hooks/fieldRender'
import { IMakeInputProps } from '../../interfaces/MakeField'

const MakeInput: FC<IMakeInputProps> = ({ element, ...props }) => {
  const { render, enable, checkField } = useFieldRender({ element, ...props })

  useEffect(() => {
    const subscription = props.watch((value, { name, type }) => checkField(value, { name, type }))
    return () => subscription.unsubscribe()
  }, [checkField, props])
  return (
    render
      ? <Controller
        control={props.control}
        name={element.name}
        rules={{
          required: element.validation.required,
          pattern: {
            value: element.validation.regex as RegExp ?? /(.*)/,
            message: element.validation.message ?? ''
          }
        }}
        render={({ field: { onChange, value }, fieldState: { invalid } }) => (
          <Input
            {...element}
            id={element.id ?? generateId()}
            size={'sm'}
            onChange={onChange}
            value={value ?? ''}
            errorMessage={invalid ? (element.validation.message ?? '') : undefined}
            disabled={element.disabled ?? !enable}
            placeholder={element.placeHolder}
            min={element.type === 'number' ? 1 : undefined}
          />
        )}
      />
      : null
  )
}

export default MakeInput
