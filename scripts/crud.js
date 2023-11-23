import { exec } from 'child_process'
/* eslint-disable @typescript-eslint/ban-ts-comment */
import fs from 'fs'

const name = process.argv[2]?.trim()

// @ts-ignore
if (name[0].toUpperCase() !== name[0]) {
  throw Error('Component name must start with a capital letter')
}

// @ts-ignore
const lowerCased = name[0].toLowerCase() + name.slice(1)

const dbModel = `
model ${name} {
    id        String   @id @default(cuid())
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
    name      String
}
`

const getOne = `import { z } from 'zod'

import { protectedProcedure } from '../../trpc'

export const ${lowerCased} = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .query(async ({ input, ctx }) => {
    const { id } = input
    const { db, session } = ctx

    return db.${lowerCased}.findUnique({
      where: {
        id,
        authorId: session.user.id,
      },
    })
  })
`

const getAll = `import { inferRouterOutputs } from '@trpc/server'
import { z } from 'zod'

import { AppRouter } from '../../root'
import { protectedProcedure } from '../../trpc'

export type ${name}From${name}s =
  inferRouterOutputs<AppRouter>['${lowerCased}']['${lowerCased}s']['items'][number]

export const ${lowerCased}s = protectedProcedure
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

    const count = await db.${lowerCased}.count(query)
    const items = await db.${lowerCased}.findMany({
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
`

const create = `import { protectedProcedure } from '../../trpc'
import { create${name}Schema } from './schema'

export const create${name} = protectedProcedure
  .input(create${name}Schema)
  .mutation(async ({ input, ctx }) => {
    const { db, session } = ctx
    const { name } = input

    return db.${lowerCased}.create({
      data: {
        name,
      },
    })
  })
`

const update = `import { protectedProcedure } from '../../trpc'
import { update${name}Schema } from './schema'

export const update${name} = protectedProcedure
  .input(update${name}Schema)
  .mutation(async ({ input, ctx }) => {
    const { db, session } = ctx
    const { id, name } = input

    return db.${lowerCased}.update({
      where: {
        id,
      },
      data: {
        name,
      },
    })
  })
`

const del = `import { z } from 'zod'

import { protectedProcedure } from '../../trpc'

export const delete${name} = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const { db, session } = ctx
    const { id } = input

    const ${lowerCased}ToDelete = await db.${lowerCased}.findUnique({
      where: {
        id,
      },
    })

    if (!${lowerCased}ToDelete) {
      throw new Error('${name} not found')
    }

    return db.${lowerCased}.delete({
      where: {
        id,
      },
    })
  })
`

const router = `import { createTRPCRouter } from '../../trpc'
import { create${name} } from './create${name}'
import { delete${name} } from './delete${name}'
import { ${lowerCased} } from './${lowerCased}'
import { ${lowerCased}s } from './${lowerCased}s'
import { update${name} } from './update${name}'

export const ${lowerCased}Router = createTRPCRouter({
  ${lowerCased},
  ${lowerCased}s,
  create${name},
  update${name},
  delete${name},
})
`

const schema = `import { z } from 'zod'

export const create${name}Schema = z.object({
  name: z.string(),
})

export type Create${name}Schema = z.infer<typeof create${name}Schema>

export const update${name}Schema = z.object({
  id: z.string(),
  name: z.string(),
})

export type Update${name}Schema = z.infer<typeof update${name}Schema>
`

// Make API dir
fs.mkdir(`./src/server/api/routers/${lowerCased}`, (err) => {
  if (err) throw err
  console.log('Created', name)
})

// Write files
fs.appendFile(`./prisma/schema.prisma`, dbModel, (err) => {
  if (err) throw err
  console.log('Created', name)
})

fs.writeFile(
  `./src/server/api/routers/${lowerCased}/${lowerCased}.ts`,
  getOne,
  (err) => {
    if (err) throw err
    console.log('Created', name)
  },
)

fs.writeFile(
  `./src/server/api/routers/${lowerCased}/${lowerCased}s.ts`,
  getAll,
  (err) => {
    if (err) throw err
    console.log('Created', name)
  },
)

fs.writeFile(
  `./src/server/api/routers/${lowerCased}/create${name}.ts`,
  create,
  (err) => {
    if (err) throw err
    console.log('Created', name)
  },
)

fs.writeFile(
  `./src/server/api/routers/${lowerCased}/update${name}.ts`,
  update,
  (err) => {
    if (err) throw err
    console.log('Created', name)
  },
)

fs.writeFile(
  `./src/server/api/routers/${lowerCased}/delete${name}.ts`,
  del,
  (err) => {
    if (err) throw err
    console.log('Created', name)
  },
)

fs.writeFile(
  `./src/server/api/routers/${lowerCased}/router.ts`,
  router,
  (err) => {
    if (err) throw err
    console.log('Created', name)
  },
)

fs.writeFile(
  `./src/server/api/routers/${lowerCased}/schema.ts`,
  schema,
  (err) => {
    if (err) throw err
    console.log('Created', name)
  },
)

console.log('Add:')
console.log(`${lowerCased}: ${lowerCased}Router,`)
console.log('to root.ts')

exec(`code ./src/server/api/root.ts`)
