'use server'

import { db } from '@/lib/db'
import { auth } from '@/lib/auth'
import { ActionState, safeAction } from '@/lib/safe-action'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { UserSchema } from './schema'
import { User } from 'better-auth'

type InputType = z.infer<typeof UserSchema>
type ReturnType = ActionState<InputType, User>

const handler = async (data: InputType): Promise<ReturnType> => {
  const { username, password } = data

  try {
    const existingUser = await db.user.findFirst({ where: { username } })

    if (existingUser) {
      return { error: 'Já existe um usuário com esse nome' }
    }

    const { user } = await auth.api.signUpEmail({
      body: {
        name: username,
        email: `${username}@portare.local`,
        username,
        password,
      },
      headers: headers(),
    })

    if (!user) {
      return { error: 'Ocorreu um erro ao criar, tente novamente mais tarde' }
    }

    revalidatePath('/system/users')

    return { data: user }
  } catch (error) {
    return { error: 'Ocorreu um erro ao criar, tente novamente mais tarde' }
  }
}

export const createAction = safeAction(UserSchema, handler)
