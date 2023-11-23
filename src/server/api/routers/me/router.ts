import { createTRPCRouter } from '../../trpc'
import { me } from './me'

export const meRouter = createTRPCRouter({
  me,
})
