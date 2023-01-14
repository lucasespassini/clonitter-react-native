import { api } from "../provider/api"

export const getPosts = async (id: number) => {
  const { data } = await api.get('/post')
  return data
}