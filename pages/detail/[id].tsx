import React from 'react'
import { useQuery } from 'react-query'
import Navbar from '../../src/components/Navbar'

const Details = () => {
  const data = useQuery('posts', () => fetch('/api/blog').then((res) => res))
  // console.log('%c res ', 'background: dodgerblue; color: white', res)

  return (
    <div className="container">
      <Navbar />
      <h1>Details Page</h1>
      <div>
        <pre>{JSON.stringify(data.data, null, 2)}</pre>
      </div>
    </div>
  )
}
export default Details
