import { AlertDialog, HStack, Heading, Button as NBButton, Text } from 'native-base'
import { useEffect, useRef, useState } from 'react'

import { Button } from '../Button'

interface DialogProps {
  isOpen: boolean
  onClose: () => void
  isLoading?: boolean
  onPress: () => void
}

export const Dialog = ({ isOpen, onClose, isLoading = false, onPress }: DialogProps) => {
  const cancelRef = useRef(null)

  const [time, setTime] = useState(0)

  useEffect(() => {
    if (isOpen) {
      setTime(5)
      const intervalo = setInterval(() => {
        setTime((prev) => prev - 1)
      }, 1000)
      setTimeout(() => {
        clearInterval(intervalo)
      }, 5200)
      return () => {
        clearInterval(intervalo)
      }
    }
  }, [isOpen])

  return (
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
      <AlertDialog.Content borderColor={`danger.500`} borderWidth={2}>
        <AlertDialog.CloseButton />
        <AlertDialog.Header bg={`muted.800`} borderBottomWidth={0}>
          <Heading color={`white`}>Apagar conta</Heading>
        </AlertDialog.Header>
        <AlertDialog.Body bg={`muted.800`}>
          <Text color={`white`}>
            Você tem certeza que deseja apagar sua conta? Essa ação não pode ser desfeita.{` `}
          </Text>
        </AlertDialog.Body>
        <AlertDialog.Footer bg={`muted.800`} borderTopWidth={0}>
          <HStack space={4}>
            <Button onPress={onClose} title={`Cancelar`} />
            <NBButton
              onPress={onPress}
              disabled={time >= 1}
              bg={time >= 1 ? `danger.900` : `danger.600`}
              _pressed={{
                bg: time >= 1 ? `danger.900` : `danger.800`,
              }}
              minW={20}
              isLoading={isLoading}
            >
              {time === 0 ? `Apagar` : time.toString()}
            </NBButton>
          </HStack>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  )
}
