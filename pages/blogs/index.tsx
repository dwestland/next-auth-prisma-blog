import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useSession } from 'next-auth/client'
import Link from 'next/link'
import BlogItem from '@/components/BlogItem'
import Navbar from '@/components/Navbar'
import styles from '@/styles/Blogs.module.css'

interface Articles {
  articles: {}[]
}

interface Article {
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

export default function Blogs() {
  const [session, loading] = useSession()
  console.log('%c session ', 'background: red; color: white', session)
  console.log('%c loading ', 'background: red; color: white', loading)

  const [blogType, setBlogType] = useState('All Blogs')
  console.log('%c blogType ', 'background: red; color: white', blogType)

  const fetchArticles = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/blogs`)

    return res.json()
  }

  const { data, error, isLoading, isError } = useQuery<Articles, Error>(
    'blogScriptName',
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

  const handleSelectChange = (e) => {
    console.log(
      '%c e.target.value ',
      'background: red; color: white',
      e.target.value
    )
    setBlogType(e.target.value)
  }

  return (
    <div className="container">
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
        {data.articles.map((article: Article) => (
          <BlogItem key={article.title} article={article} />
        ))}
      </div>
    </div>
  )

  //   switch (blogType) {
  //     case 'All Blogs':
  //       console.log('%c All Blogs ', 'background: blue; color: white')

  //       break
  //     case 'My Blogs':
  //       console.log('%c My Blogs ', 'background: blue; color: white')
  //       break
  //     case 'My Likes':
  //       console.log('%c My Likes ', 'background: blue; color: white')
  //       break
  //     default:
  //       console.log('%c default ', 'background: blue; color: white')
  //   }

  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_API}/my-blogs/${session.id}`
  // )
}
