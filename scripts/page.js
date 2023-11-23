import { exec } from 'child_process'
import fs from 'fs'

const pathRegex = /^\/?(\[?[A-z0-9-]+]?\/?)+$/
const fileNameRegex = /(\[?[A-z0-9-]+]?)+\.tsx$/

const capitalize = (/** @type {string} */ str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const camelize = (/** @type {string} */ str) => {
  return str
    .split('-')
    .map((/** @type {string} */ word, /** @type {number} */ idx) => {
      return idx === 0 ? word : capitalize(word)
    })
    .join('')
}

const pascalize = (/** @type {string} */ str) => {
  return capitalize(camelize(str))
}

const input = process.argv[3]?.trim()

// Check arguments
if (input?.toLocaleLowerCase() !== input) {
  throw Error(
    'Name included a capital letter. Name must be kebab-case (e.g. new-page)',
  )
}

// initial cleanup of path arg
let path = input
  ?.trim()
  // remove index or index.tsx since we'll add back later
  .replace(/index(.tsx)?/, '')
  // remove preceding and trailing slashes
  .replace(/\/$/, '')
  .replace(/^\//, '')

// with auth?
const type = process.argv[2]?.trim()

if (type) {
  if (!['auth', 'normal'].includes(type)) {
    throw Error('Type must be one of: ' + '[auth, normal]' + `. Was ${type}.`)
  }
}

const withAuth = type === 'auth'
path = 'src/pages/' + path
let dir
let fileName
let name = ''

if (fileNameRegex.test(path)) {
  // if a file name (not index.tsx) is specified
  // eg. foo/bar/baz.tsx
  // we split   ^ here so we get
  //
  //  "foo/bar"   and   "baz.tsx"
  //
  const splitPoint = path.lastIndexOf('/')
  dir = path.slice(0, splitPoint)
  fileName = path.slice(splitPoint + 1)
  name = pascalize(fileName.replace('.tsx', '').replace(/\[]/, ''))
} else {
  // no file name specified
  // eg. foo/bar
  dir = path
  fileName = 'index.tsx'
  name = pascalize(path.slice(path.lastIndexOf('/') + 1).replace(/\[]/, ''))
}

if (!pathRegex.test(dir)) {
  throw Error('path must be a valid format.')
}

while (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

const componentPath = `${dir}/${fileName}`
const componentSnippet = `import { FC } from 'react'
import { NextPage } from 'next'

import Layout from '~/layouts/Layout'

const ${name}: FC<NextPage> = () => {
  return (
    <Layout pageTitle='PAGE TITLE HERE'>
      <p>content here</p>
    </Layout>
  )
}

export default ${name}
`

const componentSnippetAuth = `import { FC } from 'react'
import { NextPage } from 'next'
import { useSession } from 'next-auth/react'

import AuthenticatedLayout from '~/layouts/AuthenticatedLayout'

const ${name}: FC<NextPage> = () => {
  const { data: session } = useSession()

  return (
    <AuthenticatedLayout pageTitle='PAGE TITLE HERE'>
      <p>Logged in with user id: {session?.user?.id}</p>
    </AuthenticatedLayout>
  )
}

export default ${name}
`

fs.writeFile(
  componentPath,
  withAuth ? componentSnippetAuth : componentSnippet,
  (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('Created page', name)
  },
)

exec(`code ${componentPath}`)
