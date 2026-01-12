import { CompanyWithDocumentTypeSchema } from '@/actions/company/schema'
import { z } from 'zod'

export const UnitIdSchema = z.object({
  companyId: z.number().int().positive(),
})

export const UnitSchema = z.object({
  identifier: z.optional(z.string().trim().toUpperCase()),

  company: CompanyWithDocumentTypeSchema,
})

export const UnitUpdateSchema = UnitIdSchema.merge(UnitSchema.deepPartial())

export const UnitImportSchema = z.object({
  Nome: z.coerce.string().nullish(),
  'Nome fantasia': z.coerce.string().nullish(),
  CNPJ: z.coerce.string().nullish(),

  CEP: z.coerce.string().nullish(),
  Estado: z.coerce.string().nullish(),
  Cidade: z.coerce.string().nullish(),
  Endereço: z.coerce.string().nullish(),
})
