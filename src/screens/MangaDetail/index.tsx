import { useNavigation } from '@react-navigation/native'
import { Button, HStack, Heading, IconButton, Image, Text, VStack } from 'native-base'
import { CaretLeft } from 'phosphor-react-native'
import React, { useCallback, useEffect, useState } from 'react'

import { useAuth } from '../../context/UserContext'
import { addMangaToUser, getUserMangas } from '../../service/api'

// type MangaDetailProps = {
//   mangaId: number
// }

export const MangaDetail = () => {
  // const route = useRoute()
  // const param = route.params as MangaDetailProps

  // const id = param.mangaId
  const { userData } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [mangaAdded, setMangaAdded] = useState(false)
  const navigation = useNavigation()

  const id = 44347
  const manga = {
    picture_url: `https://cdn.myanimelist.net/images/manga/3/80661.jpg`,
    title_ov: `One Punch-Man`,
    synopsis: `After rigorously training for three years, the ordinary Saitama has gained immense strength which allows him to take out anyone and anything with just one punch. He decides to put his new skill to good use by becoming a hero. However, he quickly becomes bored with easily defeating monsters, and wants someone to give him a challenge to bring back the spark of being a hero. Upon bearing witness to Saitama's amazing power, Genos, a cyborg, is determined to become Saitama's apprentice. During this time, Saitama realizes he is neither getting the recognition that he deserves nor known by the people due to him not being a part of the Hero Association. Wanting to boost his reputation, Saitama decides to have Genos register with him, in exchange for taking him in as a pupil. Together, the two begin working their way up toward becoming true heroes, hoping to find strong enemies and earn respect in the process. [Written by MAL Rewrite]`,
    information: {
      volumes: `Unknown`,
      published: `Jun 14, 2012 to ?`,
      status: `Publishing`,
      genres: [
        {
          name: `Action`,
          url: `https://myanimelist.net/manga/genre/1/Action`,
        },
        {
          name: `Comedy`,
          url: `https://myanimelist.net/manga/genre/4/Comedy`,
        },
      ],
      authors: [
        {
          name: `ONE`,
          url: `https://myanimelist.net/people/16993/ONE`,
        },
        {
          name: `Murata, Yosuke`,
          url: `https://myanimelist.net/people/1903/Yusuke_Murata`,
        },
      ],
    },
  }

  const onHandleRemove = () => {
    console.log(`remove`)
  }

  const onHandleAdd = async () => {
    setIsLoading(true)

    const response = await addMangaToUser(userData.token, userData.user.id, {
      title: manga.title_ov,
      image_url: manga.picture_url,
      myAnimeListID: id,
      volumes: manga.information.volumes === `Unknown` ? -1 : Number(manga.information.volumes),
    })

    console.log({ Teste: response })

    setIsLoading(false)
  }

  const mangaAlreadyAdded = useCallback(async () => {
    const response = await getUserMangas(userData.token, userData.user.id)

    const alreadyAdded = response?.find((manga: any) => manga.myAnimeListID === id)

    if (alreadyAdded) {
      setMangaAdded(true)
    }
  }, [])

  useEffect(() => {
    mangaAlreadyAdded()
  }, [])

  return (
    <VStack flex={1} bg={`muted.900`}>
      <VStack flex={0.3} position={`relative`}>
        <Image
          resizeMode="cover"
          w="full"
          h="full"
          source={{ uri: manga.picture_url }}
          alt={`image`}
          position={`absolute`}
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
      <VStack flex={0.7} p={4} space={4}>
        <HStack alignItems={`center`} justifyContent={`space-between`}>
          <Heading color={`white`}>{manga.title_ov}</Heading>
          <Text color={`white`} fontSize={`xs`}>
            {manga.information.published}
          </Text>
        </HStack>
        <Text color={`white`}>{manga.synopsis}</Text>
        <HStack alignItems={`center`} space={4}>
          <Text color={`white`} fontSize={`lg`}>
            Status:
          </Text>
          <Text color={`emerald.400`} fontSize={`xs`}>
            {manga.information.status}
          </Text>
        </HStack>
        <HStack alignItems={`center`} space={4}>
          <Text color={`white`} fontSize={`lg`}>
            Author(s):
          </Text>
          <Text color={`emerald.400`} fontSize={`xs`}>
            {manga.information.authors.map((author) => author.name).join(`, `)}
          </Text>
        </HStack>
        <HStack alignItems={`center`} space={4}>
          <Text color={`white`} fontSize={`lg`}>
            Volumes:
          </Text>
          <Text color={`emerald.400`} fontSize={`xs`}>
            {manga.information.volumes}
          </Text>
        </HStack>
        <HStack>
          <Button
            w={`full`}
            py={4}
            bg={mangaAdded ? `error.500` : `success.500`}
            _pressed={{
              bg: `success.800`,
            }}
            isLoading={isLoading}
            onPress={mangaAdded ? onHandleRemove : onHandleAdd}
          >
            <Text color={`white`} fontSize={`lg`} fontWeight={`bold`}>
              {mangaAdded ? `Remover da biblioteca` : `Adicionar a biblioteca`}
            </Text>
          </Button>
        </HStack>
      </VStack>
      <VStack alignItems={`center`} position={`absolute`} top={10} left={5}>
        <IconButton
          size={`md`}
          icon={<CaretLeft size={24} color={`white`} />}
          onPress={navigation.goBack}
        ></IconButton>
      </VStack>
    </VStack>
  )
}