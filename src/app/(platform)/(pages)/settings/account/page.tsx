import { AccountForm } from '@/components/forms/account-form'
import { Separator } from '@/components/ui/separator'
import { currentUser } from '@/lib/auth-server'

export default async function Page() {
  const user = await currentUser()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Conta</h3>
        <p className="text-sm text-muted-foreground">
          Atualize as configurações da sua conta
        </p>
      </div>

      <Separator />

      <AccountForm initialData={user} />
    </div>
  )
}
