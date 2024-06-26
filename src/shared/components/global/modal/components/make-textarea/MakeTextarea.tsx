import React, { FC, useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { useFieldRender } from '../../hooks/fieldRender'
import { generateId } from '../../tools/generateId'
import { IMakeTextareaProps } from '../../interfaces/MakeTextarea'
import { Textarea } from '@nextui-org/react'

const MakeTextarea: FC<IMakeTextareaProps> = ({ element, ...props }) => {
  const { render, enable, checkField } = useFieldRender({ element, ...props })

  useEffect(() => {
    const subscription = props.watch((value, { name, type }) => checkField(value, { name, type }))
    return () => subscription.unsubscribe()
  }, [checkField, props, props.watch])

  return (
    render
      ? <Controller
        name={element.name}
        control={props.control}
        rules={{
          required: !!element?.validation?.required,
          pattern: {
            value: (element.validation)
              ? element.validation.regex as RegExp
              : /(.*)/,
            message: (element.validation?.message)
              ? element.validation.message
              : ''
          },
          maxLength: {
            value: (element.validation?.maxCharacters)
              ? element.validation.maxCharacters?.value
              : 100000000000,
            message: (element.validation?.maxCharacters)
              ? element.validation.maxCharacters.message
              : ''
          },
          minLength: {
            value: (element.validation?.minCharacters)
              ? element.validation.minCharacters?.value
              : 1,
            message: (element.validation?.minCharacters)
              ? element.validation.minCharacters.message
              : ''
          }
        }}
        render={({ field: { onChange, value }, fieldState: { invalid, error } }) => {
          const validation = element.validation

          const errorMessage = error?.type === 'maxLength'
            ? validation?.maxCharacters?.message
            : error?.type === 'minLength'
              ? validation?.minCharacters?.message
              : invalid
                ? validation?.message
                : ''

          return (
            <Textarea
              {...element}
              id={element.id ?? generateId()}
              onChange={onChange}
              label={element.label}
              value={value ?? ''}
              errorMessage={invalid ? errorMessage : ''}
              disabled={element.disabled ?? !enable}
              required={validation.required}
              radius='md'
            />

          )
        }}
      />
      : null
  )
}

export default MakeTextarea
