import { createContext, FC, ReactElement, useContext } from 'react'
import { useBreakpointValue } from '@chakra-ui/react'

type State = {
  isSmallScreen: boolean
}

const defaultValue: State = {
  isSmallScreen: false,
}

export const GlobalStateContext = createContext<State>(defaultValue)
export const useGlobalState = (): State => useContext(GlobalStateContext)

type GlobalStateProviderProps = {
  children: ReactElement
}

export const GlobalStateProvider: FC<GlobalStateProviderProps> = (p) => {
  const isSmallScreen = !!useBreakpointValue(
    { base: true, md: false },
    { ssr: true },
  )

  return (
    <GlobalStateContext.Provider
      value={{
        isSmallScreen,
      }}
    >
      {p.children}
    </GlobalStateContext.Provider>
  )
}
