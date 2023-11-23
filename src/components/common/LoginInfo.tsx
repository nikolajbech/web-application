import { FC } from 'react'
import { Button, Text } from '@chakra-ui/react'
import { signIn, signOut } from 'next-auth/react'

import { api } from '~/utils/api'

type Props = {
  param?: string
}

const LoginInfo: FC<Props> = () => {
  const { data: me } = api.me.me.useQuery()

  if (me) {
    return (
      <>
        <Text>
          Signed in as {me.name} ({me.email})
        </Text>
        <Button onClick={() => signOut()}>Sign out</Button>
      </>
    )
  }

  return <Button onClick={() => signIn()}>Sign in</Button>
}

export default LoginInfo
