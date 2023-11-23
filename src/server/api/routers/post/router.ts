import { createTRPCRouter } from '../../trpc'
import { createPost } from './createPost'
import { deletePost } from './deletePost'
import { posts } from './posts'

export const postRouter = createTRPCRouter({
  posts,
  createPost,
  deletePost,
})
