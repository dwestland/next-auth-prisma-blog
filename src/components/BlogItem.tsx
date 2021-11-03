import React, { FC } from 'react'
import Link from 'next/link'
import { FaRegHeart } from 'react-icons/fa'
import styles from '../../styles/BlogItem.module.css'

interface BlogProps {
  article: {
    id: number
    body: string
    title: string
    author: {
      name: string
      email: string
    }
    _count: {
      blogLike: number
    }
  }
}

const BlogItem: FC<BlogProps> = ({ article }): JSX.Element => {
  const { id, title, author, _count } = article
  const bestName = author.name ?? author.email

  return (
    <div className={styles.blogItem}>
      <div className={styles.row}>
        <span>
          <strong>{title}</strong>
        </span>
        <div className={styles.likes}>
          <FaRegHeart /> {_count.blogLike}
        </div>
      </div>
      <div className={`${styles.row} ${styles.small}`}>
        <span>By {bestName}</span>
        <Link href={`/detail/${id}`}>
          <a>Blog detail</a>
        </Link>
      </div>
    </div>
  )
}

export default BlogItem
