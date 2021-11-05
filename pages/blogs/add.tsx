import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Navbar from '../../src/components/Navbar'
import styles from '../../styles/Form.module.css'

const AddBlog = () => {
  const [values, setValues] = useState({
    title: 'xxxx',
    body: 'My body...',
    authorId: 0,
  })
  const url = `${process.env.NEXT_PUBLIC_API}/blog/titleCount`

  function fetchTitleCount(title) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          title: `${title}`,
        },
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log('fetchTitleCount return resData ', resData)
        return resData
      })
      .catch((error) => console.warn(error))
  }

  const isDuplicateTitle = (title: string) => {
    let titleCount = 1

    fetchTitleCount(title).then((data) => {
      // you can access the result from the promise here

      console.log(
        '%c data.data.count ',
        'background: pink; color: white',
        data.data.count
      )
      titleCount = data
    })

    console.log('%c titleCount ', 'background: pink; color: white', titleCount)

    if (titleCount > 0) {
      console.log(
        '%c titleCount ',
        'background: black; color: white',
        titleCount
      )
      console.log(
        '%c isDuplicateTitle return true ',
        'background: red; color: white'
      )
      return true
    }
    console.log(
      '%c isDuplicateTitle return false',
      'background: red; color: white'
    )
    return false
  }

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

    const hasDuplicateTitle = isDuplicateTitle(values.title)

    console.log(
      '%c hasDuplicateTitle ',
      'background: red; color: white',
      hasDuplicateTitle
    )

    if (hasDuplicateTitle) {
      toast.error('Title exists, title must be unique')
      return null
    }

    console.log(
      '%c values.title ',
      'background: red; color: white',
      values.title
    )

    setValues({ title: '', body: '', authorId: null })

    return null
  }

  return (
    <div className={`${styles.formPage} container`}>
      <Navbar />
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
