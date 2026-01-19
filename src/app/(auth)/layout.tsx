import { authenticated } from '@/lib/auth-server'
import { Authenticated } from './_components/authenticated'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const auth = await authenticated()

  if (auth) {
    return (
      <main>
        <Authenticated />
      </main>
    )
  }

  return <main>{children}</main>
}
