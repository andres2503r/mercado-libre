import React, { FC, useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { IMakeMultiSelectProps } from '../../interfaces/MakeMultiSelect'
import { useFieldRender } from '../../hooks/fieldRender'
import { generateId } from '../../tools/generateId'
import { Select, SelectItem } from '@nextui-org/react'

const MakeMultiSelect: FC<IMakeMultiSelectProps> = ({ element, ...props }) => {
  const { render, enable, checkField, liveData, liveSearching } = useFieldRender({ element, ...props })

  useEffect(() => {
    const subscription = props.watch((value, { name, type }) => checkField(value, { name, type }))
    return () => subscription.unsubscribe()
  }, [checkField, props, props.watch])

  return (
    render
      ? <Controller
        control={props.control}
        name={element.name}
        rules={{
          required: !!element?.validation?.required,
          pattern: {
            value: (element.validation) ? element.validation.regex as RegExp : /(.*)/,
            message: (element.validation?.message) ? element.validation.message : ''
          }
        }}
        render={({ field: { onChange, value }, fieldState: { invalid } }) => (
          <Select
            {...element}
            id={element.id ?? generateId()}
            onSelectionChange={onChange}
            label={liveSearching ? 'Loading...' : element.label}
            selectionMode="multiple"
            selectedKeys={value}
            errorMessage={invalid ? (element.validation.message ?? '') : undefined}
            disabled={element.disabled ?? !enable}
          >
            {
              (liveData || (element.options ?? [])).map((opt) => (
                <SelectItem key={opt.id} value={opt.id}>{opt.name}</SelectItem>
              ))
            }
          </Select>

        )
        }
      />
      : null
  )
}

export default MakeMultiSelect
