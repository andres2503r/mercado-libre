import React, { FC, useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { IMakeSelectProps } from '../../interfaces/MakeSelect'
import { useFieldRender } from '../../hooks/fieldRender'
import { generateId } from '../../tools/generateId'
import { Select, SelectItem } from '@nextui-org/react'

const MakeSelect: FC<IMakeSelectProps> = ({ element, ...props }) => {
  const { render, checkField, liveData, liveSearching } = useFieldRender({ element, ...props })

  useEffect(() => {
    const subscription = props.watch((value, { name, type }) => { checkField(value, { name, type }) })
    return () => subscription.unsubscribe()
  }, [checkField, props, props.watch])

  const required: boolean = !!element?.validation?.required

  return (
    render
      ? <Controller
        control={props.control}
        name={element.name}
        rules={{
          required,
          pattern: {
            value: (element.validation) ? element.validation.regex as RegExp : /(.*)/,
            message: (element.validation?.message) ? element.validation.message : ''
          }
        }}
        render={({ field: { onChange, value }, fieldState: { invalid } }) => {
          return (
            <Select
              {...element}
              id={element.id ?? generateId()}
              onChange={onChange}
              label={liveSearching ? 'Loading...' : element.label}
              selectedKeys={[value]}
              errorMessage={invalid ? (element.validation.message ?? '') : undefined}
              isDisabled={element.disabled}
              radius='sm'
              aria-label='Select'
            >
              {
                (liveData || (element.options ?? [])).map((opt) => (
                  <SelectItem aria-label='SelectItem' key={opt.id} value={opt.id}>{opt.name}</SelectItem>
                ))
              }
            </Select>

          )
        }}
      />
      : <></>
  )
}

export default MakeSelect
