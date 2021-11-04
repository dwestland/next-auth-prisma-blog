import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Navbar from '../../src/components/Navbar'
// import useTitleCount from '../../src/hooks/useTitleCount'
import styles from '../../styles/Form.module.css'

const AddBlog = () => {
  const [values, setValues] = useState({ title: 'z', body: 'zz', authorId: 0 })

  console.log('%c values ', 'background: red; color: white', values)

  const isDuplicateTitle = (title: string) => {
    const myUrl = `${process.env.NEXT_PUBLIC_API}/blog/titleCount`
    const result = true

    const boom = fetch(myUrl, {
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
      // .then((data) => console.log(data))
      .catch((error) => console.log('ERROR', error))

    console.log('boom', boom)

    return result
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

    const duplicateTitle: boolean = isDuplicateTitle(values.title)

    if (duplicateTitle) {
      toast.error('Title exists, title must be unique')
      return null
    }

    console.log(
      '%c values.title ',
      'background: red; color: white',
      values.title
    )
    console.log('%c values.body ', 'background: red; color: white', values.body)

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
