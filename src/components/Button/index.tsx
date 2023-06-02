import { IButtonProps, Button as NBButton, Text } from 'native-base'
import React from 'react'

type ButtonProps = IButtonProps & {
  title: string
  danger?: boolean
}

export const Button = ({ title, danger = false, ...rest }: ButtonProps) => {
  return (
    <NBButton
      {...rest}
      bg={danger ? `danger.600` : `success.600`}
      py={3}
      _pressed={{
        bg: danger ? `danger.800` : `success.800`,
      }}
    >
      <Text fontWeight={`semibold`} fontSize={`md`} color={`white`}>
        {title}
      </Text>
    </NBButton>
  )
}
