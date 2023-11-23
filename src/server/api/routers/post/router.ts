import { createTRPCRouter } from '../../trpc'
import { createPost } from './createPost'
import { deletePost } from './deletePost'
import { post } from './post'
import { posts } from './posts'
import { updatePost } from './updatePost'

export const postRouter = createTRPCRouter({
  post,
  posts,
  createPost,
  updatePost,
  deletePost,
})
