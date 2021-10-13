/*
  Warnings:

  - Added the required column `author_id` to the `blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blog_id` to the `blog_like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `blog_like` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "blog" ADD COLUMN     "author_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "blog_like" ADD COLUMN     "blog_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "blog" ADD CONSTRAINT "blog_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_like" ADD CONSTRAINT "blog_like_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_like" ADD CONSTRAINT "blog_like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
