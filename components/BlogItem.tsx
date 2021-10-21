import React, { FC } from 'react'

interface BlogProps {
  article: {
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
  const { title, author, _count } = article
  const bestName = author.name ?? author.email

  return (
    <div>
      <h3>{title}</h3>
      <p>By {bestName}</p>
      <p>Likes {_count.blogLike}</p>
    </div>
  )
}

export default BlogItem
