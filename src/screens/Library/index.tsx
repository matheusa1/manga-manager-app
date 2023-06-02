import { useNavigation } from '@react-navigation/native'
import { Center, HStack, IconButton, Pressable, ScrollView, Text, VStack } from 'native-base'
import { SortAscending, SortDescending } from 'phosphor-react-native'
import React, { useState } from 'react'
import { Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { getMangaResponseType } from '../../@types/GetMangasTypes'
import ufo from '../../assets/ufo.png'
import { CardLibrary } from '../../components/CardLibrary'
import { Input } from '../../components/Input'
import { useManga } from '../../context/MangaContext'

export const Library = () => {
  const { mangaData } = useManga()
  const navigation = useNavigation()
  const [search, setSearch] = useState(``)
  const [isSortIncrease, setIsSortIncrease] = useState<boolean>(true)

  const filteredMangas: getMangaResponseType[] =
    search.length > 0
      ? mangaData.mangas.filter((manga) => manga.title.toLowerCase().includes(search.toLowerCase()))
      : mangaData.mangas

  return (
    <VStack bg={`muted.900`} flex={1}>
      <SafeAreaView style={{ flex: 1 }}>
        <VStack flex={1} position={`relative`}>
          <VStack flex={0.1} px={4}>
            <Input
              search
              onChangeText={setSearch}
              value={search}
              placeholder="Pesquise seu manga"
            />
          </VStack>
          <VStack px={4} flex={0.9}>
            {filteredMangas.length > 0 ? (
              <ScrollView mt={4} mb={16} minH={`full`}>
                <HStack maxW={`full`} w={`full`} flexWrap={`wrap`}>
                  {filteredMangas
                    .sort((a, b) =>
                      isSortIncrease
                        ? a.title.localeCompare(b.title)
                        : b.title.localeCompare(a.title),
                    )
                    .map((manga) => {
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
          <IconButton
            position={`absolute`}
            right={10}
            bottom={10}
            onPress={() => setIsSortIncrease(!isSortIncrease)}
            bg={`success.600`}
            rounded={999}
            size={16}
            icon={
              !isSortIncrease ? (
                <SortAscending size={24} color="white" />
              ) : (
                <SortDescending size={24} color="white" />
              )
            }
          />
        </VStack>
      </SafeAreaView>
    </VStack>
  )
}
