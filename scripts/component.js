import { exec } from 'child_process'
import fs from 'fs'

const kebabCase = (/** @type {string} */ str) => {
  return str
    .split('')
    .map((/** @type {string} */ letter, /** @type {number} */ idx) => {
      return letter.toUpperCase() === letter
        ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
        : letter
    })
    .join('')
}

const capitalize = (/** @type {string} */ str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const componentName = capitalize(process.argv[2]?.trim() ?? '')
const category = process.argv[3]?.trim()

const categoryName = category ? kebabCase(category) : 'common'
const dir = `./src/components/${categoryName}`

if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

const componentPath = `${dir}/${componentName}.tsx`

const componentSnippet = `import { FC } from 'react'
import { Box, Text } from '@chakra-ui/react'

type Props = {
  param?: string
}

const ${componentName}: FC<Props> = (p) => {
  return (
    <Box>
      <Text>${componentName}</Text>
    </Box>
  )
}

export default ${componentName}
`

fs.writeFile(componentPath, componentSnippet, (err) => {
  if (err) {
    console.error(err)
    return
  }
  console.log('Created', componentName)
})

exec(`code ${componentPath}`)
