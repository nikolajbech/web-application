import { inferRouterOutputs } from '@trpc/server'
import { z } from 'zod'

import { AppRouter } from '../../root'
import { protectedProcedure } from '../../trpc'

export type PostFromPosts =
  inferRouterOutputs<AppRouter>['post']['posts']['items'][number]

export const posts = protectedProcedure
  .input(
    z.object({
      limit: z.number().min(1).max(100).nullish(),
      cursor: z.string().nullish(),
    }),
  )
  .query(async ({ input, ctx }) => {
    const { cursor } = input
    const limit = input.limit ?? 15
    const { db, session } = ctx

    const query = {
      where: {
        authorId: session.user.id,
      },
    }

    const count = await db.post.count(query)
    const items = await db.post.findMany({
      ...query,
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
    })

    let nextCursor: typeof cursor | undefined = undefined

    if (items.length > limit) {
      const nextItem = items.pop()
      nextCursor = nextItem!.id
    }

    return {
      items,
      count,
      nextCursor,
    }
  })
