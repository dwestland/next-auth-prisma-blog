import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '.prisma/client'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
  console.log('delete like req.body', req.body)
  const { userId, blogId } = req.body.data

  try {
    await prisma.blogLikes.deleteMany({
      where: {
        userId,
        blogId,
      },
    })

    res.status(201).json({ message: 'Like deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Sorry, unable to handle request' })
  }

  return null
}
