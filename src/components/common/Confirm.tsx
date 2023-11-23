import { FC, useEffect, useState } from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react'

import Modal from '../common/Modal'

type Props = {
  isOpen: boolean
  title: string
  message: string
  onConfirm?: () => void
  confirmText?: string
  isDanger?: boolean
  onCancel: () => void
  textToEnableConfirm?: string
  isLoading?: boolean
}

const Confirm: FC<Props> = (p) => {
  const [text, setText] = useState<string>('')

  useEffect(() => {
    p.isOpen && setText('')
  }, [p.isOpen])

  return (
    <Modal isOpen={p.isOpen} onClose={p.onCancel}>
      <Heading size='lg' my={4}>
        {p.title}
      </Heading>
      <Text mb={8}>{p.message}</Text>
      {p.textToEnableConfirm ? (
        <Box w='100%'>
          <Text mb={2}>
            Type <b>{p.textToEnableConfirm}</b> to confirm.
          </Text>
          <Input
            mb={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Box>
      ) : (
        <></>
      )}
      <Flex justifyContent='flex-end'>
        <ButtonGroup mb={4}>
          <Button borderWidth={1} variant='ghost' onClick={p.onCancel}>
            Cancel
          </Button>
          {p.onConfirm && (
            <Button
              colorScheme={p.isDanger ? 'red' : undefined}
              borderColor={p.isDanger ? 'red.600' : undefined}
              onClick={p.onConfirm}
              isLoading={p.isLoading}
              borderWidth={1}
              variant='ghost'
              color='white'
              isDisabled={
                !!p.textToEnableConfirm && text !== p.textToEnableConfirm
              }
            >
              {p.confirmText ?? 'OK'}
            </Button>
          )}
        </ButtonGroup>
      </Flex>
    </Modal>
  )
}

export default Confirm
