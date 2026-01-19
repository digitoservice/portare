import { db } from '@/lib/db'
import { concatPermission, extractPermission, permissions } from '@/permissions'

export const GROUP_ROOT = 'DESENVOLVEDOR'

export const updatePermissions = async () => {
  const data = []

  for (const { value, guards } of permissions) {
    const { group, code } = extractPermission(value)

    for (const guard of guards) {
      data.push({ group, code, guard })
    }
  }

  const findManyPermissions = await db.permission.findMany()
  const permissionsNotExists: string[] = []

  for (const permission of findManyPermissions) {
    const exists = data.some(
      ({ group, code, guard }) =>
        group === permission.group &&
        code === permission.code &&
        guard === permission.guard,
    )

    if (!exists) permissionsNotExists.push(permission.id)
  }

  if (permissionsNotExists.length) {
    await db.permission.deleteMany({
      where: { id: { in: permissionsNotExists } },
    })
  }

  // await db.permission.createMany({ data, skipDuplicates: true })

  const total = data.length

  for (let i = 0; i < data.length; i++) {
    const permission = data[i]

    await db.permission.upsert({
      where: {
        group_code_guard: {
          group: permission.group,
          code: permission.code,
          guard: permission.guard,
        },
      },
      create: permission,
      update: permission,
    })

    await new Promise((resolve) => setTimeout(resolve, 25))

    const progress = ((i + 1) / total) * 100
    console.info(`Progress: ${progress.toFixed(2)}%`)
  }

  const ids = await db.permission.findMany({ select: { id: true } })

  await db.group.upsert({
    where: { name: GROUP_ROOT },
    create: { name: GROUP_ROOT },
    update: {},
  })

  await db.role.upsert({
    where: { name: GROUP_ROOT },
    create: {
      name: GROUP_ROOT,
      groups: { connect: { name: GROUP_ROOT } },
      permissions: { connect: ids },
    },
    update: {
      groups: { set: { name: GROUP_ROOT } },
      permissions: { set: ids },
    },
  })

  return data.map(({ group, code, guard }) => ({
    permission: concatPermission(group, code),
    guard,
  }))
}

async function main() {
  const data = await updatePermissions()

  console.info('Permissions', data)
}

main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await db.$disconnect()
    process.exit(1)
  })
