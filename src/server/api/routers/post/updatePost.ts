import { protectedProcedure } from '../../trpc'
import { updatePostSchema } from './schema'

export const updatePost = protectedProcedure
  .input(updatePostSchema)
  .mutation(async ({ input, ctx }) => {
    const { db, session } = ctx
    const { id, title, content } = input

    return db.post.update({
      where: {
        id,
        authorId: session.user.id,
      },
      data: {
        title,
        content,
      },
    })
  })
