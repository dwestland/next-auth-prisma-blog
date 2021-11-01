// import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'

export default function useTitleCount(title) {
  return useQuery('titleCount', () =>
    axios
      .get('/api/blog/titleCount', {
        data: {
          title,
        },
      })
      .then((res) => res.data)
  )
}
