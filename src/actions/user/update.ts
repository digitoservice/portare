'use server'

import { db } from '@/lib/db'
import { ActionState, safeAction } from '@/lib/safe-action'
import { User } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { UserUpdateSchema } from './schema'
import { hashPassword } from '@/lib/password'

type InputType = z.infer<typeof UserUpdateSchema>
type ReturnType = ActionState<InputType, User>

const handler = async (data: InputType): Promise<ReturnType> => {
  const { id, username, password, groups } = data

  try {
    const existingUser = await db.user.findUniqueOrThrow({
      where: { id },
    })

    if (username && username !== existingUser.username) {
      const find = await db.user.findFirst({
        where: { NOT: { id }, username },
      })

      if (find) {
        return { error: 'Já existe um usuário com esse nome' }
      }
    }

    const user = await db.user.update({
      where: { id },
      data: {
        name: username || undefined,
        email: username ? `${username}@portare.local` : undefined,
        username: username || undefined,
        displayUsername: username || undefined,
        groups: { set: (groups || []).filter(Boolean) as { id: number }[] },
      },
    })

    if (password) {
      await db.account.updateMany({
        where: {
          userId: id,
        },
        data: {
          password: await hashPassword(password),
        },
      })
    }

    revalidatePath(`/system/users/${id}`)
    revalidatePath('/system/users')
    revalidatePath('/')

    return { data: user }
  } catch (error) {
    return { error: 'Ocorreu um erro ao atualizar, tente novamente mais tarde' }
  }
}

export const updateAction = safeAction(UserUpdateSchema, handler)
