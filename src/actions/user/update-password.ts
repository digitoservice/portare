'use server'

import { auth } from '@/lib/auth'
import { ActionState, safeAction } from '@/lib/safe-action'
import { headers } from 'next/headers'
import { z } from 'zod'
import { UserUpdatePasswordSchema } from './schema'
import { User } from 'better-auth'

type InputType = z.infer<typeof UserUpdatePasswordSchema>
type ReturnType = ActionState<InputType, User>

const handler = async (data: InputType): Promise<ReturnType> => {
  const { currentPassword, newPassword, passwordConfirmation } = data

  try {
    if (newPassword !== passwordConfirmation) {
      return { error: 'As senhas não coincidem' }
    }

    if (currentPassword === newPassword) {
      return { error: 'A nova senha não pode ser igual a atual' }
    }

    const { user } = await auth.api.changePassword({
      body: {
        newPassword,
        currentPassword,
      },
      headers: headers(),
    })

    if (!user) {
      return { error: 'Ocorreu um erro ao atualizar a senha' }
    }

    return { data: user }
  } catch (error) {
    return { error: 'Ocorreu um erro ao atualizar, tente novamente mais tarde' }
  }
}

export const updatePasswordAction = safeAction(
  UserUpdatePasswordSchema,
  handler,
)
