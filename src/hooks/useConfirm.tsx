import { createContext, FC, ReactElement, useContext, useState } from 'react'

import Confirm from '~/components/common/Confirm'

type ConfirmModalProps = {
  title: string
  message: string
  onConfirm?: (cb: () => void) => Promise<void>
  confirmText?: string
  isDanger?: boolean
  textToEnableConfirm?: string
}

type State = {
  confirm: (p: ConfirmModalProps) => void
}

const defaultValue: State = {
  confirm: () => null,
}

export const ConfirmContext = createContext<State>(defaultValue)
export const useConfirm = (): State => useContext(ConfirmContext)

type ConfirmProviderProps = {
  children: ReactElement | ReactElement[]
}

export const ConfirmProvider: FC<ConfirmProviderProps> = (p) => {
  const [confirmInfo, setConfirmInfo] = useState<ConfirmModalProps | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const confirm = (confirmProps: ConfirmModalProps) => {
    setConfirmInfo(confirmProps)
  }

  return (
    <ConfirmContext.Provider
      value={{
        confirm,
      }}
    >
      {p.children}
      <Confirm
        title={confirmInfo?.title ?? ''}
        message={confirmInfo?.message ?? ''}
        isOpen={!!confirmInfo}
        onCancel={() => setConfirmInfo(null)}
        textToEnableConfirm={confirmInfo?.textToEnableConfirm}
        isLoading={isLoading}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onConfirm={async () => {
          setIsLoading(true)
          await confirmInfo?.onConfirm?.(() => {
            setConfirmInfo(null)
            setIsLoading(false)
          })
        }}
        confirmText={confirmInfo?.confirmText}
        isDanger={confirmInfo?.isDanger}
      />
    </ConfirmContext.Provider>
  )
}
