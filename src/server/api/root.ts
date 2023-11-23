import { createTRPCRouter } from '~/server/api/trpc'
import { meRouter } from './routers/me/router'

export const appRouter = createTRPCRouter({
  me: meRouter,
})

export type AppRouter = typeof appRouter
