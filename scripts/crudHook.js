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

const dir = './src/hooks'

const hookPath = `${dir}/use${name}Crud.ts`

const snippet = `import {
  Create${name}Schema,
  create${name}Schema,
  Update${name}Schema,
  update${name}Schema,
} from '~/server/api/routers/${lowerCased}/schema'
import { api } from '~/utils/api'
import { useConfirm } from './useConfirm'
import { useCreateUpdate } from './useCreateUpdate'
import { TRPCClientErrorLike } from '@trpc/client'

export const use${name}Crud = () => {
  const utils = api.useUtils()
  const { confirm } = useConfirm()

  const create${name} = api.${lowerCased}.create${name}.useMutation()
  const update${name} = api.${lowerCased}.update${name}.useMutation()
  const delete${name} = api.${lowerCased}.delete${name}.useMutation()

  const { open: openCreate${name} } = useCreateUpdate<Create${name}Schema>({
    type: 'create',
    formConfig: {
      title: {
        label: 'Title',
        kind: 'input',
      },
      content: {
        label: 'Content',
        kind: 'textarea',
        optional: true,
      },
    },
    zodSchema: create${name}Schema,
    entityName: '${name}',
    mutation: ({ title, content }) =>
      new Promise((resolve, reject) => {
        create${name}
          .mutateAsync({
            id,
            title,
            content,
          })
          .then((data) => resolve(data))
          .catch((error: TRPCClientErrorLike<AppRouter>) => {
            reject(error.message)
          })
      }),
    onSuccess: async () => {
      await utils.${lowerCased}.${lowerCased}s.invalidate()
    },
  })
  const { open: openUpdate${name} } = useCreateUpdate<Update${name}Schema>({
    type: 'update',
    formConfig: {
      title: {
        label: 'Title',
        kind: 'input',
      },
      content: {
        label: 'Content',
        kind: 'textarea',
        optional: true,
      },
    },
    zodSchema: update${name}Schema,
    entityName: '${name}',
    mutation: ({ id, title, content }) =>
      new Promise((resolve, reject) => {
        update${name}
          .mutateAsync({
            id,
            title,
            content,
          })
          .then((data) => resolve(data))
          .catch((error: TRPCClientErrorLike<AppRouter>) => {
            reject(error.message)
          })
      }),
    onSuccess: async () => {
      await utils.${lowerCased}.${lowerCased}s.invalidate()
    },
  })

  const openDelete${name} = ({ id }: { id?: string }) => {
    if (!id) return

    confirm({
      title: 'Delete ${lowerCased}',
      message: 'Are you sure you want to delete this ${lowerCased}?',
      isDanger: true,
      onConfirm: async (cb) => {
        await delete${name}.mutateAsync({
          id,
        })
        await utils.${lowerCased}.${lowerCased}s.invalidate()
        cb()
      },
    })
  }

  return {
    openCreate${name},
    openUpdate${name},
    openDelete${name},
  }
}
`

fs.writeFile(hookPath, snippet, (err) => {
  if (err) {
    console.error(err)
    return
  }
  console.log('Created', name)
})

exec(`code ${hookPath}`)
