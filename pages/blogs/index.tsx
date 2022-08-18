import React from 'react'
import { useQuery } from 'react-query'
import { useSession } from 'next-auth/client'
import Link from 'next/link'
import BlogItem from '@/components/BlogItem'
import Navbar from '@/components/Navbar'

interface Articles {
  articles: {}[]
  userLikingOwnError: () => void
}

interface Article {
  id: number
  body: string
  title: string
  author: {
    id: number
    name: string
    email: string
  }
}

export default function Blogs() {
  const [session] = useSession()
  const url = `${process.env.NEXT_PUBLIC_API}/blogs`

  const fetchAllBlogs = async () => {
    const res = await fetch(url, {
      method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     data: {
      //       user: 4,
      //     },
      //   }),
    })
    return res.json()
  }

  const { data, error, isLoading, isError } = useQuery<Articles, Error>(
    'allBlogs',
    fetchAllBlogs
  )

  if (isLoading) {
    return (
      <div className="container">
        <Navbar />
        <span>Loading...</span>
      </div>
    )
  }

  if (isError) {
    return <span>Error: {error?.message}</span>
  }

  const result = () => {
    const allBlogs = data.articles.map((article: Article) => (
      <BlogItem key={article.title} article={article} />
    ))

    return allBlogs
  }

  if (session) {
    return (
      <div className="container">
        <Navbar />
        <h1>Blogs</h1>
        <Link href="/blogs/add">
          <a className="btn">Add Blog</a>
        </Link>
        <div>
          {data.articles.length === 0 && <h3>No Articles</h3>}
          {result()}
        </div>
      </div>
    )
  }
  return <p>Access Denied</p>
}
