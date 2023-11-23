import {
  Table as ChakraTable,
  Skeleton,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import InfiniteScroll from 'react-infinite-scroll-component'

export type TableColumn<T> = {
  key: keyof T
  title?: string
  render?: <K extends keyof T>(
    value: T[K],
    allValues: T,
  ) => JSX.Element | string | undefined | null
}

type Props<T> = {
  data: T[]
  columns: TableColumn<T>[]
  fetchNextPage?: () => void
  hasNextPage?: boolean
  endMessage?: string
  onRowClick?: (item: T) => void
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export function InitifyScrollTable<T>(p: Props<T>) {
  if (p.isLoading) {
    return <Skeleton height='200px' />
  }

  return (
    <TableContainer>
      <InfiniteScroll
        dataLength={p.data.length}
        next={() => p.fetchNextPage?.()}
        hasMore={!!p.hasNextPage}
        loader={<h4>Loading...</h4>}
        endMessage={<Text textAlign='center'>{p.endMessage}</Text>}
        style={{ overflow: 'unset' }}
      >
        <ChakraTable size={p.size ?? 'md'}>
          <Thead>
            <Tr>
              {p.columns.map((column, i) => (
                <Th key={i}>
                  <Text fontWeight='bold'>{column.title}</Text>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {p.data.map((item, i) => {
              return (
                <Tr
                  key={i}
                  _hover={
                    p.onRowClick
                      ? { bg: 'hover.500', cursor: 'pointer' }
                      : undefined
                  }
                  onClick={() => p.onRowClick?.(item)}
                >
                  {p.columns.map((column, i) => {
                    const value = item[column.key]

                    return (
                      <Td key={i}>
                        {column.render
                          ? column.render?.(value, item)
                          : typeof value === 'string'
                            ? value
                            : ''}
                      </Td>
                    )
                  })}
                </Tr>
              )
            })}
          </Tbody>
        </ChakraTable>
      </InfiniteScroll>
    </TableContainer>
  )
}

export default InitifyScrollTable
