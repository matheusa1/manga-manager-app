import { useNavigation } from '@react-navigation/native'
import { Center, HStack, Pressable, ScrollView, Text, VStack } from 'native-base'
import React, { useCallback, useEffect, useState } from 'react'
import { Image, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import ufo from '../../assets/ufo.png'
import { CardLibrary } from '../../components/CardLibrary'
import { useManga } from '../../context/MangaContext'

export const Library = () => {
  const { mangaData } = useManga()
  const navigation = useNavigation()
  const [refreshing, setRefreshing] = useState(false)

  const getData = useCallback(async () => {
    setRefreshing(true)
    setRefreshing(false)
  }, [])

  useEffect(() => {
    getData()
  }, [mangaData])

  return (
    <VStack bg={`muted.900`} flex={1}>
      <SafeAreaView style={{ flex: 1 }}>
        <VStack px={4} flex={1}>
          {mangaData.mangas.length > 0 ? (
            <ScrollView
              mt={4}
              mb={16}
              minH={`full`}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getData} />}
            >
              <HStack maxW={`full`} w={`full`} flexWrap={`wrap`}>
                {mangaData.mangas.map((manga) => {
                  return (
                    <Pressable
                      onPress={() => navigation.navigate(`handleManga`, manga)}
                      _pressed={{
                        opacity: 0.5,
                      }}
                      bg={`muted.800`}
                      w={40}
                      h={80}
                      rounded={8}
                      p={1}
                      pb={2}
                      mb={4}
                      mx={2}
                      key={manga.MangaID}
                    >
                      <CardLibrary title={manga.title} image={manga.image_url} />
                    </Pressable>
                  )
                })}
              </HStack>
            </ScrollView>
          ) : (
            <VStack flex={1}>
              <Center flex={1}>
                <Center w={20} h={20}>
                  <Image
                    source={ufo}
                    style={{ width: `100%`, height: `100%` }}
                    resizeMode="cover"
                  />
                </Center>
                <Text color={`white`} mt={8}>
                  Nenhum manga achado...
                </Text>
              </Center>
            </VStack>
          )}
        </VStack>
      </SafeAreaView>
    </VStack>
  )
}
