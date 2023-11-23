import { z } from 'zod'

export const createPostSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
})

export type CreatePostSchema = z.infer<typeof createPostSchema>

export const updatePostSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string().optional(),
})

export type UpdatePostSchema = z.infer<typeof updatePostSchema>
