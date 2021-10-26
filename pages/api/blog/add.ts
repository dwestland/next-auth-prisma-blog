import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '.prisma/client'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // res.status(200).json({ eagle: 'Has landed' })
  const { title, body, authorId } = req.body
  console.log('%c title ', 'background: green; color: white', title)
  console.log('%c body ', 'background: green; color: white', body)

  try {
    await prisma.blogs.create({
      title,
      body,
      authorId,
    })
    res.status(200).json({ message: 'Blog Saved' })
  } catch (error) {
    console.log(error)
    res.status(403).json({ error: 'Error occurred.' })
  }
}
