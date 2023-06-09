import { getMangaResponseType } from "./GetMangasTypes"

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      signIn: undefined;
      signUp: undefined;
      search: undefined;
      library: undefined;
      tabs: undefined;
      mangaDetail: { mangaId: number };
      handleManga: getMangaResponseType
      profile: undefined
    }
  }
}