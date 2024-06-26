import { FC } from 'react'
import { Portal } from '../portal/Portal'
import { ISpinner } from '@interfaces/shared/components/spinner/Spinner'
import { Spinner as NextUISpinner } from '@nextui-org/react'

const Spinner: FC<ISpinner> = (props) => {
  return (
    <Portal closeTime={200} portalOpen={props.open} portalTag='#spinner-portal'>
      <div className="flex flex-col-reverse items-center gap-20 min-w-240 p-10">
        {props.title && (
          <div className="pt-10 text-white">
            <p style={props.titleStyle ?? {}}>{props.title}</p>
          </div>
        )}
        {props.content && (
          <div className="text-white pt-10">
            <p>{props.content}</p>
          </div>
        )}
        <div className="w-auto">
          <NextUISpinner color='primary' size='lg'/>
        </div>
      </div>
    </Portal>
  )
}
export default Spinner
