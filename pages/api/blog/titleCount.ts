import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '.prisma/client'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  if (!req.body.data) {
    return res.status(405).json({ message: 'Improper title' })
  }

  const { title } = req.body.data

  try {
    const titleCount: number = await prisma.blogs.count({
      where: {
        title,
      },
    })

    const data: object = { data: { count: titleCount } }
    res.status(200).json(data)
  } catch (err) {
    console.log(err)
    res.status(403).json({ err: 'Error occurred.' })
  }
  return null
}
