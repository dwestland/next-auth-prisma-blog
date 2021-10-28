import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Prisma } from '.prisma/client'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { title, body, authorId } = req.body.data

  console.log('%c req.body ', 'background: red; color: white', req.body)
  console.log('%c title ', 'background: red; color: white', title)
  console.log('%c body ', 'background: red; color: white', body)
  console.log('%c authorId ', 'background: red; color: white', authorId)

  try {
    await prisma.blogs.create({
      data: {
        title,
        body,
        authorId,
      },
    })

    res.status(200).json({ message: 'eagle has landed' })
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' })
  }
}
