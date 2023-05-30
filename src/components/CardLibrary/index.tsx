import { Center, HStack, Image, Text, VStack } from 'native-base'
import React from 'react'

interface CardLibraryProps {
  title: string
  image: string
}

export const CardLibrary = ({ image, title }: CardLibraryProps) => {
  return (
    <VStack alignItems={`center`} space={2}>
      <Image
        w={40}
        h={64}
        rounded={8}
        source={{ uri: image }}
        fallbackSource={{
          uri: `https://media.hebys.io/proxy/tr:di-@@images@@fallback_image.png,h-256,w-256,dpr-auto-true,lo-true/images/materials/fallback.webp`,
        }}
        alt="card image"
      />
      <HStack>
        <Center w={`full`} h={12}>
          <Text color={`white`} textAlign={`center`}>
            {title}
          </Text>
        </Center>
      </HStack>
    </VStack>
  )
}
