import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Portal } from '../portal/Portal'
import MakeInput from './components/make-input/MakeInput'
import MakeSelect from './components/make-select/MakeSelect'
import MakeTitle from './components/make-title/MakeTitle'
import { IModal, IModalField, IModalConfigProps } from './interfaces/Modal'
import MakeMultiSelect from './components/make-multi-select/MakeMultiSelect'
import MakeText from './components/make-text/MakeText'
import { IFieldProps } from './interfaces/Field'
import { generateId } from './tools/generateId'
import Button from '../button/Button'
import MakeTextarea from './components/make-textarea/MakeTextarea'
import MakeUpload from './components/make-upload/MakeUpload'

export default function Modal ({ open, close, config }: IModal) {
  const [modalReady, setModalReady] = useState<IModalConfigProps | undefined>(undefined)
  const [defaultLoaded, setDefaultLoaded] = useState<boolean>(false)

  const {
    control,
    reset,
    handleSubmit,
    clearErrors,
    setValue,
    watch
  } = useForm()

  const formValueHandler = useCallback(
    (element: IModalField) => {
      if (['group', 'upload', 'text'].includes(element.elementType)) return
      const defaultValue = (element as any).defaultValue ?? ''
      const parsedValue: boolean | string | undefined = defaultValue === 'true' ? true : defaultValue === 'false' ? false : defaultValue
      setValue((element as any).name, parsedValue ?? '')
    }, [setValue]
  )

  const autoLoadGroup = useCallback(
    (groupFields: Array<IModalField>) => {
      groupFields.forEach(element => {
        formValueHandler(element)
      })
    }, [formValueHandler]
  )

  const autoLoadField = useCallback(
    (modalFields: Array<IModalField>) => {
      if (defaultLoaded) return
      modalFields.forEach(element => {
        if (element.elementType === 'group') {
          autoLoadGroup(element.groups)
          return
        }
        formValueHandler(element)
      })

      setDefaultLoaded(true)
    }, [autoLoadGroup, defaultLoaded, formValueHandler]
  )

  const getRender = (element: IModalField, index:number, isEndOfRender: boolean = false) => {
    if (isEndOfRender && modalReady) setTimeout(() => autoLoadField(modalReady.fields), 100)
    console.log('.')
    const onlyId = generateId()
    const props: IFieldProps = {
      control,
      watch,
      setValue
    }

    return element.elementType === 'input'
      ? <MakeInput {...props} key={onlyId} element={{ ...element, id: element.id ?? onlyId }} />
      : element.elementType === 'select'
        ? <MakeSelect {...props} key={onlyId} element={{ ...element, id: element.id ?? onlyId }} />
        : element.elementType === 'textarea'
          ? <MakeTextarea {...props} key={onlyId} element={{ ...element, id: element.id ?? onlyId }} />
          : element.elementType === 'multiselect'
            ? <MakeMultiSelect {...props} key={onlyId} element={{ ...element, id: element.id ?? onlyId }} />
            : element.elementType === 'text'
              ? <MakeText {...props} key={onlyId} element={{ ...element, id: element.id ?? onlyId }} />
              : element.elementType === 'upload'
                ? <MakeUpload {...props} key={onlyId} element={element} />
                : null
  }

  const closeHandler = (): void => {
    if (modalReady?.cancel && modalReady.cancel.action) modalReady.cancel.action()
    clearErrors()
    reset()
    close()
    setTimeout(() => {
      setModalReady(undefined)
      setDefaultLoaded(false)
    }, 200)
  }

  const actionHandler = (data: Record<string, any>): void => {
    if (modalReady?.action && modalReady.action.action) modalReady.action.action({ ...modalReady?.reservedData, ...data })
    closeHandler()
  }

  useEffect(() => {
    (open && !modalReady) && setModalReady(config)
  }, [config, modalReady, open])

  return (
    modalReady
      ? <Portal closeTime={200} portalOpen={open} portalTag={'#modal-portal'}>
        <div className={open ? 'modal_container' : 'modal_container__hide'} style={{ ...modalReady.styles }} >
          <form className='form flex flex-col bg-background rounded-lg w-[400px] 2xl:w-[450px] min-[3000px]:h-[550px] justify-center items-center gap-[10px] min-[3000px]:gap-[20px]' autoComplete='off' onSubmit={handleSubmit(actionHandler)}>
            <MakeTitle title={modalReady.title}/>
            <div className='modal_content flex flex-col justify-between items-center gap-[10px] h-full w-[100%] p-[20px]'>
              <div
                className='modal_body flex flex-col  items-center gap-[15px] w-full'
                style={{
                  overflowY: modalReady.overFlowBody ? 'auto' : undefined,
                  height: modalReady.overFlowBody,
                  minHeight: modalReady.minHeightBody
                }}
              >
                {
                  modalReady.fields.map((element, index) => {
                    const isEndOfRender : boolean = index + 1 === modalReady.fields.length
                    if (element.elementType === 'group') {
                      const groups = element.groups
                        .filter(sub => ['input', 'select', 'toggle', 'multiselect', 'upload'].includes(sub.elementType))
                        .map((sub, subIndex) => getRender(sub, index + subIndex, isEndOfRender))

                      return (
                        <div key={index} style={{ ...element.style }} className='modal_group w-full flex flex-row justify-center items-center gap-[10px]'>
                          {groups}
                        </div>
                      )
                    } else { return getRender(element, index, isEndOfRender) }
                  })
                }
              </div>
              <div className='modal_footer flex flex-row justify-center items-center gap-[20px] w-[100%] mt-[20px]'>
                {modalReady.cancel &&
                <Button
                  variant='bordered'
                  className='h-[40px]'
                  text={modalReady.cancel.name?.toUpperCase() ?? 'CANCELAR'}
                  onClick={closeHandler}
                  type='reset'
                />
                }
                {modalReady.action &&
                <Button
                  className='h-[40px]'
                  variant='solid'
                  text={modalReady.action.name.toUpperCase() ?? 'OK'}
                  type='submit'
                />
                }
              </div>
            </div>
          </form>
        </div>
      </Portal>
      : null
  )
}
