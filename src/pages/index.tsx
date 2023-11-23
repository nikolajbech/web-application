import {
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react'
import { signIn, signOut } from 'next-auth/react'

import Layout from '~/layouts/Layout'
import { api } from '~/utils/api'

export default function Home() {
  const { data: me } = api.me.me.useQuery()

  return (
    <Layout pageTitle='Home'>
      <Container maxW='md'>
        <Center h='100dvh'>
          <Flex flexDir='column' gap={4} w='100%'>
            <Heading>Web Application</Heading>
            {me ? (
              <>
                <Text>
                  Signed in as {me.name} ({me.email})
                </Text>
                <Button onClick={() => signOut()}>Sign out</Button>
              </>
            ) : (
              <Button onClick={() => signIn()}>Sign in</Button>
            )}
          </Flex>
        </Center>
      </Container>
    </Layout>
  )
}
