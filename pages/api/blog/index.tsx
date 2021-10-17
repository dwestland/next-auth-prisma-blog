import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '.prisma/client'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await prisma.blogs.findMany({
      select: {
        body: true,
        title: true,
        author: {
          select: {
            name: true,
          },
        },
        _count: {
          select: {
            blogLike: true,
          },
        },
      },
    })
    res.status(200).json({ data })
  } catch (err) {
    console.log(err)
    res.status(403).json({ err: 'Error occurred.' })
  }
}
