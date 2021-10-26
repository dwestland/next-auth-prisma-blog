import React from 'react'
import { useQuery } from 'react-query'
import Link from 'next/link'
import BlogItem from '../../components/BlogItem'

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
    // { staleTime: 2000 }
  )

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error?.message}</span>
  }

  if (data.articles.length === 0) {
    console.log('%c No blogs ', 'background: red; color: white')
  }

  return (
    <div className="container">
      <h1>Blogs</h1>
      <Link href="/blogs/add">
        <a className="btn">Add Blog</a>
      </Link>
      <div>
        {data.articles.length === 0 && <h3>No Articles</h3>}
        {data.articles.map((article: Article) => (
          <BlogItem key={article.title} article={article} />
        ))}
      </div>
    </div>
  )
}
