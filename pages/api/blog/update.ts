import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '.prisma/client'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { title, body, id } = req.body.data

  try {
    await prisma.blogs.update({
      where: {
        id,
      },
      data: {
        title,
        body,
      },
    })

    res.status(200).json({ message: 'Blog has been updated' })
  } catch (err) {
    res.status(400).json({ message: 'Blog did not update' })
  }
  return null
}
