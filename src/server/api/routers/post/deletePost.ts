import { z } from 'zod'

import { protectedProcedure } from '../../trpc'

export const deletePost = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const { db, session } = ctx
    const { id } = input

    const postToDelete = await db.post.findUnique({
      where: {
        id,
        authorId: session.user.id,
      },
    })

    if (!postToDelete) {
      throw new Error('Post not found')
    }

    return db.post.delete({
      where: {
        id,
      },
    })
  })
