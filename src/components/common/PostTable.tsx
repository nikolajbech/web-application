import { FC } from 'react'

import { PostFromPosts } from '~/server/api/routers/post/posts'
import { api } from '~/utils/api'
import InfinityScrollTable from './InfinityScrollTable'

const PostTable: FC = () => {
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
    />
  )
}

export default PostTable
