import { IGlobalContext, IGlobalState, IGlobalStateAction, IGlobalStorage } from '@interfaces/core/global-state/GlobalState'
import { Context, FC, createContext, useContext, useMemo, useReducer } from 'react'

const initialState: IGlobalContext = {
  state: {},
  updateState (key: string, value: any) {

  }
}

const GlobalStateContext: Context<IGlobalContext> = createContext<IGlobalContext>(initialState)

export const GlobalState: FC<IGlobalState> = ({ children }) => {
  const globalStateReducer = (state: IGlobalContext, action: IGlobalStateAction) => {
    const { key, value } = action

    const update: IGlobalContext = { ...state }

    if (update[key] === value) return state
    update[key] = value

    return update
  }

  const [state, dispatch] = useReducer(globalStateReducer, initialState)

  const updateState = (key: string, value: any) => {
    dispatch({
      key,
      value
    })
  }

  const value = useMemo<IGlobalContext>(() => {
    return {
      state,
      updateState
    }
  }, [state])

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  )
}

export const useStorage = <T, >(key: string, initialState?: T): IGlobalStorage<T> => {
  const { state, updateState } = useContext<IGlobalContext>(GlobalStateContext)

  return useMemo<IGlobalStorage<T>>(() => {
    return {
      storage: state[key] ?? initialState,
      updateStorage: (payload) => updateState(key, payload)
    }
  }, [initialState, key, state, updateState])
}
