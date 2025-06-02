import { APP_URL } from '@/constants'
import type { Post, User } from '@/models'

export const getPosts = async (): Promise<Post[] | []> => {
  try {
    const response = await fetch(`${APP_URL}/posts`)
    const posts = await response.json()
    if (posts) {
      return posts
    }
  } catch (error) {
    console.error(error)
  }
  return []
}

export const getUsers = async (): Promise<User[] | []> => {
  try {
    const response = await fetch(`${APP_URL}/users`)
    const users = await response.json()
    if (users) {
      return users
    }
  } catch (error) {
    console.error(error)
  }
  return []
}