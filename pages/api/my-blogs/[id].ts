import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '.prisma/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient()

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  console.log('%c req.query.id ', 'background: red; color: white', req.query.id)

  try {
    const articles = await prisma.blogs.findMany({
      where: {
        author: {
          id: +req.query.id,
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
      select: {
        id: true,
        body: true,
        title: true,
        author: {
          select: {
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            blogLike: true,
          },
        },
      },
    })
    res.status(200).json({ articles })
  } catch (err) {
    console.log(err)
    res.status(403).json({ err: 'Error occurred.' })
  }
  return null
}
