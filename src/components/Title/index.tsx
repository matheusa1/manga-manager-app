import { Heading, IHeadingProps } from 'native-base'
import React from 'react'

interface TitleProps extends IHeadingProps {
  children: string
}

export const Title = ({ children, ...rest }: TitleProps) => {
  return (
    <Heading {...rest} color={'white'}>
      {children}
    </Heading>
  )
}
