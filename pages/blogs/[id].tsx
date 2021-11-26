import React from 'react'
import { useQuery } from 'react-query'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
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
  _count: {
    blogLike: number
  }
  blogLike: []
}

export default function Blog() {
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

  // if (data.articles.length === 0) {
  //   console.log('%c No blogs ', 'background: red; color: white')
  // }
  // console.log(
  //   '%c data.articles ',
  //   'background: purple; color: white',
  //   data.articles
  // )

  const userLikingOwnError = () => {
    toast.error('You cannot like your own blog!')
  }

  return (
    <div className="container">
      <Toaster
        toastOptions={{
          style: {
            height: '60px',
            border: '1px solid lightgray',
          },
        }}
      />
      <Navbar />
      <h1>Blogs</h1>
      <Link href="/blogs/add">
        <a className="btn">Add Blog</a>
      </Link>
      <div>
        {data.articles.length === 0 && <h3>No Articles</h3>}
        {data.articles.map((article: Article) => (
          <BlogItem
            key={article.title}
            article={article}
            userLikingOwnError={userLikingOwnError}
          />
        ))}
      </div>
    </div>
  )
}
