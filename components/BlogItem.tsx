import React, { FC } from 'react'
import styles from '../styles/BlogItem.module.css'

interface BlogProps {
  article: {
    body: string
    title: string
    author: {
      name: string
      email: string
      id: number
    }
    _count: {
      blogLike: number
    }
  }
}

const BlogItem: FC<BlogProps> = ({ article }): JSX.Element => {
  const { title, author, _count } = article
  const bestName = author.name ?? author.email

  return (
    <div className={styles.blogItem}>
      <h3>{title}</h3>
      <p>By {bestName}</p>
      <p>Likes {_count.blogLike}</p>
      <p>ID: {author.id}</p>
    </div>
  )
}

export default BlogItem
