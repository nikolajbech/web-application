/* eslint-disable @typescript-eslint/ban-types */
import { FC } from 'react'
import {
  Modal as ChakraModal,
  Heading,
  LayoutProps,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ResponsiveValue,
} from '@chakra-ui/react'

import { useGlobalState } from '~/hooks/useGlobalState'
import { BORDER_RADIUS } from '~/styles/theme'

type Props = {
  isOpen: boolean
  onClose: () => void
  children?: JSX.Element | JSX.Element[]
  title?: string
  size?:
    | ResponsiveValue<
        | 'xs'
        | 'sm'
        | 'md'
        | 'lg'
        | 'xl'
        | '2xl'
        | '3xl'
        | '4xl'
        | '5xl'
        | '6xl'
        | 'full'
        | (string & {})
      >
    | undefined
  closeOnOverlayClick?: boolean
  closeButton?: boolean
  maxW?: LayoutProps['maxW']
  maxH?: LayoutProps['maxH']
}

const Modal: FC<Props> = (p) => {
  const { isSmallScreen } = useGlobalState()

  return (
    <ChakraModal
      isOpen={p.isOpen}
      onClose={p.onClose}
      isCentered={!isSmallScreen}
      size={p.size ?? 'xl'}
      closeOnOverlayClick={p.closeOnOverlayClick}
    >
      <ModalOverlay bg='#00000050' backdropFilter='auto' backdropBlur='6px' />
      <ModalContent
        m={2}
        maxH={p.maxH ?? '90vh'}
        maxW={p.maxW}
        borderRadius={BORDER_RADIUS}
        borderWidth={1}
        boxShadow='none'
      >
        {p.closeButton && <ModalCloseButton />}
        <ModalBody>
          {p.title && (
            <Heading my={2} fontSize={'2xl'} textAlign='center'>
              {p.title}
            </Heading>
          )}
          {p.children}
        </ModalBody>
      </ModalContent>
    </ChakraModal>
  )
}

export default Modal
