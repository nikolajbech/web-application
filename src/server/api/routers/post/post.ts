import { z } from 'zod'

import { protectedProcedure } from '../../trpc'

export const post = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .query(async ({ input, ctx }) => {
    const { id } = input
    const { db, session } = ctx

    return db.post.findUnique({
      where: {
        id,
        authorId: session.user.id,
      },
    })
  })
