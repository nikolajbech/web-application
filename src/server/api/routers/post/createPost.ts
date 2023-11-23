import { z } from 'zod'

import { protectedProcedure } from '../../trpc'

export const createPostSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
})

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
