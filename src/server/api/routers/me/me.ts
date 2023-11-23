import { publicProcedure } from '../../trpc'

export const me = publicProcedure.query(async ({ ctx }) => {
  const { session, db } = ctx

  if (!session) {
    return null
  }

  return db.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  })
})
