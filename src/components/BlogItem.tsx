import React, { FC, useState } from 'react'
import Link from 'next/link'
import { FaRegHeart, FaTrashAlt, FaPencilAlt } from 'react-icons/fa'
import Tooltip from 'rc-tooltip'
import Modal from '@/components/Modal'
import styles from '@/styles/BlogItem.module.css'
import 'rc-tooltip/assets/bootstrap.css'

interface Blog {
  article: {
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
}

const BlogItem: FC<Blog> = ({ article }): JSX.Element => {
  // const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const { id, title, author, _count } = article
  const bestName = author.name ?? author.email
  const url = `${process.env.NEXT_PUBLIC_API}/blog/delete`

  const openDeleteModal = () => {
    setShowDeleteModal(true)
  }

  const handleDelete = () => {
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          id,
        },
      }),
    })

    setShowDeleteModal(false)
  }

  return (
    <div className={styles.blogItem}>
      <div className={styles.row}>
        <span>
          <strong>{title}</strong>
        </span>
        <div className={styles.icons}>
          ID:{id}
          &nbsp;&nbsp;&nbsp;
          {/* Edit Link */}
          <Tooltip
            placement="top"
            trigger={['hover']}
            overlay={<span>Edit</span>}
          >
            <a className={styles.icon}>
              <FaPencilAlt />
            </a>
          </Tooltip>
          &nbsp;&nbsp;
          {/* Delete Button */}
          <Tooltip
            placement="top"
            trigger={['hover']}
            overlay={<span>Delete</span>}
          >
            <button
              type="button"
              className={styles.iconButton}
              onClick={openDeleteModal}
            >
              <a className={styles.icon}>
                <FaTrashAlt />
              </a>
            </button>
          </Tooltip>
          &nbsp;&nbsp;
          {/* Favorite Button */}
          <Tooltip
            placement="top"
            trigger={['hover']}
            overlay={<span>Favorite</span>}
          >
            <a className={styles.icon}>
              <FaRegHeart />
            </a>
          </Tooltip>
          &nbsp;
          {_count.blogLike}
        </div>
      </div>
      <div className={`${styles.row} ${styles.small}`}>
        <span>By {bestName}</span>
        <Link href={`/detail/${id}`}>
          <a>Blog detail</a>
        </Link>
      </div>
      {showDeleteModal ? (
        <Modal
          show="true"
          title={null}
          onClose={() => setShowDeleteModal(false)}
        >
          <div className={styles.deleteModal}>
            <h2>Are you sure you want to delete</h2>
            <h3>&quot;{title}&quot;&nbsp;&nbsp;?</h3>
            <div className={styles.buttonContainer}>
              <button className="btn" type="button" onClick={handleDelete}>
                Delete
              </button>
              <button
                className={`btn ${styles.cancelButton}`}
                type="button"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
      {showEditModal ? (
        <Modal show="true" title={null} onClose={() => setShowEditModal(false)}>
          <div className={styles.deleteModal}>
            <h2>Are you sure you want to delete</h2>
            <h3>&quot;{title}&quot;&nbsp;&nbsp;?</h3>
            <div className={styles.buttonContainer}>
              <button className="btn" type="button" onClick={handleDelete}>
                Delete
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
      ) : null}
    </div>
  )
}

export default BlogItem
