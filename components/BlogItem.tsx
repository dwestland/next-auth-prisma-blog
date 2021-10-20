import React, { FC } from 'react'

type BlogProps = {
  article: object
}

interface Articles {
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

const BlogItem: FC<BlogProps> = ({ article }): JSX.Element => {
  console.log('%c article ', 'background: red; color: white', article)
  console.log(
    '%c article.title ',
    'background: red; color: white',
    article.title
  )
  console.log(
    '%c article.author.name ',
    'background: red; color: white',
    article.author.name
  )
  const bestName = article.author.name ?? article.author.email

  return (
    <div>
      <h3>{article.title}</h3>
      <p>By {bestName}</p>
      <p>Likes {article._count.blogLike}</p>
    </div>
  )
}

export default BlogItem
