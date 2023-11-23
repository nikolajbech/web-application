import { useEffect, type FC } from 'react'
import { Box } from '@chakra-ui/react'
import { signIn, useSession } from 'next-auth/react'

import { api } from '~/utils/api'
import BaseLayout, { BaseLayoutProps } from './BaseLayout'

type Props = BaseLayoutProps & {
  isLoading?: boolean
}

const AuthenticatedLayout: FC<Props> = (p: Props) => {
  const { data: me } = api.me.me.useQuery()
  const { data: session } = useSession()

  useEffect(() => {
    if (session === null) signIn()
  }, [session])

  const isLoading = session === undefined ?? p.isLoading ?? !me

  return (
    <BaseLayout {...p}>
      <Box w='100%' position='relative'>
        <Box w='100%' zIndex={1}>
          {isLoading ? <p>Loading</p> : p.children}
        </Box>
      </Box>
    </BaseLayout>
  )
}

export default AuthenticatedLayout
