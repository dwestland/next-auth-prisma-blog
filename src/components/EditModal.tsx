import React, { FC, useState, useEffect } from 'react'
// import Link from 'next/link'
// import { FaRegHeart, FaTrashAlt, FaPencilAlt } from 'react-icons/fa'
// import Tooltip from 'rc-tooltip'
import Modal from '@/components/Modal'
// import styles from '@/styles/BlogItem.module.css'
import styles from '@/styles/Form.module.css'

interface ModalProps {
  id: number
  title: string
  body: string
  setShowEditModal: any
}

const DeleteModal: FC<ModalProps> = ({
  id,
  title,
  body,
  setShowEditModal,
}): JSX.Element => {
  const [values, setValues] = useState({
    title: '',
    body: '',
  })
  const url = `${process.env.NEXT_PUBLIC_API}/blog/delete`

  useEffect(() => {
    console.log('%c I am useEffect ', 'background: purple; color: white')
    setValues({ title, body })
  }, [])

  const handleDelete = async () => {
    console.log('%c handleDelete ', 'background: red; color: white')
  }
  const handleSubmit = () => {
    console.log('%c handleSubmit ', 'background: red; color: white')

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          id,
          title,
          body,
        },
      }),
    })

    setShowEditModal(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
    console.log('%c handleInputChange ', 'background: red; color: white')
  }

  return (
    <div>
      <Modal show="true" title={null} onClose={() => setShowEditModal(false)}>
        <div className={styles.deleteModal}>
          <h2>Edit blog</h2>

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

          <div className={styles.buttonContainer}>
            <button className="btn" type="button" onClick={handleDelete}>
              Update
            </button>
            <button
              className={`btn ${styles.cancelButton}`}
              type="button"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default DeleteModal
