import { Select, SelectItem } from '@nextui-org/react'
import React, { FC } from 'react'
import { generateId } from '../modal/tools/generateId'
import { ICustomSelect } from '@interfaces/shared/components/custom-select/CustomSelect'

const CustomSelect: FC<ICustomSelect> = (props) => {
  // const disabled = props.disabled || (props.dynamicData && props.options.length < 1)

  return (
    <Select
      id={props.id ?? generateId() }
      items={props.options}
      label={props.label}
      placeholder={props.placeholder}
      className={props.className}
      isDisabled={props.disabled}
      disabledKeys={props.disabledOptions}
      size={props.size}
      variant={props.variant}
      radius={props.radius}
      labelPlacement={props.labelPlacement}
      startContent={props.startContent}
      description={props.description}
      onChange={props.onChange}
      selectionMode={props.selectionMode}
      classNames={{
        base: `${props.classNames?.base}`,
        label: `${props.classNames?.label}`,
        trigger: `border ${props.classNames?.trigger}`,
        innerWrapper: `${props.classNames?.innerWrapper}`,
        mainWrapper: `${props.classNames?.mainWrapper}`,
        errorMessage: `${props.classNames?.errorMessage}`,
        selectorIcon: `${props.classNames?.selectorIcon}`,
        value: `${props.classNames?.value}`,
        listboxWrapper: `${props.classNames?.listboxWrapper}`,
        listbox: `${props.classNames?.listbox}`,
        popoverContent: `${props.classNames?.popoverContent}`,
        helperWrapper: `${props.classNames?.helperWrapper}`,
        description: `${props.classNames?.description}`
      }}

    >
      {(option) => <SelectItem key={option.id}>{option.name}</SelectItem>}
    </Select>

  )
}

export default CustomSelect
