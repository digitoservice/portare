import { authenticated } from '@/lib/auth-server'
import { Body } from './_components/body'
import { Header } from './_components/header'
import { Sidebar } from './_components/sidebar'
import { redirect } from 'next/navigation'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuthenticated = await authenticated()

  if (!isAuthenticated) {
    return redirect('/auth/sign-in')
  }

  return (
    <div className="flex">
      <Sidebar />

      <Body>
        <Header />

        <div>{children}</div>
      </Body>
    </div>
  )
}
