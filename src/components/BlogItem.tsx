import React, { FC, useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'
import Link from 'next/link'
import { FaHeart, FaRegHeart, FaTrashAlt, FaPencilAlt } from 'react-icons/fa'
import Tooltip from 'rc-tooltip'
import ShowMoreText from 'react-show-more-text'
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
    blogLike: any
  }
}

const BlogItem: FC<Blog> = ({ article }): JSX.Element => {
  const [session] = useSession()
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const [isLikeByUser, setIsLikeByUser] = useState<boolean>(false)

  const { id, title, body, author, _count, blogLike } = article
  const bestName = author.name ?? author.email

  useEffect(() => {
    console.log('%c blogLike ', 'background: green; color: white', blogLike)
    console.log('blogLike')
    if (blogLike.length > 0) {
      setIsLikeByUser(true)
    } else {
      setIsLikeByUser(false)
    }
  }, [blogLike])

  console.log('%c blogLike ', 'background: red; color: white', blogLike)

  const openDeleteModal = () => {
    setShowDeleteModal(true)
  }

  const openEditModal = () => {
    setShowEditModal(true)
  }

  const toggleLike = () => {
    console.log('%c Like ', 'background: red; color: white')
    console.log('%c user id ', 'background: red; color: white', session.id)

    // The initial response should include user like for each blog

    // Check if user has like this blog

    // If liked, delete like

    // If not liked, add like
  }

  return (
    <div className={styles.blogItem}>
      <div className={styles.row}>
        <span>
          <strong>{title}</strong>
        </span>
        <div className={styles.icons}>
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
          &nbsp;
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
          {/* Like Button */}
          <Tooltip
            placement="top"
            trigger={['hover']}
            overlay={<span>Like</span>}
          >
            <button
              type="button"
              className={styles.iconButton}
              onClick={toggleLike}
            >
              <a className={styles.icon}>
                {isLikeByUser ? (
                  <FaHeart className={styles.liked} />
                ) : (
                  <FaRegHeart />
                )}
              </a>
            </button>
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
      <div className={styles.body}>
        <ShowMoreText
          lines={2}
          more="show more"
          less="show less"
          anchorClass={styles.anchorClass}
          truncatedEndingComponent="... "
        >
          <p>{body}</p>
        </ShowMoreText>
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
