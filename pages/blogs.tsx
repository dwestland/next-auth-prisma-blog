import React from 'react'
import { useQuery } from 'react-query'
import BlogItem from '../components/BlogItem'

export default function Blogs() {
  // const { data: blogs, error, status }

  const fetchArticles = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/blog`)
    return res.json()
  }

  const { data, error, isLoading, isError } = useQuery('boom', fetchArticles)

  console.log('%c data ', 'background: black; color: white', data)
  console.log('%c error ', 'background: black; color: white', error)
  console.log('%c isLoading ', 'background: black; color: white', isLoading)
  console.log('%c isError ', 'background: black; color: white', isError)

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <div>
      <h1>Blogs</h1>

      <div>
        {data.articles.map((article) => (
          // <div key={article.title}>{article.title}</div>
          <BlogItem key={article.title} article={article} />
        ))}
      </div>
    </div>
  )
}
