import React from 'react'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

interface Search {
  articles: []
}

interface SearchResults {
  id: number
  body: string
  title: string
}

const searchResults = () => {
  const url = `${process.env.NEXT_PUBLIC_API}/blog/search`
  const router = useRouter()
  const searchTerm = router.query.term

  const fetchSearchResults = async () => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        search: {
          term: searchTerm,
        },
      }),
    })
    return res.json()
  }

  const { data, error, isLoading, isError } = useQuery<Search, Error>(
    'searchResults',
    fetchSearchResults
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
    console.log('%c i am results ', 'background: red; color: white')
    const results = data.articles.map((article: SearchResults) => (
      <p>
        <strong>{article.title}</strong>
        &nbsp;-&nbsp;
        <Link href={`/detail/${article.id}`}>
          <a>Blog detail</a>
        </Link>
      </p>
    ))
    return results
  }

  return (
    <div className="container">
      <Navbar />
      <h1>Search Results for {router.query.term}</h1>

      {result()}
    </div>
  )
}

export default searchResults
