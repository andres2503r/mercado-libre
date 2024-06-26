import { Button, CardBody, Image, Card as NextUiCard, Tooltip, cn } from '@nextui-org/react'
import Switch from '../switch/Switch'
import { FC } from 'react'
import { ICard } from '@interfaces/shared/components/card/Card'
import Restricted from '../restricted/Restricted'

const Card: FC<ICard> = ({ data: { screenIp, screenMac, screenName, screenState }, ...props }) => {
  const buttonTypes = [
    { icon: '/screen/assign.svg', tooltip: 'Assign Files', style: 'w-[64px] h-[64px] bg-transparent hover:bg-white text-white  ', action: props.assign, permission: 'settings:screen:configuration:read' },
    { icon: '/screen/edit.svg', tooltip: 'Edit Screen', style: 'w-[64px] h-[64px] bg-transparent hover:bg-[#F7F7F7] text-white  ', action: props.edit, permission: 'settings:screen:update' },
    { icon: '/screen/delete.svg', tooltip: 'Delete Screen', style: 'w-[64px] h-[64px] text-white bg-transparent hover:bg-[#F7F7F7] ', action: props.delete, permission: 'settings:screen:delete' }
  ]

  return (
    <NextUiCard
      isBlurred
      className="border-none bg-[#F0F0F0]/50 dark:bg-default-100/50 w-[511px] h-[243px] 2xl:w-[511px] 2xl:h-[240px]"
      shadow="lg"
    >
      <CardBody>
        <div className="flex items-center  w-full h-full flex-col">
          <div className='flex flex-row w-full '>
            <div className='w-[60%] pl-[26px] pt-[23px] flex flex-col justify-around' >
              <h1 className="font-semibold !text-[30px] text-foreground/90 xl:text-[20px]">{screenName}</h1>
              <p className="text-base text-foreground/80 pt-[10px]"><span className='font-bold'>IP: </span>{screenIp}</p>
              <p className="text-base text-foreground/80"><span className='font-bold'>MAC: </span>{screenMac}</p>
            </div>
            <div className="w-[40%] flex justify-end pr-[21px] pt-[33px] ">
              <Image
                alt="Album cover"
                style={{ fill: 'red' }}
                className='w-[84px] h-[64px]'
                src={screenState === true ? '/screen/screenPrueba.svg' : '/screen/screenHover.svg'}
                radius='none'
              />
              {/* <LogoIcon fill='red'/> */}
            </div>
          </div>
          <div className='flex w-full justify-between'>
            <div className='flex w-[60%] justify-start pl-[26px] mt-[38px] mb-[34px]'>
              <Restricted permission='settings:screen:update'>
                <Switch size='sm' classNames={{ base: cn('inline-flex flex-row-reverse gap-2') }} name='switch' onClick={props.changeState} state={screenState} label={screenState === true ? 'ON' : 'OFF'} />
              </Restricted>
            </div>
            <div className='flex gap-[8px] justify-end w-[40%] pt-[26px] pb-[12px]'>
              {buttonTypes.map((value, index) => (
                <Restricted key={index} permission={value.permission}>
                  <Tooltip key={index} content={value.tooltip} placement='top' showArrow>
                    <Button
                      isIconOnly
                      className={value.style}
                      onClick={value.action}
                    >
                      <Image className='w-[28px] h-[28px]' radius='none' alt='icon' src={value.icon} />
                    </Button>
                  </Tooltip>
                </Restricted>
              ))}
            </div>
          </div>
        </div>
      </CardBody>
    </NextUiCard>
  )
}

export default Card
