import { z } from 'zod'

export const UserIdSchema = z.object({
  id: z.string(),
})

export const UserSchema = z.object({
  username: z
    .string({ required_error: 'O nome de usuário é obrigatório' })
    .min(4, { message: 'O nome de usuário deve ter no mínimo 4 caracteres' })
    .max(50, { message: 'O nome de usuário deve ter no máximo 20 caracteres' })
    .refine((value) => !value || /^[a-zA-Z0-9_-]+$/.test(value), {
      message: 'O nome de usuário só pode conter letras, números, "_" e "-"',
    }),

  password: z
    .string({ required_error: 'A senha é obrigatória' })
    .min(4, { message: 'A senha deve ter no mínimo 4 caracteres' }),

  groups: z.array(z.object({ id: z.number().int().positive() })).nullish(),
})

export const UserUpdateSchema = UserIdSchema.merge(
  UserSchema.omit({ password: true })
    .merge(
      z.object({
        password: z.string().refine(({ length }) => !length || length >= 4, {
          message: 'A nova senha deve ter no mínimo 4 caracteres',
        }),
      }),
    )
    .deepPartial(),
)

export const UserUpdatePasswordSchema = UserIdSchema.merge(
  z.object({
    currentPassword: z
      .string({ required_error: 'A senha atual é obrigatória' })
      .min(4, { message: 'A senha atual deve ter no mínimo 4 caracteres' }),

    newPassword: z
      .string({ required_error: 'A nova senha é obrigatória' })
      .min(4, { message: 'A nova senha deve ter no mínimo 4 caracteres' }),

    passwordConfirmation: z
      .string({ required_error: 'A senha de confirmação é obrigatória' })
      .min(4, {
        message: 'A senha de confirmação deve ter no mínimo 4 caracteres',
      }),
  }),
).refine(
  ({ newPassword, passwordConfirmation }) =>
    newPassword === passwordConfirmation,
  {
    path: ['passwordConfirmation'],
    message: 'A senha de confirmação deve ser igual a nova senha',
  },
)

export const UserUpsertSchema = z.discriminatedUnion('new', [
  z.object({ new: z.literal(true) }).merge(UserSchema),

  z.object({ new: z.literal(false) }).merge(UserUpdateSchema),
])
