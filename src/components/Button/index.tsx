import { IButtonProps, Button as NBButton, Text } from 'native-base'
import React from 'react'

type ButtonProps = IButtonProps & {
  title: string
}

export const Button = ({ title, ...rest }: ButtonProps) => {
  return (
    <NBButton
      {...rest}
      bg={'success.600'}
      py={3}
      _pressed={{
        bg: 'success.800',
      }}
    >
      <Text fontWeight={'semibold'} fontSize={'md'} color={'white'}>
        {title}
      </Text>
    </NBButton>
  )
}
