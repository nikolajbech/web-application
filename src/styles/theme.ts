import { extendTheme, StyleFunctionProps } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

export const BORDER_RADIUS = 6

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      // mode(light, dark)
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('gray.100', 'gray.900')(props),
    },
  }),
}

export const theme = extendTheme({
  styles,
})
