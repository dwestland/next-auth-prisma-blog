import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import styles from '../../styles/Form.module.css'

const AddBlog = () => {
  const [values, setValues] = useState({ title: '', body: '' })

  const router = useRouter()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
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

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    })

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error('No token included')
        return null
      }
      toast.error('Something Went Wrong')
    } else {
      const evt = await res.json()
      router.push(`/events/${evt.slug}`)
    }

    console.log(
      '%c values.title ',
      'background: red; color: white',
      values.title
    )

    console.log('%c values.body ', 'background: red; color: white', values.body)

    return null
  }

  return (
    <div className={styles.formPage}>
      <h1>Add Blog</h1>
      <Toaster />
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
