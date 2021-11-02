import React, { FC } from 'react'
import Link from 'next/link'
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
      <h3>{title}</h3>
      <Link href={`/detail/${id}`}>
        <a>Blog detail</a>
      </Link>
      <p>By {bestName}</p>
      <p>Likes {_count.blogLike}</p>
      <p>Blog ID {id}</p>
    </div>
  )
}

export default BlogItem
