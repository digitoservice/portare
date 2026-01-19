import { UserResource, userResource } from '@/actions/types'
import { db } from '@/lib/db'
import { auth } from './auth'
import { Permission } from '@prisma/client'
import { headers } from 'next/headers'

export const authenticated = async (): Promise<boolean> => {
  const session = await auth.api.getSession({
    headers: headers(),
  })

  return Boolean(session?.user)
}

export const currentUser = async (): Promise<UserResource | undefined> => {
  const session = await auth.api.getSession({
    headers: headers(),
  })

  if (session?.user) {
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      include: userResource.include,
    })

    if (user) return user
  }
}

export const userPermissions = async (): Promise<Permission[]> => {
  let permissions: Permission[] = []

  const session = await auth.api.getSession({
    headers: headers(),
  })

  if (session?.user) {
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: {
        groups: { select: { roles: { select: { permissions: true } } } },
      },
    })

    if (user) {
      permissions = user.groups.reduce((acc: Permission[], { roles }) => {
        const groupPermissions = roles.reduce(
          (acc: Permission[], { permissions }) => [...acc, ...permissions],
          [],
        )

        return [...acc, ...groupPermissions]
      }, [])
    }
  }

  return permissions
}
