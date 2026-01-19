'use client'

import { action } from '@/actions'
import { GroupResource, UserResource } from '@/actions/types'
import { UserSchema, UserUpsertSchema } from '@/actions/user/schema'
import { FormAlert } from '@/components/forms/ui/form-alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/components/ui/use-toast'
import { useAction } from '@/hooks/use-action'
import { cn, nullAsUndefined } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

export const UserFormDialog = ({
  initialData,
  groups,
}: {
  initialData?: UserResource
  groups?: GroupResource[]
}) => {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof UserUpsertSchema>>({
    resolver: zodResolver(UserUpsertSchema),
    defaultValues: { new: !initialData, ...nullAsUndefined(initialData) },
  })

  const {
    fields: groupFields,
    append,
    remove,
  } = useFieldArray({ control: form.control, name: 'groups', keyName: 'key' })

  const onReset = () => {
    form.reset({ username: '', password: '', groups: [] })
  }

  const { create, update } = action.user()

  const { execute } = useAction(create, {
    onSuccess: () => {
      onReset()

      toast({
        title: 'Usuário cadastro com sucesso',
        description: 'O usuário foi cadastro com sucesso! 🎉',
      })
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao cadastrar o usuário',
        description: error,
      })
    },
  })

  const { execute: executeUpdate } = useAction(update, {
    onSuccess: () => {
      toast({
        title: 'Usuário atualizado com sucesso',
        description: 'O usuário foi atualizado com sucesso! 🎉',
      })
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao atualizar o usuário',
        description: error,
      })
    },
  })

  const onSubmit = async (values: z.infer<typeof UserUpsertSchema>) => {
    if (initialData) {
      await executeUpdate({
        id: initialData.id,
        ...values,
      })
    } else {
      await execute(UserSchema.parse(values))
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <DialogHeader>
            <DialogTitle>
              {initialData ? 'Cadastro do usuário' : 'Cadastro de usuário'}
            </DialogTitle>

            <DialogDescription>
              {initialData ? 'Altere os usuários' : 'Cadastre novos usuários'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome de usuário</FormLabel>
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
                  <FormLabel>{initialData ? 'Nova senha' : 'Senha'}</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />

                  {initialData && (
                    <FormDescription>
                      Deixe em branco para manter a senha atual
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />

            {initialData && (
              <FormField
                control={form.control}
                name="groups"
                render={() => (
                  <FormItem>
                    <FormLabel>Cargo</FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl className="w-full">
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              'h-auto justify-between',
                              !groupFields?.length && 'text-muted-foreground',
                            )}
                          >
                            {groupFields?.length ? (
                              <div className="flex flex-wrap gap-2">
                                {groups
                                  ?.filter(({ id }) =>
                                    groupFields.some((v) => v.id === id),
                                  )
                                  .map(({ name }, index) => (
                                    <Badge
                                      key={index}
                                      variant="outline"
                                      className="font-medium"
                                    >
                                      {name}
                                    </Badge>
                                  ))}
                              </div>
                            ) : (
                              'Selecione o cargo'
                            )}
                            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="p-0">
                        <Command>
                          <CommandInput placeholder="Pesquisar" />
                          <CommandEmpty>Nenhum</CommandEmpty>
                          <CommandGroup>
                            <ScrollArea className="flex max-h-72 flex-col">
                              {groups?.map(({ id, name }, index) => (
                                <CommandItem
                                  key={index}
                                  value={name}
                                  onSelect={() => {
                                    if (groupFields?.some((v) => v.id === id)) {
                                      remove(
                                        groupFields.findIndex(
                                          (v) => v.id === id,
                                        ),
                                      )
                                    } else {
                                      append({ id })
                                    }
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 size-4',
                                      groupFields?.length &&
                                        groupFields.some((v) => v.id === id)
                                        ? 'opacity-100'
                                        : 'opacity-0',
                                    )}
                                  />
                                  {name}
                                </CommandItem>
                              ))}
                            </ScrollArea>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          <FormAlert />

          <DialogFooter>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              <Loader2
                className={cn(
                  'mr-2 size-4 animate-spin',
                  !form.formState.isSubmitting && 'sr-only',
                )}
              />
              {initialData ? 'Salvar alterações' : 'Salvar'}
            </Button>
          </DialogFooter>
        </div>
      </form>
    </Form>
  )
}
