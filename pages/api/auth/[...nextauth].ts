import NextAuth from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import { requireEnvVariable } from '@/utils/common'
import prisma from '@/utils/prisma'

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: requireEnvVariable('GITHUB_ID'),
      clientSecret: requireEnvVariable('GITHUB_SECRET'),
    }),
    GoogleProvider({
      clientId: requireEnvVariable('GOOGLE_CLIENT_ID'),
      clientSecret: requireEnvVariable('GOOGLE_CLIENT_SECRET'),
    }),
    EmailProvider({
      server: {
        host: requireEnvVariable('EMAIL_SERVER_HOST'),
        port: requireEnvVariable('EMAIL_SERVER_PORT'),
        auth: {
          user: requireEnvVariable('EMAIL_SERVER_USER'),
          pass: requireEnvVariable('EMAIL_SERVER_PASSWORD'),
        },
      },
      from: requireEnvVariable('EMAIL_FROM'),
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: requireEnvVariable('SECRET'),
  theme: {
    logo: '/images/earth.png',
  },
  callbacks: {
    async session({ session, user }) {
      session.userId = user.id

      return session
    },
  },
})
