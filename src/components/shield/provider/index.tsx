import { userPermissions } from '@/lib/auth-server'
import { ShieldClientProvider } from './client'

export const ShieldProvider = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const permissions = await userPermissions()

  return (
    <ShieldClientProvider permissions={permissions}>
      {children}
    </ShieldClientProvider>
  )
}
