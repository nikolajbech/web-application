import { extendTheme, StyleFunctionProps } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

// https://stackoverflow.com/questions/71040725/how-can-i-set-different-color-for-light-and-dark-chakra-ui-themes

export const BORDER_RADIUS = 6

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      // ____mode(light, _____ dark)
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('gray.100', 'gray.900')(props),
    },
  }),
}

export const theme = extendTheme({
  styles,
})
