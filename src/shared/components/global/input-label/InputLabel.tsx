import React, { FC, useId, useRef } from 'react'
import { IoEye, IoEyeOff } from 'react-icons/io5'
import { Input } from '@nextui-org/react'
import { IInputLabel } from '@interfaces/shared/components/input-label/InputLabel'

const InputLabel: FC<IInputLabel> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const id = useId()

  const [isVisible, setIsVisible] = React.useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <>
      <Input
        id={props.id ?? id}
        name={props.name}
        type={isVisible ? 'text ' : props.type }
        placeholder={props.placeholder}
        isDisabled={props.disabled}
        isClearable={props.isClearable}
        onClear={props.isClearable ? () => inputRef.current && (inputRef.current.value = '') : undefined}
        ref={inputRef}
        readOnly={props.readOnly}
        description={props.description}
        errorMessage={props.errorMessage}
        size={props.size ?? 'sm'}
        radius={props.radius ?? 'md'}
        variant={props.variant}
        onChange={props.onChange}
        label={props.label}
        autoComplete='off'
        labelPlacement={props.placement}
        classNames={{
          base: `${props.classNames?.base}`,
          input: `${props.classNames?.input}`,
          label: `${props.classNames?.label}`,
          inputWrapper: `border ${props.classNames?.inputWrapper}`,
          innerWrapper: `${props.classNames?.input ? props.classNames?.innerWrapper : '!flex !items-center'}`,
          helperWrapper: `${props.classNames?.helperWrapper}`,
          errorMessage: `${props.classNames?.errorMessage}`,
          mainWrapper: `${props.classNames?.mainWrapper}`,
          clearButton: `${props.classNames?.clearButton}`
        }}
        className={props.className}
        startContent={props.startContent}
        endContent={
          props.type === 'password'
            ? (
              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                {!isVisible
                  ? (
                    <IoEye color='black' className="text-[3vh] text-background pointer-events-none" />
                  )
                  : (
                    <IoEyeOff color='black' className="text-[3vh] text-background pointer-events-none" />
                  )}
              </button>
            )
            : props.endContent
        }
      />
    </>
  )
}

export default InputLabel
