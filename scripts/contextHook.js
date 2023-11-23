import fs from 'fs'

// Extract arguments
const contextHookName = process.argv[2]?.trim()

// Check arguments

// @ts-ignore
if (contextHookName[0].startsWith('use')) {
  throw Error('Should not start with use. This will be added automatically')
}

// @ts-ignore
if (contextHookName[0].toUpperCase() !== contextHookName[0]) {
  throw Error('contextHook name must start with a capital letter')
}

const dir = './src/hooks'

const contextHookPath = `${dir}/use${contextHookName}.tsx`
const contextHookSnippet = `import { createContext, FC, ReactElement, useContext, useState } from 'react'

type State = {
  value: string
  setValue: (value: string) => void
}

const defaultValue: State = {
  value: '',
  setValue: () => null,
}

export const ${contextHookName}Context = createContext<State>(defaultValue)
export const use${contextHookName} = (): State => useContext(${contextHookName}Context)

type ${contextHookName}ProviderProps = {
  children: ReactElement
}

export const ${contextHookName}Provider: FC<${contextHookName}ProviderProps> = (p) => {
  const [value, setValue] = useState<string>('')

  return (
    <${contextHookName}Context.Provider
      value={{
        value,
        setValue,
      }}
    >
      {p.children}
    </${contextHookName}Context.Provider>
  )
}
`

fs.writeFile(contextHookPath, contextHookSnippet, (err) => {
  if (err) {
    console.error(err)
    return
  }
  console.log('Created', contextHookName)
})
