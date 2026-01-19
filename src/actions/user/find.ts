'use server'

import { db } from '@/lib/db'
import { ActionState, safeAction } from '@/lib/safe-action'
import { z } from 'zod'
import { UserResource, userResource } from '@/actions/types'
import { UserIdSchema } from './schema'

type InputType = z.infer<typeof UserIdSchema>
type ReturnType = ActionState<InputType, UserResource>

const handler = async (data: InputType): Promise<ReturnType> => {
  const { id } = data

  try {
    const user = await db.user.findUniqueOrThrow({
      where: { id },
      ...userResource,
    })

    return { data: user }
  } catch (error) {
    return {
      error: 'Não encontramos nenhum dado com o ID informado',
    }
  }
}

export const findAction = safeAction(UserIdSchema, handler)
