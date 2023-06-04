export type JikanSearchResponseType = {
  data: JikanSearchResponseDataType[]
  pagination: {
    last_visible_page: number
    has_next_page: true
    items: {
      count: number
      total: number
      per_page: number
    }
  }
}

export type JikanSearchResponseDataType = {
  mal_id: number
  url: string
  images: {
    jpg: {
      image_url: string
      small_image_url: string
      large_image_url: string
    }
    webp: {
      image_url: string
      small_image_url: string
      large_image_url: string
    }
  }
  approved: true
  titles: {
    type: string
    title: string
  }[]

  title: string
  title_english: string
  title_japanese: string
  type: string
  chapters: number
  volumes: number
  status: string
  publishing: true
  published: {
    from: string
    to: string
    prop: {
      from: {
        day: number
        month: number
        year: number
      }
      to: {
        day: number
        month: number
        year: number
      }
      string: string
    }
  }
  score: number
  scored_by: number
  rank: number
  popularity: number
  members: number
  favorites: number
  synopsis: string
  background: string
  authors: {
    mal_id: number
    type: string
    name: string
    url: string
  }[]

  serializations: {
    mal_id: number
    type: string
    name: string
    url: string
  }[]

  genres: {
    mal_id: number
    type: string
    name: string
    url: string
  }[]

  explicit_genres: {
    mal_id: number
    type: string
    name: string
    url: string
  }[]

  themes: {
    mal_id: number
    type: string
    name: string
    url: string
  }[]

  demographics: {
    mal_id: number
    type: string
    name: string
    url: string
  }[]
}
