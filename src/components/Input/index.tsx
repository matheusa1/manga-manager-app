import { FormControl, IInputProps, Icon, Input as NBInput, Pressable } from 'native-base'
import { Eye, EyeClosed, MagnifyingGlass } from 'phosphor-react-native'
import React, { useState } from 'react'

type InputType = IInputProps & {
  errorMessage?: string | null
  password?: boolean
  label?: string
  search?: boolean
  onSearch?: () => void
}

export const Input = ({
  errorMessage = null,
  password = false,
  label = undefined,
  search = false,
  onSearch = undefined,
  isInvalid,
  ...rest
}: InputType) => {
  const [showPassword, setShowPassword] = useState(false)
  const invalid = (!!errorMessage && errorMessage.length > 0) || isInvalid
  return (
    <FormControl isInvalid={invalid}>
      <FormControl.Label
        _text={{
          color: 'white',
          fontSize: 'md',
        }}
      >
        {label}
      </FormControl.Label>
      <NBInput
        {...rest}
        borderColor={'muted.600'}
        color={'white'}
        variant={'outline'}
        fontSize={'md'}
        cursorColor={'white'}
        secureTextEntry={password && !showPassword}
        py={3}
        px={4}
        _focus={{
          borderColor: 'muted.400',
          bg: 'muted.900',
          cursorColor: 'white',
        }}
        placeholderTextColor={'muted.400'}
        InputRightElement={
          password ? (
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              w={12}
              h={12}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Icon
                as={
                  showPassword ? (
                    <EyeClosed size={26} color={'white'} weight="regular" />
                  ) : (
                    <Eye size={26} color={'white'} weight="regular" />
                  )
                }
              />
            </Pressable>
          ) : search ? (
            <Pressable
              onPress={onSearch}
              w={12}
              h={12}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Icon as={<MagnifyingGlass size={26} color="white" weight="regular" />} />
            </Pressable>
          ) : undefined
        }
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  )
}
