import React, { useState } from 'react'
// import { useMutation, useQueryClient } from 'react-query'
import { useSession } from 'next-auth/client'
import toast, { Toaster } from 'react-hot-toast'
import Navbar from '@/components/Navbar'
import styles from '@/styles/Form.module.css'

// TODO Add React Query

const AddBlog = () => {
  const [values, setValues] = useState({
    title: '',
    body: '',
  })
  const [session] = useSession()
  const urlCount = `${process.env.NEXT_PUBLIC_API}/blog/titleCount`
  const urlAdd = `${process.env.NEXT_PUBLIC_API}/blog/add`

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const postBlog = (CountObj) => {
    const { count } = CountObj.data

    if (count > 0) {
      toast.error('Title already exists!')
      return null
    }

    fetch(urlAdd, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          title: values.title,
          body: values.body,
          authorId: session.id,
        },
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        setValues({ title: '', body: '' })
        toast.success('Blog saved')
        return resData
      })
      .catch((error) => {
        toast.error('Error posting to database')
        console.warn(error)
      })
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ''
    )

    if (hasEmptyFields) {
      toast.error('Please fill in all fields')
      return null
    }

    // Check for duplicate title
    // Get duplicate title count from server
    // Callback function to post blog if no duplicate title
    fetch(urlCount, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          title: `${values.title}`,
        },
      }),
    })
      .then((res) => res.json())
      .then((countObj) => {
        postBlog(countObj)
      })
      .catch((error) => console.warn(error))

    return null
  }

  return (
    <div className={`${styles.formPage} container`}>
      <Navbar />
      <h1>Add Blog</h1>
      <Toaster
        toastOptions={{
          style: {
            height: '60px',
            border: '1px solid lightgray',
          },
        }}
      />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <div className={styles.section}>
            <label htmlFor="title">
              Title
              <input
                type="text"
                id="title"
                name="title"
                value={values.title}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className={styles.section}>
            <label htmlFor="body">
              Body
              <textarea
                name="body"
                id="body"
                value={values.body}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>
        <input type="submit" value="Add Blog" className="btn" />
      </form>
    </div>
  )
}

export default AddBlog
