import { Button, Center, Container, Flex, Heading } from '@chakra-ui/react'

import LoginInfo from '~/components/common/LoginInfo'
import PostTable from '~/components/common/PostTable'
import { usePostCrud } from '~/hooks/usePostCrud'
import Layout from '~/layouts/Layout'

export default function Home() {
  const { openCreatePost } = usePostCrud()

  return (
    <Layout pageTitle='Home'>
      <Container maxW='md'>
        <Center h='100dvh'>
          <Flex flexDir='column' gap={4} w='100%'>
            <Heading>Web Application</Heading>
            <LoginInfo />
            <Button colorScheme='green' onClick={() => openCreatePost()}>
              New Post
            </Button>
            <PostTable />
          </Flex>
        </Center>
      </Container>
    </Layout>
  )
}
