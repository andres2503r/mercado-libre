import React from 'react'
import { Button as NextUiButton, Tooltip } from '@nextui-org/react'
import { IButton } from '@interfaces/shared/components/button/Button'

const Button: React.FC<IButton> = (props) => {
  return (
    <>
      {props.tooltip
        ? (
          <Tooltip content={props.tooltip} color='default' className='text-primary flex justify-center w-[100px] bg-[#F0F0F0] h-[30px] p-2 rounded-2xl' showArrow>
            <NextUiButton
              isDisabled={props.disabled}
              type={props.type}
              isIconOnly={props.isIconOnly}
              size={props.sizes ?? 'lg'}
              radius={props.radius ?? 'sm'}
              color={props.color ?? 'primary'}
              variant={props.variant}
              endContent={props.endContent}
              startContent={props.startContent}
              disabled={props.disabled}
              className={props.className}
              onClick={props.onClick}
            >
              {props.text ?? props.children}
            </NextUiButton>
          </Tooltip>
        )
        : (

          <NextUiButton
            isDisabled={props.disabled}
            type={props.type}
            isIconOnly={props.isIconOnly}
            size={props.sizes ?? 'lg'}
            radius={props.radius ?? 'sm'}
            color={props.color ?? 'primary'}
            variant={props.variant}
            endContent={props.endContent}
            startContent={props.startContent}
            disabled={props.disabled}
            className={props.className}
            onClick={props.onClick}
          >
            {props.text ?? props.children}
          </NextUiButton>

        )}
    </>
  )
}

export default Button
