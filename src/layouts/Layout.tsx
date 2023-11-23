import type { FC } from 'react'

import BaseLayout, { BaseLayoutProps } from './BaseLayout'

type Props = Omit<BaseLayoutProps, 'session'>

const Layout: FC<Props> = (p: Props) => (
  <BaseLayout {...p}>{p.children}</BaseLayout>
)

export default Layout
