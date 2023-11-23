import { protectedProcedure } from '../../trpc'
import { createPostSchema } from './schema'

export const createPost = protectedProcedure
  .input(createPostSchema)
  .mutation(async ({ input, ctx }) => {
    const { db, session } = ctx
    const { title, content } = input

    return db.post.create({
      data: {
        title,
        content,
        authorId: session.user.id,
      },
    })
  })
