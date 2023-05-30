import { Center, Pressable, Text } from 'native-base'
import React from 'react'

interface CheckboxProps {
  label: number
  onClick: () => void
  checked?: boolean
}

export const Checkbox = ({ label, onClick, checked = false }: CheckboxProps) => {
  return (
    <Pressable
      onPress={onClick}
      bg={checked ? `success.600` : `muted.900`}
      w={16}
      h={16}
      rounded={`md`}
      borderWidth={2}
      borderColor={checked ? `success.800` : `muted.700`}
      _pressed={{
        bg: checked ? `success.700` : `muted.800`,
      }}
    >
      <Center w={`full`} h={`full`}>
        <Text color={`white`} fontSize={`2xl`}>
          {label}
        </Text>
      </Center>
    </Pressable>
  )
}
