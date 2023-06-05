import { AlertDialog, HStack, Heading, Text } from 'native-base'
import { useRef } from 'react'

import { Button } from '../Button'

interface DialogProps {
  isOpen: boolean
  onClose: () => void
}

export const Dialog = ({ isOpen, onClose }: DialogProps) => {
  const cancelRef = useRef(null)

  return (
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
      <AlertDialog.Content borderColor={`danger.500`} borderWidth={2}>
        <AlertDialog.CloseButton />
        <AlertDialog.Header bg={`muted.800`} borderBottomWidth={0}>
          <Heading color={`white`}>Apagar conta</Heading>
        </AlertDialog.Header>
        <AlertDialog.Body bg={`muted.800`}>
          <Text color={`white`}>
            Você tem certeza que deseja apagar sua conta? Essa ação não pode ser desfeita.
          </Text>
        </AlertDialog.Body>
        <AlertDialog.Footer bg={`muted.800`} borderTopWidth={0}>
          <HStack space={4}>
            <Button onPress={onClose} title={`Cancelar`} />
            <Button danger onPress={onClose} title={`Apagar`} />
          </HStack>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  )
}
