import { Box, HStack, Heading, Image, Pressable, Text, VStack } from 'native-base'
import React from 'react'
import { GestureResponderEvent } from 'react-native'

type CardProps = {
  title: string
  image: string
  description: string
  onPress: (event: GestureResponderEvent) => void
}

export const Card = ({ image, title, description, onPress }: CardProps) => {
  return (
    <Pressable
      _pressed={{
        opacity: 0.5,
      }}
      w={`full`}
      onPress={onPress}
    >
      <Box bg={`muted.800`} w={`full`} p={2}>
        <HStack justifyContent={`space-between`} alignItems={`center`}>
          <Image
            w={16}
            h={20}
            rounded={8}
            source={{ uri: image }}
            fallbackSource={{
              uri: `https://media.hebys.io/proxy/tr:di-@@images@@fallback_image.png,h-256,w-256,dpr-auto-true,lo-true/images/materials/fallback.webp`,
            }}
            alt="card image"
          />
          <VStack w={`4/6`} space="2">
            <Heading color={`white`} fontSize={20}>
              {title}
            </Heading>
            <Text color={`white`} fontSize={11}>
              {description}
            </Text>
          </VStack>

          <HStack>
            <Text color={`white`}>...</Text>
          </HStack>
        </HStack>
      </Box>
    </Pressable>
  )
}
