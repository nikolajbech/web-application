import { extendTheme, StyleFunctionProps } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

export const BORDER_RADIUS = 6

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      // ____mode(light, _____ dark)
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('gray.100', 'gray.900')(props),
      hover: mode('gray.200', 'gray.700')(props),
    },
  }),
}

export const theme = extendTheme({
  styles,
})
