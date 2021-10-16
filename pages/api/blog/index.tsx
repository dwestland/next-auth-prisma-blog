import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '.prisma/client'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // const data = req.body
  try {
    const result = await prisma.blogs.findMany()
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
    res.status(403).json({ err: 'Error occurred.' })
  }
}
