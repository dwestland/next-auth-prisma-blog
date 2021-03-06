import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '.prisma/client'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // const { pid } = req.query

  console.log('%c req.query.id ', 'background: red; color: white', req.query.id)

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const article = await prisma.blogs.findUnique({
      where: {
        id: +req.query.id,
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
    res.status(200).json({ article })
  } catch (err) {
    console.log(err)
    res.status(403).json({ err: 'Error occurred.' })
  }
  return null
}
