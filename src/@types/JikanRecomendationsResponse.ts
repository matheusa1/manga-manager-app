export type JikanRecomendationsResponse = {
  data: JikanRecomendationsResponseData[]
  pagination: {
    last_visible_page: number
    has_next_page: true
  }
}

export type JikanRecomendationsResponseData = {
  mal_id: string
  entry: {
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
    title: string
  }[]
  content: string
  user: {
    url: string
    username: string
  }
}
