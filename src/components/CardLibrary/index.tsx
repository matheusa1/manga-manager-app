import { Center, HStack, Image, Pressable, Text, VStack } from 'native-base'
import React from 'react'

interface CardLibraryProps {
  title: string
  image: string
  onPress: () => void
}

export const CardLibrary = ({ image, onPress, title }: CardLibraryProps) => {
  return (
    <Pressable
      onPress={onPress}
      _pressed={{
        opacity: 0.5,
      }}
      bg={'muted.800'}
      w={40}
      h={80}
      rounded={8}
      p={1}
      pb={2}
      mb={4}
      mx={2}
    >
      <VStack alignItems={'center'} space={2}>
        <Image
          w={40}
          h={64}
          rounded={8}
          source={{ uri: image }}
          fallbackSource={{
            uri: 'https://media.hebys.io/proxy/tr:di-@@images@@fallback_image.png,h-256,w-256,dpr-auto-true,lo-true/images/materials/fallback.webp',
          }}
          alt="card image"
        />
        <HStack>
          <Center w={'full'} h={12}>
            <Text color={'white'} textAlign={'center'}>
              {title}
            </Text>
          </Center>
        </HStack>
      </VStack>
    </Pressable>
  )
}
