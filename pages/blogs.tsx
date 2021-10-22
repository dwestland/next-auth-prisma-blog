import React from 'react'
import { useQuery } from 'react-query'
import BlogItem from '../components/BlogItem'
import styles from '../styles/Blogs.module.css'

interface Articles {
  articles: {}[]
}

interface Article {
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

export default function Blogs() {
  const fetchArticles = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/blog`)
    return res.json()
  }

  const { data, error, isLoading, isError } = useQuery<Articles, Error>(
    'articles',
    fetchArticles
  )

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error?.message}</span>
  }

  return (
    <div className={styles.blogs}>
      <h1>Blogs</h1>
      <div>
        {data.articles.map((article: Article) => (
          <BlogItem key={article.title} article={article} />
        ))}
      </div>
    </div>
  )
}
