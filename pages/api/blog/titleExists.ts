import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '.prisma/client'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const titleExists: number = await prisma.blogs.count({
      where: {
        title: 'xxxx',
      },
    })
    let data = false
    if (titleExists !== 0) {
      data = true
    }
    // console.log('%c titleExists ', 'background: red; color: white' titleExists)
    res.status(200).json(data)
  } catch (err) {
    console.log(err)
    res.status(403).json({ err: 'Error occurred.' })
  }
  return null
}
