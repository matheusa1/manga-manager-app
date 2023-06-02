import { AlertDialog } from 'native-base'
import { useRef } from 'react'

interface DialogProps {
  isOpen: boolean
  onClose: () => void
}

export const Dialog = ({ isOpen, onClose }: DialogProps) => {
  const cancelRef = useRef(null)

  return (
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>Alerta</AlertDialog.Header>
      </AlertDialog.Content>
    </AlertDialog>
  )
}
