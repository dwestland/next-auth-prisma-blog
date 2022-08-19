import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

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

    res.status(204).json({ message: 'Blog has been updated' })
  } catch (err) {
    res.status(500).json({ message: 'Sorry, unable to handle request' })
  }
  return null
}
