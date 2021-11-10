import React, { FC, useState } from 'react'
import Link from 'next/link'
import { FaRegHeart, FaTrashAlt, FaPencilAlt } from 'react-icons/fa'
import Tooltip from 'rc-tooltip'
import styles from '@/styles/BlogItem.module.css'
import 'rc-tooltip/assets/bootstrap.css'
import DeleteModal from '@/components/DeleteModal'
import EditModal from '@/components/EditModal'

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
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [showEditModal, setShowEditModal] = useState<boolean>(false)

  const { id, title, body, author, _count } = article
  const bestName = author.name ?? author.email
  // const url = `${process.env.NEXT_PUBLIC_API}/blog/delete`

  const openDeleteModal = () => {
    setShowDeleteModal(true)
  }

  const openEditModal = () => {
    setShowEditModal(true)
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
          {/* Edit Button */}
          <Tooltip
            placement="top"
            trigger={['hover']}
            overlay={<span>Edit</span>}
          >
            <button
              type="button"
              className={styles.iconButton}
              onClick={openEditModal}
            >
              <a className={styles.icon}>
                <FaPencilAlt />
              </a>
            </button>
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
      {showDeleteModal && (
        <DeleteModal
          id={id}
          setShowDeleteModal={setShowDeleteModal}
          title={title}
        />
      )}
      {showEditModal && (
        <EditModal
          id={id}
          title={title}
          body={body}
          setShowEditModal={setShowEditModal}
        />
      )}
    </div>
  )
}

export default BlogItem
