import { createTRPCRouter } from '~/server/api/trpc'
import { meRouter } from './routers/me/router'
import { postRouter } from './routers/post/router'

export const appRouter = createTRPCRouter({
  me: meRouter,
  post: postRouter,
})

export type AppRouter = typeof appRouter
