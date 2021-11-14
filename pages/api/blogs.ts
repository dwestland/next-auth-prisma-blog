import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '.prisma/client'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // if (req.method !== 'GET') {
  //   return res.status(405).json({ message: 'Method not allowed' })
  // }

  if (req.method === 'GET') {
    try {
      const articles = await prisma.blogs.findMany({
        orderBy: {
          updatedAt: 'desc',
        },
        select: {
          id: true,
          body: true,
          title: true,
          author: {
            select: {
              id: true,
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

  if (req.method === 'POST') {
    console.log(
      '%c req.body.data.user ',
      'background: red; color: white',
      req.body.data.user
    )

    try {
      const articles = await prisma.blogs.findMany({
        orderBy: {
          updatedAt: 'desc',
        },
        select: {
          id: true,
          body: true,
          title: true,
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          _count: {
            select: {
              blogLike: true,
            },
          },

          blogLike: {
            where: {
              userId: req.body.data.user,
            },
            select: {
              userId: true,
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

  return res.status(405).json({ message: 'Method not allowed' })
}
