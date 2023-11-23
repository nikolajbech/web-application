/* eslint-disable @typescript-eslint/no-empty-function */
import {
  createContext,
  FC,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Box, Flex, Text, useToast, UseToastOptions } from '@chakra-ui/react'

import Modal from '~/components/common/Modal'

type State = {
  setTitle: (title: string) => void
  setDescription: (description: string) => void
  setFormElement: (formElement: JSX.Element) => void
  setModalIsOpen: (modalIsOpen: boolean) => void
  triggerNotification: (
    title: string,
    description: string,
    status?: UseToastOptions['status'],
  ) => void
}

const defaultValue: State = {
  setTitle: () => {},
  setDescription: () => {},
  setFormElement: () => {},
  setModalIsOpen: () => {},
  triggerNotification: () => {},
}

export const CrudContext = createContext<State>(defaultValue)
export const useCrud = (): State => useContext(CrudContext)

type CrudProviderProps = {
  children: ReactElement | ReactElement[]
}

export const CrudProvider: FC<CrudProviderProps> = (p) => {
  const toast = useToast()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [formElement, setFormElement] = useState<JSX.Element>()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const triggerNotification = (
    title: string,
    description: string,
    status: UseToastOptions['status'] = 'info',
  ) => {
    toast({
      title,
      description,
      status,
      duration: 6000,
      isClosable: true,
      variant: 'subtle',
    })
  }

  useEffect(() => {
    if (!modalIsOpen) {
      setTitle('')
      setDescription('')
      setFormElement(undefined)
    }
  }, [modalIsOpen])

  return (
    <CrudContext.Provider
      value={{
        setTitle,
        setDescription,
        setFormElement,
        setModalIsOpen,
        triggerNotification,
      }}
    >
      {p.children}
      <Modal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        size='2xl'
        closeButton
        closeOnOverlayClick={false}
      >
        <Box my={4} p={2}>
          <Flex fontSize='sm' flexDir='column'>
            <Text fontWeight='bold' fontSize={22}>
              {title}
            </Text>
            {description && (
              <Text opacity={0.5} mt={-1} fontWeight='normal' fontSize={16}>
                {description}
              </Text>
            )}
          </Flex>
          {formElement}
        </Box>
      </Modal>
    </CrudContext.Provider>
  )
}
