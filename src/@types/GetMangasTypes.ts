export type getMangaResponseType = {
  MangaID: number
  title: string
  image_url: string
  volumes: number
  volumesOwned: number[]
  myAnimeListID: number
  createdAt: string
  updatedAt: string
  userRelation: number
}

export type getMangasResponseType = getMangaResponseType[]
