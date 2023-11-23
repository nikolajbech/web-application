/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod'

import EasyForm, { FieldSettingsFalsable } from '~/components/common/Form'
import { useCrud } from './useCrud'

export type CreateUpdateReturnType<T> = {
  open: (initialValues?: Partial<T>) => void
}

type UseCreateUpdateProps<T> = {
  formConfig: Partial<
    Record<Extract<keyof T, string>, FieldSettingsFalsable<T>>
  >
  zodSchema?: z.ZodObject<any>
  entityName: string
  type: 'create' | 'update'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutation: (values: T) => Promise<any>
  onSuccess?: () => Promise<void>
  initialValues?: Partial<T>
}

export function useCreateUpdate<T>(
  p: UseCreateUpdateProps<T>,
): CreateUpdateReturnType<T> {
  const { setTitle, setFormElement, setModalIsOpen, triggerNotification } =
    useCrud()

  const _onSuccess = () => {
    closeModal()
    triggerNotification(
      'Success',
      `${'Successfully'} ${typeMode(
        'created',
        'updated',
      )} ${p.entityName.toLocaleLowerCase()}`,
      'success',
    )
  }

  const typeMode = (create: string, update: string) => {
    return p.type === 'create' ? create : update
  }

  const onError = (errorMessage?: string) => {
    triggerNotification(
      'Error',
      errorMessage ??
        `${'An error occured while'} ${typeMode(
          'creating',
          'updating',
        )} ${p.entityName.toLocaleLowerCase()}`,
      'error',
    )
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const open = (initialValues?: Partial<T>) => {
    setTitle(`${typeMode('Create', 'Update')} ${p.entityName}`)
    setFormElement(
      <EasyForm<T>
        loading={false} // Handled by easy form itself
        config={p.formConfig}
        initialValues={initialValues}
        submitButtonText={`${typeMode('Create', 'Update')}`}
        onCancel={closeModal}
        onSubmit={(val, cb) => {
          p.mutation(val as T)
            .catch((e: unknown) => {
              onError(JSON.stringify(e))
            })
            .then(async () => {
              _onSuccess()
              await p.onSuccess?.()
            })
            .finally(() => {
              cb()
            })
        }}
        zodSchema={p.zodSchema}
      />,
    )
    setModalIsOpen(true)
  }

  return {
    open,
  }
}
