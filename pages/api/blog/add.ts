import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Prisma } from '.prisma/client'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    console.log('%c req.body ', 'background: red; color: white', req.body)
    const blog: Prisma.AccountCreateInput = JSON.parse(req.body)
    const savedBlog = await prisma.blog.create({ blog })
    res.status(200).json(savedBlog)
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' })
  }
}
