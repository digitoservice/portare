'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { signOut } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

export const SignOut = () => {
  const router = useRouter()

  const onSignOut = async () => {
    await signOut()
    router.push('/auth/sign-in')
  }

  return <DropdownMenuItem onClick={onSignOut}>Sair</DropdownMenuItem>
}
