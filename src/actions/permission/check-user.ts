'use server'

import { db } from '@/lib/db'
import { auth } from '@/lib/auth'
import { extractPermission, PermissionGroupCode } from '@/permissions'
import { PermissionGuard } from '@prisma/client'
import { headers } from 'next/headers'

export const checkUserAction = async ({
  permission,
  guard,
}: {
  permission?: PermissionGroupCode[] | PermissionGroupCode
  guard?: PermissionGuard
}): Promise<boolean> => {
  const session = await auth.api.getSession({
    headers: headers(),
  })

  if (!session?.user || !permission || !guard) return false

  let user

  if (Array.isArray(permission)) {
    const permissions = permission.map(extractPermission)

    user = await db.user.findUnique({
      where: {
        id: session.user.id,
        groups: {
          some: {
            roles: {
              some: { permissions: { some: { OR: permissions, guard } } },
            },
          },
        },
      },
    })
  } else {
    const { group, code } = extractPermission(permission)

    user = await db.user.findUnique({
      where: {
        id: session.user.id,
        groups: {
          some: {
            roles: { some: { permissions: { some: { group, code, guard } } } },
          },
        },
      },
    })
  }

  return Boolean(user)
}
