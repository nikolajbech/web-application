import {
  CreatePostSchema,
  createPostSchema,
  UpdatePostSchema,
  updatePostSchema,
} from '~/server/api/routers/post/schema'
import { api } from '~/utils/api'
import { useConfirm } from './useConfirm'
import { useCreateUpdate } from './useCreateUpdate'

export const usePostCrud = () => {
  const utils = api.useUtils()
  const { confirm } = useConfirm()

  const createPost = api.post.createPost.useMutation()
  const updatePost = api.post.updatePost.useMutation()
  const deletePost = api.post.deletePost.useMutation()

  const { open: openCreatePost } = useCreateUpdate<CreatePostSchema>({
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
    zodSchema: createPostSchema,
    entityName: 'Post',
    mutation: ({ title, content }) =>
      new Promise((resolve, reject) => {
        try {
          createPost
            .mutateAsync({
              title,
              content: content ?? '',
            })
            .then((data) => resolve(data))
        } catch (error) {
          reject()
        }
      }),
    onSuccess: async () => {
      await utils.post.posts.invalidate()
    },
  })
  const { open: openUpdatePost } = useCreateUpdate<UpdatePostSchema>({
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
    zodSchema: updatePostSchema,
    entityName: 'Post',
    mutation: ({ id, title, content }) =>
      new Promise((resolve, reject) => {
        try {
          updatePost
            .mutateAsync({
              id,
              title,
              content: content ?? '',
            })
            .then((data) => resolve(data))
        } catch (error) {
          reject()
        }
      }),
    onSuccess: async () => {
      await utils.post.posts.invalidate()
    },
  })

  const openDeletePost = (id?: string) => {
    if (!id) return

    confirm({
      title: 'Delete post',
      message: 'Are you sure you want to delete this post?',
      isDanger: true,
      onConfirm: async (cb) => {
        await deletePost.mutateAsync({
          id,
        })
        await utils.post.posts.invalidate()
        cb()
      },
    })
  }

  return {
    openCreatePost,
    openUpdatePost,
    openDeletePost,
  }
}
