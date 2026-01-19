'use client'

import { action } from '@/actions'
import { GroupResource, UserResource } from '@/actions/types'
import { UserFormDialog } from '@/components/forms/form-dialogs/user-form-dialog'
import { FormDialogContent } from '@/components/forms/ui/form-dialog-content'
import { Shield } from '@/components/shield'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useToast } from '@/components/ui/use-toast'
import { useAction } from '@/hooks/use-action'
import { ColumnDef } from '@tanstack/react-table'
import { Edit3Icon, MoreHorizontal, Trash2Icon } from 'lucide-react'

export const userColumns = ({
  groups,
}: {
  groups?: GroupResource[]
}): ColumnDef<UserResource>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value: boolean | 'indeterminate') =>
          table.toggleAllPageRowsSelected(!!value)
        }
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean | 'indeterminate') =>
          row.toggleSelected(!!value)
        }
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    id: 'Nome de Usuário',
    accessorFn: (row) => row.username,
    header: ({ column }) => column.id,
    cell: ({ getValue }) => <div>{getValue<string>()}</div>,
  },

  {
    id: 'Cargo',
    accessorFn: (row) => row.groups.map((group) => group.name).join(', '),
    header: ({ column }) => column.id,
    cell: ({ getValue }) => (
      <div className="uppercase">{getValue<string>()}</div>
    ),
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellActions item={row.original} groups={groups} />,
    enableHiding: false,
  },
]

export const CellActions = ({
  item,
  groups,
}: {
  item: UserResource
  groups?: GroupResource[]
}) => {
  const { id } = item

  const { toast } = useToast()

  const { delete: del } = action.user()

  const { execute } = useAction(del, {
    onSuccess: () => {
      toast({
        title: 'Usuário deletado com sucesso',
        description: 'O usuário foi deletado com sucesso! 🎉',
      })
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao deletar o usuário',
        description: error,
      })
    },
  })

  const handleDelete = async () => {
    await execute({ id })
  }

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>

          <Shield permission="user.update">
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <Edit3Icon className="mr-2 size-4" />
                Editar
              </DropdownMenuItem>
            </DialogTrigger>
          </Shield>

          <Shield permission="user.delete">
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-destructive"
              onClick={handleDelete}
            >
              <Trash2Icon className="mr-2 size-4" />
              Excluir
            </DropdownMenuItem>
          </Shield>
        </DropdownMenuContent>
      </DropdownMenu>

      <FormDialogContent>
        <UserFormDialog initialData={item} groups={groups} />
      </FormDialogContent>
    </Dialog>
  )
}
