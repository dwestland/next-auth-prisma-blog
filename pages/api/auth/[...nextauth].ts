import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'

import { NextApiHandler } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.NAPB_GITHUB_ID,
      clientSecret: process.env.NAPB_GITHUB_SECRET,
    }),
    Providers.Google({
      clientId: process.env.NAPB_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NAPB_GOOGLE_CLIENT_SECRET,
    }),
    Providers.Email({
      server: {
        host: process.env.NAPB_EMAIL_SERVER_HOST,
        port: process.env.NAPB_EMAIL_SERVER_PORT,
        auth: {
          user: process.env.NAPB_EMAIL_SERVER_USER,
          pass: process.env.NAPB_EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.NAPB_EMAIL_FROM,
    }),
  ],
  // @ts-ignore
  adapter: Adapters.Prisma.Adapter({
    prisma,
  }),
  callbacks: {
    session(session, user) {
      session.id = user.id
      return session
    },
  },

  secret: process.env.NAPB_SECRET,
}

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)
export default authHandler
