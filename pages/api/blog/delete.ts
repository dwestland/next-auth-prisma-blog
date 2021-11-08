import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '.prisma/client'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { id } = req.body.data

  console.log('%c req.body ', 'background: darkblue; color: white', req.body)
  console.log('%c id ', 'background: darkblue; color: white', id)

  try {
    await prisma.blogs.delete({
      where: {
        id: +id,
      },
    })

    res.status(200).json({ message: 'eagle has landed' })
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' })
  }
  return null
}
