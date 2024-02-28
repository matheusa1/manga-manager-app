import { useNavigation, useRoute } from '@react-navigation/native'
import {
  Button,
  Center,
  HStack,
  Heading,
  IconButton,
  Image,
  ScrollView,
  Text,
  VStack,
  useToast,
} from 'native-base'
import { AlertDialog } from 'native-base'
import { CaretLeft } from 'phosphor-react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ActivityIndicator } from 'react-native'

import { useManga } from '../../context/MangaContext'
import { useAuth } from '../../context/UserContext'
import {
  addMangaToUser,
  getMangaDetailOnMyAnimeList,
  getUserMangas,
  removeManga,
} from '../../service/api'

type MangaDetailProps = {
  mangaId: number
}

export const MangaDetail = () => {
  const route = useRoute()
  const param = route.params as MangaDetailProps

  const id = param.mangaId
  const { userData } = useAuth()
  const { updateUserMangas } = useManga()
  const [isLoading, setIsLoading] = useState(false)
  const [mangaAdded, setMangaAdded] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [manga, setManga] = useState<any>()
  const cancelRef = useRef(null)
  const navigation = useNavigation()

  const Toast = useToast()

  const getMangaDetail = useCallback(async () => {
    try {
      const res = await getMangaDetailOnMyAnimeList(id)
      setManga(res.response)
    } catch (error) {
      console.error(error)
    }
  }, [])

  const onHandleRemove = async () => {
    await removeManga(userData.token, userData.user.id, id)

    updateUserMangas(userData.token, userData.user.id)

    setMangaAdded(false)
    setIsAlertOpen(false)

    Toast.show({
      placement: `top`,
      render: () => (
        <VStack space={4} alignItems="center" bg={`danger.500`} p={4} rounded={8}>
          <Text color="white" fontWeight="bold">
            Removido com sucesso!
          </Text>
        </VStack>
      ),
    })
  }

  const onHandleAdd = async () => {
    setIsLoading(true)

    if (!manga) return

    await addMangaToUser(userData.token, userData.user.id, {
      title: manga.title_ov,
      image_url: manga.picture_url,
      myAnimeListID: id,
      volumes: manga?.information?.volumes === null ? -1 : manga?.information?.volumes,
    })

    setMangaAdded(true)
    updateUserMangas(userData.token, userData.user.id)

    setIsLoading(false)

    Toast.show({
      placement: `top`,
      render: () => (
        <VStack space={4} alignItems="center" bg={`success.500`} p={4} rounded={8}>
          <Text color="white" fontWeight="bold">
            Adicionado com sucesso!
          </Text>
        </VStack>
      ),
    })
  }

  const mangaAlreadyAdded = useCallback(async () => {
    const response = await getUserMangas(userData.token, userData.user.id)
    console.log(response)

    const alreadyAdded = response?.find((manga: any) => manga.myAnimeListID === id)

    if (alreadyAdded) {
      setMangaAdded(true)
    }
  }, [])

  useEffect(() => {
    getMangaDetail()
    mangaAlreadyAdded()
  }, [])

  return (
    <VStack flex={1} bg={`muted.900`}>
      {manga ? (
        <>
          <VStack flex={0.3} position={`relative`}>
            <Image
              resizeMode="cover"
              w="full"
              h="full"
              source={{ uri: manga.picture_url }}
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
              <VStack justifyContent={`space-between`}>
                <Heading color={`white`}>{manga.title_ov}</Heading>
                <Text color={`white`} fontSize={`xs`}>
                  {manga.information?.published}
                </Text>
              </VStack>
              <Text color={`white`}>{manga?.synopsis}</Text>
              <HStack alignItems={`center`} space={4}>
                <Text color={`white`} fontSize={`lg`}>
                  Status:
                </Text>
                <Text color={`emerald.400`} fontSize={`xs`}>
                  {manga.information?.status}
                </Text>
              </HStack>
              <HStack alignItems={`center`} space={4}>
                <Text color={`white`} fontSize={`lg`}>
                  Author(s):
                </Text>
                <Text color={`emerald.400`} fontSize={`xs`}>
                  {manga.information?.authors?.map((author: any) => author.name)}
                </Text>
              </HStack>
              <HStack alignItems={`center`} space={4}>
                <Text color={`white`} fontSize={`lg`}>
                  Volumes:
                </Text>
                <Text color={`emerald.400`} fontSize={`xs`}>
                  {manga.information?.volumes ? manga.information.volumes : `Desconhecido`}
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
                  onPress={mangaAdded ? () => setIsAlertOpen(true) : onHandleAdd}
                >
                  <Text color={`white`} fontSize={`lg`} fontWeight={`bold`}>
                    {mangaAdded ? `Remover da biblioteca` : `Adicionar a biblioteca`}
                  </Text>
                </Button>
              </HStack>
            </VStack>
          </ScrollView>

          <VStack alignItems={`center`} position={`absolute`} top={10} left={5}>
            <IconButton
              size={`md`}
              icon={<CaretLeft size={24} color={`white`} />}
              onPress={navigation.goBack}
            ></IconButton>
          </VStack>
          <AlertDialog
            isOpen={isAlertOpen}
            leastDestructiveRef={cancelRef}
            onClose={() => setIsAlertOpen(false)}
          >
            <AlertDialog.Content>
              <AlertDialog.Header fontSize="lg" fontWeight="bold">
                Remover da biblioteca
              </AlertDialog.Header>
              <AlertDialog.Body>
                Tem certeza que deseja remover esse mangá da sua biblioteca?
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button ref={cancelRef} onPress={() => setIsAlertOpen(false)}>
                  Cancelar
                </Button>
                <Button colorScheme="red" onPress={onHandleRemove} ml={3}>
                  Remover
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>
        </>
      ) : (
        <Center flex={1}>
          <ActivityIndicator size="large" color="#fff" />
        </Center>
      )}
    </VStack>
  )
}
