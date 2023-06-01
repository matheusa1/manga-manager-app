export type MangaDetailType = {
  title_ov: string
  title_en: string
  synopsis: string
  picture_url: string
  alternative_titles: {
    english: string
    japanese: string
  }
  characters: {
    name: string
    picture_url: string
    myanimelist_url: string
  }[]
  statistics: {
    score: string
    ranked: string
    popularity: string
    members: string
    favorites: string
  }
  information: {
    volumes: string
    chapters: string
    status: string
    published: string
    type: {
      name: string
      url: string
    }[]
    genre: {
      name: string
      url: string
    }[]
    theme: {
      name: string
      url: string
    }[]
    demographic: {
      name: string
      url: string
    }[]
    serialization: {
      name: string
      url: string
    }[]
    authors: {
      name: string
      url: string
    }[]
  }
}
