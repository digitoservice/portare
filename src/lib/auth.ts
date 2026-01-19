import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { db } from './db'
import { hashPassword, verifyPassword } from './password'
import { username } from 'better-auth/plugins'

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: 'mysql',
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    password: {
      hash: (password) => hashPassword(password),
      verify: (data) => verifyPassword(data.password, data.hash),
    },
    minPasswordLength: 4,
  },
  trustedOrigins: [process.env.BETTER_AUTH_URL || 'http://localhost:3000'],
  plugins: [username()],
})
