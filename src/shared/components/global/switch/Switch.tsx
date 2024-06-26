// import { FC } from 'react'
// import { Switch as SwitchUi, cn } from '@nextui-org/react'
// import { ISwitch } from '@interfaces/shared/components/switch/Switch'

// const Switch: FC<ISwitch> = (props) => {
//   return (
//     <SwitchUi
//       aria-label={props.label}
//       isDisabled={props.disabled}
//       isSelected={props.value}
//       onClick={() => props.onClick()}
//       classNames={{
//         base: cn(
//           'inline-flex  hover:bg-content2 items-center',
//           'justify-center cursor-pointer rounded-lg gap-2 p-2 border-transparent',
//           'data-[selected=true]:border-primary'
//         ),
//         wrapper: 'p-0 h-4 overflow-visible',
//         thumb: cn('w-6 h-6 border-2 shadow-lg',
//           'group-data-[hover=true]:border-primary',
//           // selected
//           'group-data-[selected=true]:ml-6',
//           // pressed
//           'group-data-[pressed=true]:w-5',
//           'group-data-[selected]:group-data-[pressed]:ml-4'
//         )
//       }}
//     >
//       {
//         props.label
//           ? <div className="flex flex-col gap-1">
//             <p className="text-tiny text-default-400">
//               {props.label}
//             </p>
//           </div>
//           : <></>
//       }

//     </SwitchUi>
//   )
// }

// export default Switch
import React, { FC } from 'react'
import { Switch as SwitchUi, Tooltip } from '@nextui-org/react'
import { IToggle } from '@interfaces/shared/components/switch/Switch'

const Switch: FC<IToggle> = (props) => {
  const ToggleElement = () => {
    return (
      <div style={{ ...props.styles }} className='flex justify-center items-center'>
        <SwitchUi
          type={'checkbox'}
          id={props.id}
          name={props.name}
          onClick={props.onClick}
          defaultSelected={props.state}
          classNames={props.classNames}
          isReadOnly={props.disabled}
          color='primary'
          size={props.size ?? 'md'}>
          {
            props.label
              ? <div className="flex flex-col gap-1">
                <p className="text-small text-primary font-bold">
                  {props.label}
                </p>
              </div>
              : <></>
          }
        </SwitchUi>
      </div>
    )
  }
  return (
    props.tooltip
      ? <Tooltip content={props.tooltip} style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center', display: 'flex', placeContent: 'center', width: 'auto' }}>
        <ToggleElement />
      </Tooltip>
      : <ToggleElement />
  )
}

export default Switch
