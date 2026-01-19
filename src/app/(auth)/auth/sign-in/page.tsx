'use client'

import { revalidateAction } from '@/actions/revalidate'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signIn } from '@/lib/auth-client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const signInFormSchema = z.object({
  username: z
    .string({ required_error: 'O nome de usuário é obrigatório' })
    .min(2, { message: 'O nome de usuário deve ter no mínimo 2 caracteres' })
    .max(50, { message: 'O nome de usuário deve ter no máximo 50 caracteres' }),
  password: z
    .string({ required_error: 'A senha é obrigatória' })
    .min(4, { message: 'A senha deve ter no mínimo 4 caracteres' })
    .max(100, {
      message: 'O nome de usuário deve ter no máximo 100 caracteres',
    }),
})

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams?.get('redirect_url')

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
  })

  const onSubmit = async (values: z.infer<typeof signInFormSchema>) => {
    try {
      const result = await signIn.username(values)

      if (result.error) {
        throw new Error('Usuário ou senha inválidos')
      }

      await revalidateAction()

      router.push(redirectUrl ?? '/#')
    } catch (error) {
      form.setError('root', { message: 'Usuário ou senha inválidos' })
    }
  }

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Logo className="mx-auto w-auto" />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader>
                <CardTitle className="font-bold">Entrar</CardTitle>

                <CardDescription>
                  Acesse o <strong>portare</strong> sistema de gerenciamento de
                  transporte, utilizando seu usuário e senha
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col space-y-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usuário</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormMessage className="text-center">
                  {form.formState.errors.root?.message}
                </FormMessage>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                  type="submit"
                >
                  Entrar
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  )
}
