import { FC } from 'react'

import { usePostCrud } from '~/hooks/usePostCrud'
import { PostFromPosts } from '~/server/api/routers/post/posts'
import { UpdatePostSchema } from '~/server/api/routers/post/schema'
import { api } from '~/utils/api'
import InfinityScrollTable from './InfinityScrollTable'

const PostTable: FC = () => {
  const { openUpdatePost } = usePostCrud()

  const { data, fetchNextPage, hasNextPage, isLoading } =
    api.post.posts.useInfiniteQuery(
      {
        limit: 30,
      },
      {
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
      },
    )

  const posts = data?.pages.flatMap((page) => page.items)

  return (
    <InfinityScrollTable<PostFromPosts>
      data={posts ?? []}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      columns={[
        {
          key: 'title',
          title: 'Title',
        },
        {
          key: 'content',
          title: 'Content',
        },
      ]}
      size='sm'
      isLoading={isLoading}
      onRowClick={(v) =>
        openUpdatePost({ ...v, content: v.content ?? '' } as UpdatePostSchema)
      }
    />
  )
}

export default PostTable
