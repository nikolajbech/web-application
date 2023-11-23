import { createTRPCRouter } from '../../trpc'
import { createPost } from './createPost'
import { posts } from './posts'

export const postRouter = createTRPCRouter({
  posts,
  createPost,
})
