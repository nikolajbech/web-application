import { type AppType } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

import { ConfirmProvider } from '~/hooks/useConfirm'
import { CrudProvider } from '~/hooks/useCrud'
import { GlobalStateProvider } from '~/hooks/useGlobalState'
import { theme } from '~/styles/theme'
import { api } from '~/utils/api'

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <GlobalStateProvider>
          <ConfirmProvider>
            <CrudProvider>
              <Component {...pageProps} />
            </CrudProvider>
          </ConfirmProvider>
        </GlobalStateProvider>
      </ChakraProvider>
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)
