/* eslint-disable no-return-await */
import { PrismaClient } from '@prisma/client'
import articles from '../data/articles'
import likes from '../data/likes'

const prisma = new PrismaClient()

async function main() {
  await prisma.blogs.createMany({
    data: articles,
  })
  await prisma.blogLikes.createMany({
    data: likes,
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(0)
  })
  .finally(async () => await prisma.$disconnect)
