import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useSession } from 'next-auth/client'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import BlogItem from '@/components/BlogItem'
import Navbar from '@/components/Navbar'
import styles from '@/styles/Blogs.module.css'

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

export default function Blogs() {
  const [session] = useSession()
  const [blogType, setBlogType] = useState('All Blogs')
  const url = `${process.env.NEXT_PUBLIC_API}/blogs`

  const fetchAllBlogs = async () => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          user: 4,
        },
      }),
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

  const handleSelectChange = (e) => {
    setBlogType(e.target.value)
  }

  const userLikingOwnError = () => {
    toast.error('You cannot like your own blog!')
  }

  const result = () => {
    const allBlogs = data.articles.map((article: Article) => (
      <BlogItem
        key={article.title}
        article={article}
        userLikingOwnError={userLikingOwnError}
      />
    ))

    switch (blogType) {
      case 'All Blogs':
        return allBlogs
      case 'My Blogs':
        console.log('%c data ', 'background: red; color: white', data)
        console.log('%c allBlogs ', 'background: red; color: white', allBlogs)
        return allBlogs.filter(
          (blog) => blog.props.article.author.id === session.id
        )
      // TODO Add like info to Blogs API
      case 'My Likes':
        return allBlogs
      default:
        return allBlogs
    }
  }

  if (session) {
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
        <select
          onChange={(e) => handleSelectChange(e)}
          className={styles.blogSelect}
        >
          <option value="All Blogs">All Blogs</option>
          <option value="My Blogs">My Blogs</option>
          <option value="My Likes">My Likes</option>
        </select>
        <div>
          {data.articles.length === 0 && <h3>No Articles</h3>}
          {result()}
        </div>
      </div>
    )
  }
  return <p>Access Denied</p>
}
