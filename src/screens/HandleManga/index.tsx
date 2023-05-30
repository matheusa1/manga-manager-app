import { useRoute } from '@react-navigation/native'
import { Center, Heading, Image, Button as NButoon, ScrollView, Text, VStack } from 'native-base'
import React from 'react'

import { getMangaResponseType } from '../../@types/GetMangasTypes'
import { Checkbox } from '../../components/Checkbox'

export const HandleManga = () => {
  const route = useRoute()
  const param = route.params as getMangaResponseType
  const manga = param

  console.log(manga)

  const onCheckboxClick = () => {
    console.log(`clicked`)
  }

  return (
    <VStack bg={`muted.900`} flex={1}>
      <VStack flex={0.3} position={`relative`}>
        <Image
          resizeMode="cover"
          w="full"
          h="full"
          source={{ uri: manga.image_url }}
          alt={`image`}
          zIndex={-2}
        />
        <VStack
          width={`100%`}
          height={`100%`}
          zIndex={-1}
          position={`absolute`}
          bg={`muted.900`}
          opacity={50}
        />
      </VStack>
      <ScrollView h={`1`}>
        <VStack flex={1} p={4} space={4}>
          <VStack alignItems={`center`} space={2}>
            <Heading color={`white`}>{manga.title}</Heading>
            <NButoon bg={`success.600`}>
              <Text color={`white`} fontSize={`xs`}>
                Mudar quantidade de capítulos
              </Text>
            </NButoon>
          </VStack>

          {manga.volumes === -1 ? (
            <Center>
              <Text color={`white`}>Quantidade de capítulos não informada</Text>
            </Center>
          ) : (
            <VStack alignItems={`center`} space={4}>
              {[...Array(manga.volumes)].map((_, index) => (
                <Checkbox key={index} label={index + 1} onClick={onCheckboxClick} />
              ))}
            </VStack>
          )}
        </VStack>
      </ScrollView>
    </VStack>
  )
}
